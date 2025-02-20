/* eslint-env mocha browser */
import {assert} from "@open-wc/testing";
import {compareSnapshot} from "@web/test-runner-commands";

import {UrlMatcher, linkify} from "../dist/linkify-plus-plus-core.esm.js";

describe("UrlMatcher", () => {
	
	function prepare(options) {
		var matcher = new UrlMatcher(options),
			match = (text, start = 0, end = text.length) => {
				if (end <= 0) {
					end += text.length;
				}
				var [result] = matcher.match(text);
				assert.equal(result.start, start);
				assert.equal(result.end, end);
				return result;
			};
			
		match.no = (text) => {
			var [result] = matcher.match(text);
			assert.equal(result, undefined);
		};
		
		return match;
	}

	var match = prepare();
	
	it("basic", () => {
		match("http://example.com");
		match("http://example.com/");
		match("http://example.com/abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-.~!$&*+;=:@%/?#(),'[]");
    match("test@google.com");
	});
	
	it("domain", () => {
		match("http://exa-mple.com");
	});
	
	it("braces", () => {
		match("(http://example.com)", 1, -1);
		match("http://example.com)", 0, -1);
		match("http://example.com/(foo)");
		match("http://example.com/(f o o)", 0, 19);
	});
	
	it("http alias", () => {
		assert.equal(match("ttp://example.com").protocol, "http://");
		assert.equal(match("h**p://example.com").protocol, "http://");
		assert.equal(match("hxxp://example.com").protocol, "http://");
	});
	
	it("IP address", () => {
		match("http://127.0.0.1");
		match.no("http://127.0.0.256");
		match.no("http://127.0.0.01");
	});
	
	it("protocol guessing", () => {
		assert.equal(match("example.com").protocol, "http://");
		assert.equal(match("user@example.com").protocol, "mailto:");
		assert.equal(match("user@www.example.com").protocol, "http://");
		assert.equal(match("user:pass@example.com").protocol, "http://");
		assert.equal(match("user@example.com/path/").protocol, "http://");
		assert.equal(match("ftp.example.com").protocol, "ftp://");
		assert.equal(match("irc.example.com").protocol, "irc://");
	});
	
	it("dots", () => {
		match("http://example.com.", 0, -1);
		match("http://example.com..", 0, -2);
		match("http://example.com...", 0, -3);
		match("http://example.com/.", 0, -1);
		match("http://example.com/..", 0, -2);
		match("http://example.com/...", 0, -3);
	});
	
	it("question mark", () => {
		match("http://example.com?", 0, -1);
	});
	
	it("comma", () => {
		match("http://example.com/path,", 0, -1);
		match("http://example.com/path,path-continue");
	});
	
	it("bad tlds", () => {
    // now .zip is more common
		// match.no("http://example.zip");
		match.no("http://example.free");
		match.no("http://example.call");
		match.no("http://example.constructor");
	});
  
  it("ignore bad tlds for unknown protocol", () => {
    match("macupdater://com.busymac.busycal3");
  });
	
	it("bbcode", () => {
		match("[img]http://example.com[/img]", 5, -6);
		match("http://example.com[b]something-else[/b]", 0, 18);
	});
	
	it("mustache", () => {
		var match = prepare({ignoreMustache: true});
		match.no("{{http://example.com}}");
		match.no("{{\nhttp://example.com\n}}");
	});
  
  it("custom rules", () => {
    const match = prepare({customRules: [
      "magnet:\\?\\S+"
    ]});
    match("magnet:?xt=urn:btih:c12fe1c06bba254a9dc9f519b335aa7c1367a88a&dn");
  });
  
  it("custom rules should take priority", () => {
    const match = prepare({customRules: [
      "http://...example\\.com"
    ]});
    match("http://-.-example.com", 0);
  });
  
  it("no mail", () => {
    const match = prepare({mail: false});
    match.no("test@google.com");
  });
  
  it("domain with dash or dot", () => {
    match("-example.com", 1);
    match(".example.com", 1);
    match("-.example.com", 2);
  });
  
  it("infinite loop bug", () => {
    match("example com example.-invalid.com", 21);
  });
  
  it("match domains starting with numbers", () => {
    match("https://1fichier.com");
    match("https://9292.nl");
  });

  it("onion links", () => {
    match("http://example.onion");
  });
});

describe("Linkifier", () => {
  let matcher;
  let body;
  before(() => {
    matcher = new UrlMatcher();
    body = document.querySelector("body");
  });

  it("basic", async () => {
    body.innerHTML = "example.com <span>example.com</span>";
    await linkify(body, {matcher});
    await compareSnapshot({
      name: "basic",
      content: body.innerHTML
    });
  });

  it("recursive off", async () => {
    body.innerHTML = "example.com <span>example.com</span>";
    await linkify(body, {matcher, recursive: false});
    await compareSnapshot({
      name: "recursive off",
      content: body.innerHTML
    });
  });

  it("wbr", async () => {
    body.innerHTML = "exam<wbr>ple.com";
    await linkify(body, {matcher, recursive: false});
    await compareSnapshot({
      name: "wbr",
      content: body.innerHTML
    });
  });

  it("invalid tags", async () => {
    body.innerHTML = "<script>example.com</script>";
    await linkify(body, {matcher, recursive: false});
    await compareSnapshot({
      name: "invalid tags",
      content: body.innerHTML
    });
  });

});
