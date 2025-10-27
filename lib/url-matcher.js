const {compile, evalRepl} = require("multi-re");

var tlds = require("./tlds.json"),
	RE = {
		PROTOCOL: "([a-z][-a-z*]+://)?",
		USER: "(?:([\\w:.+-]+)@)?",
		DOMAIN_UNI: `([a-z0-9-.\\u00A0-\\uFFFF]+\\.[a-z0-9-${tlds.chars}]{1,${tlds.maxLength}})`,
		DOMAIN: `([a-z0-9-.]+\\.[a-z0-9-]{1,${tlds.maxLength}})`,
		PORT: "(:\\d+\\b)?",
		PATH_UNI: "([/?#]\\S*)?",
		PATH: "([/?#][\\w-.~!$&*+;=:@%/?#(),'\\[\\]]*)?"
	},
	TLD_TABLE = tlds.table;

function regexEscape(text) {
	return text.replace(/[[\]\\^-]/g, "\\$&");
}

function buildRegex({
	unicode = false, customRules = [], standalone = false,
	boundaryLeft, boundaryRight, ignoreMustache = false
}) {
	var pattern = RE.PROTOCOL + RE.USER;
	
	if (unicode) {
		pattern += RE.DOMAIN_UNI + RE.PORT + RE.PATH_UNI;
	} else {
		pattern += RE.DOMAIN + RE.PORT + RE.PATH;
	}
	
	var prefix, suffix, invalidSuffix;
	if (standalone) {
		if (boundaryLeft) {
			prefix = "(?:^|\\s)[" + regexEscape(boundaryLeft) + "]*";
		} else {
			prefix = "(?:^|\\s)";
		}
		if (boundaryRight) {
			suffix = "[" + regexEscape(boundaryRight) + "]*(?:$|\\s)";
		} else {
			suffix = "(?:$|\\s)";
		}
		invalidSuffix = "[^\\s" + regexEscape(boundaryRight) + "]";
	} else {
		prefix = "\\b"; // NOTE: \b won't match between non-word characters (e.g. / or .) so we don't use it in suffix
		suffix = "";
	}

  const [rx, groupInfos] = compile([
    ...customRules.map(r => `(${prefix})(${r.pattern})(${suffix})`),
    ignoreMustache ? /(\{\{[\s\S]+?\}\})/.source : '((?!))',
    `(${prefix})${pattern}(${suffix})`
  ], {
    flags: "igm",
    captureAll: false
  });
	return {
    url: rx,
    groupInfos,
		invalidSuffix: invalidSuffix && new RegExp(invalidSuffix),
	};
}

function pathStrip(m, re, repl) {
	var s = m.path.replace(re, repl);

	if (s == m.path) return;
	
	m.end -= m.path.length - s.length;
	m.suffix = m.path.slice(s.length) + m.suffix;
	m.path = s;
}

function pathStripQuote(m, c) {
	var i = 0, s = m.path, end, pos = 0;
	
	if (!s.endsWith(c)) return;
	
	while ((pos = s.indexOf(c, pos)) >= 0) {
		if (i % 2) {
			end = null;
		} else {
			end = pos;
		}
		pos++;
		i++;
	}
	
	if (!end) return;
	
	m.end -= s.length - end;
	m.path = s.slice(0, end);
	m.suffix = s.slice(end) + m.suffix;
}

function pathStripBrace(m, left, right) {
	var str = m.path,
		re = new RegExp("[\\" + left + "\\" + right + "]", "g"),
		match, count = 0, end;

	// Match loop
	while ((match = re.exec(str))) {
		if (count % 2 == 0) {
			end = match.index;
			if (match[0] == right) {
				break;
			}
		} else {
			if (match[0] == left) {
				break;
			}
		}
		count++;
	}

	if (!match && count % 2 == 0) {
		return;
	}
	
	m.end -= m.path.length - end;
	m.path = str.slice(0, end);
	m.suffix = str.slice(end) + m.suffix;
}

function isIP(s) {
	var m, i;
	if (!(m = s.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/))) {
		return false;
	}
	for (i = 1; i < m.length; i++) {
		if (+m[i] > 255 || (m[i].length > 1 && m[i][0] == "0")) {
			return false;
		}
	}
	return true;
}

function inTLDS(domain) {
	var match = domain.match(/\.([^.]+)$/);
	if (!match) {
		return false;
	}
	var key = match[1].toLowerCase();
  // eslint-disable-next-line no-prototype-builtins
	return TLD_TABLE.hasOwnProperty(key);
}

class UrlMatcher {
	constructor(options = {}) {
    if (options.customRules) {
      options.customRules = options.customRules.map(rule => {
        if (typeof rule === "string") {
          return {
            pattern: rule,
            replace: null
          }
        }
        return {
          pattern: rule.pattern,
          replace: rule.replace || null
        }
      });
    }

		this.options = options;
		this.regex = buildRegex(options);
	}
	
