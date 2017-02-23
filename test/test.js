var {describe, it} = require("mocha"),
	{UrlMatcher} = require("../lib/url-matcher"),
	assert = require("assert");

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
		match.no("http://example.zip");
		match.no("http://example.free");
		match.no("http://example.call");
		match.no("http://example.constructor");
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
});
