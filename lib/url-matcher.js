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
	boundaryLeft, boundaryRight
}) {
	var pattern = RE.PROTOCOL + RE.USER;
	
	if (unicode) {
		pattern += RE.DOMAIN_UNI + RE.PORT + RE.PATH_UNI;
	} else {
		pattern += RE.DOMAIN + RE.PORT + RE.PATH;
	}
	
	if (customRules.length) {
		pattern = "(?:" + pattern + "|(" + customRules.join("|") + "))";
	} else {
		pattern += "()";
	}
	
	var prefix, suffix, invalidSuffix;
	if (standalone) {
		if (boundaryLeft) {
			prefix = "((?:^|\\s)[" + regexEscape(boundaryLeft) + "]*?)";
		} else {
			prefix = "(^|\\s)";
		}
		if (boundaryRight) {
			suffix = "([" + regexEscape(boundaryRight) + "]*(?:$|\\s))";
		} else {
			suffix = "($|\\s)";
		}
		invalidSuffix = "[^\\s" + regexEscape(boundaryRight) + "]";
	} else {
		prefix = "(^|\\b|_)";
		suffix = "()";
	}
	
	pattern = prefix + pattern + suffix;
	
	return {
		url: new RegExp(pattern, "igm"),
		invalidSuffix: invalidSuffix && new RegExp(invalidSuffix),
		mustache: /\{\{[\s\S]+?\}\}/g
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

function isDomain(d) {
	return /^[^.-]/.test(d) && d.indexOf("..") < 0;
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
		this.options = options;
		this.regex = buildRegex(options);
	}
	
	*match(text) {
		var {
				fuzzyIp = true,
				ignoreMustache = false,
        mail = true
			} = this.options,
			{
				url,
				invalidSuffix,
				mustache
			} = this.regex,
			urlLastIndex, mustacheLastIndex;
			
		mustache.lastIndex = 0;
		url.lastIndex = 0;
		
		var mustacheMatch, mustacheRange;
		if (ignoreMustache) {
			mustacheMatch = mustache.exec(text);
			if (mustacheMatch) {
				mustacheRange = {
					start: mustacheMatch.index,
					end: mustache.lastIndex
				};
			}
		}
		
		var urlMatch;
		while ((urlMatch = url.exec(text))) {
			var result;
			if (urlMatch[7]) {
				// custom rules
				result = {
					start: urlMatch.index,
					end: url.lastIndex,
					
					text: urlMatch[0],
					url: urlMatch[0],
					
					custom: urlMatch[7]
				};
			} else {
				result = {
					start: urlMatch.index + urlMatch[1].length,
					end: url.lastIndex - urlMatch[8].length,
					
					text: null,
					url: null,
					
					prefix: urlMatch[1],
					protocol: urlMatch[2],
					auth: urlMatch[3] || "",
					domain: urlMatch[4],
					port: urlMatch[5] || "",
					path: urlMatch[6] || "",
					custom: urlMatch[7],
					suffix: urlMatch[8]
				};
			}
			
			if (mustacheRange && mustacheRange.end <= result.start) {
				mustacheMatch = mustache.exec(text);
				if (mustacheMatch) {
					mustacheRange.start = mustacheMatch.index;
					mustacheRange.end = mustache.lastIndex;
				} else {
					mustacheRange = null;
				}
			}
			
			// ignore urls inside mustache pair
			if (mustacheRange && result.start < mustacheRange.end && result.end >= mustacheRange.start) {
				continue;
			}
			
			if (!result.custom) {
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
				
				// check suffix
				if (invalidSuffix && invalidSuffix.test(result.suffix)) {
					if (/\s$/.test(result.suffix)) {
						url.lastIndex--;
					}
					continue;
				}
				
				// check domain
				if (isIP(result.domain)) {
					if (!fuzzyIp && !result.protocol && !result.auth && !result.path) {
						continue;
					}
				} else if (isDomain(result.domain)) {
					if (!inTLDS(result.domain)) {
						continue;
					}
				} else {
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

				// Create URL
				result.url = result.protocol + (result.auth && result.auth + "@") + result.domain + result.port + result.path;
				result.text = text.slice(result.start, result.end);
			}
			
			// since regex is shared with other parse generators, cache lastIndex position and restore later
			mustacheLastIndex = mustache.lastIndex;
			urlLastIndex = url.lastIndex;
			
			yield result;
			
			url.lastIndex = urlLastIndex;
			mustache.lastIndex = mustacheLastIndex;
		}
	}
}

module.exports = {
	UrlMatcher
};