	*match(text) {
		var {
				fuzzyIp = true,
        mail = true
			} = this.options,
			{
				url,
        groupInfos,
				invalidSuffix,
			} = this.regex,
			urlLastIndex;
			
		url.lastIndex = 0;
		
		var urlMatch;
    const urlGroupOffset = groupInfos[groupInfos.length - 1].offset;
    const mustacheGroupOffset = groupInfos[groupInfos.length - 2].offset;
		while ((urlMatch = url.exec(text))) {
      const result = {
        custom: false,

        start: urlMatch.index,
        end: url.lastIndex,
        
        text: "",
        url: "",

        prefix: urlMatch[urlGroupOffset + 1] || "", // NOTE: this prefix/suffix only exists when url is matched
        protocol: urlMatch[urlGroupOffset + 2] || "",
        auth: urlMatch[urlGroupOffset + 3] || "",
        domain: urlMatch[urlGroupOffset + 4] || "",
        port: urlMatch[urlGroupOffset + 5] || "",
        path: urlMatch[urlGroupOffset + 6] || "",
        suffix: urlMatch[urlGroupOffset + 7] || "",

        mustache: urlMatch[mustacheGroupOffset + 1] || null,
      };

      if (result.mustache) {
        // mustache matched, skip
        continue;
      }
      
      if (!result.domain) {
        // custom rule matched
        const patternIndex = groupInfos.findIndex(gi => {
          return urlMatch[gi.offset + 2] !== undefined;
        });
        const gi = groupInfos[patternIndex];
        result.custom = true;
        result.start += urlMatch[gi.offset + 1].length; // prefix
        result.end -= urlMatch[gi.offset + gi.length].length; // suffix
        result.text = urlMatch[gi.offset + 2]; // middle
        let url;
        const customRule = this.options.customRules[patternIndex];
        if (customRule.replace) {
          url = evalRepl(customRule.replace, urlMatch, {
            offset: gi.offset + 2 // skip prefix and middle group
          });
        } else {
          url = result.text;
        }
        result.url = url;
			} else {
        result.start += result.prefix.length;
        result.end -= result.suffix.length;
				// adjust path and suffix
				if (result.path) {
					// Strip BBCode
					pathStrip(result, /\[\/?(b|i|u|url|img|quote|code|size|color)\].*/i, "");
					
					// Strip braces
					pathStripBrace(result, "(", ")");
					pathStripBrace(result, "[", "]");
					pathStripBrace(result, "{", "}");
					
					// Strip quotes
					pathStripQuote(result, "'");
					pathStripQuote(result, '"');
					
					// Remove trailing ".,?"
					pathStrip(result, /(^|[^-_])[.,?]+$/, "$1");
				}
				
        // FIXME: what is this?
				// check suffix
				if (invalidSuffix && invalidSuffix.test(result.suffix)) {
					if (/\s$/.test(result.suffix)) {
						url.lastIndex--;
					}
					continue;
				}
        
        // ignore fuzzy ip
				if (!fuzzyIp && isIP(result.domain) &&
            !result.protocol && !result.auth && !result.path) {
          continue;
        }
        
				// mailto protocol
				if (!result.protocol && result.auth) {
					var matchMail = result.auth.match(/^mailto:(.+)/);
					if (matchMail) {
						result.protocol = "mailto:";
						result.auth = matchMail[1];
					}
				}

				// http alias
				if (result.protocol && result.protocol.match(/^(hxxp|h\*\*p|ttp)/)) {
					result.protocol = "http://";
				}

				// guess protocol
				if (!result.protocol) {
					var domainMatch;
					if ((domainMatch = result.domain.match(/^(ftp|irc)/))) {
						result.protocol = domainMatch[0] + "://";
					} else if (result.domain.match(/^(www|web)/)) {
						result.protocol = "http://";
					} else if (result.auth && result.auth.indexOf(":") < 0 && !result.path) {
						result.protocol = "mailto:";
					} else {
						result.protocol = "http://";
					}
				}
        
        // ignore mail
        if (!mail && result.protocol === "mailto:") {
          continue;
        }
        
				// verify domain
        if (!isIP(result.domain)) {
          if (/^(http|https|mailto)/.test(result.protocol) && !inTLDS(result.domain)) {
            continue;
          }
          
          const invalidLabel = getInvalidLabel(result.domain);
          if (invalidLabel) {
            url.lastIndex = urlMatch.index + invalidLabel.index + 1;
            continue;
          }
        }

				// Create URL
				result.url = result.protocol + (result.auth && result.auth + "@") + result.domain + result.port + result.path;
				result.text = text.slice(result.start, result.end);
			}
			
			// since regex is shared with other parse generators, cache lastIndex position and restore later
			urlLastIndex = url.lastIndex;
			
			yield result;
			
			url.lastIndex = urlLastIndex;
		}
	}
}

function getInvalidLabel(domain) {
  // https://tools.ietf.org/html/rfc1035
  // https://serverfault.com/questions/638260/is-it-valid-for-a-hostname-to-start-with-a-digit
  let index = 0;
  const parts = domain.split(".");
  for (const part of parts) {
    if (
      !part ||
      part.startsWith("-") ||
      part.endsWith("-")
    ) {
      return {
        index,
        value: part
      };
    }
    index += part.length + 1;
  }
}

module.exports = {
	UrlMatcher
};
