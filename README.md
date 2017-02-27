Linkify Plus Plus Core
======================

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c364eadd48b347a6908eb3ed8efc2739)](https://www.codacy.com/app/eight04/linkify-plus-plus-core?utm_source=github.com&utm_medium=referral&utm_content=eight04/linkify-plus-plus-core&utm_campaign=badger)

A JavaScript library for linkification stuff. Used by [linkify-plus-plus](https://github.com/eight04/linkify-plus-plus).

Demo
----
https://rawgit.com/eight04/linkify-plus-plus-core/master/demo/demo.html

Features
--------
This module exports 2 classes.

* UrlMatcher - an URL matcher which can match almost all types of links from a string.
* Linkifier - a promise-based service to run linkification on an element.

Installation
------------
```
npm install -S linkify-plus-plus-core
```
```JavaScript
var {UrlMatcher, Linkifier} = require("linkify-plus-plus-core");
// or use the matcher only
var {UrlMatcher} = require("linkify-plus-plus-core/lib/url-matcher")
```

There is also a browserified standalone build in `dist` folder, which can be included in your html directly.
```
<script src="path/to/linkify-plus-plus-core.js"></script>
<script>
// access the module with "linkifyPlusPlusCore" global
var {UrlMatcher, Linkifier} = linkifyPlusPlusCore;
</script>
```

Usage
-----
```JavaScript
// create a matcher
var matcher = new UrlMatcher();

for (var link of matcher.match(text)) {
	// matcher.match() returns a generator, yielding an object for each match result
	console.log(link.start, link.end, link.text, link.url);
}
```
```JavaScript
// Linkifier needs a matcher to work
var linkifier = new Linkifier({matcher: matcher});

// Linkifier will walk through the DOM tree, match url against all text nodes, and replace them with anchor element.
linkifier.linkify(document.body).then(elapse => {
	console.log(`finished in ${elapse}ms`);
}, err => {
	console.log("failed with error:", err);
});
```	

API references
--------------
This module exports

* UrlMatcher - a class to find link from string
* Linkifier - a class to linkify elements
* INVALID_TAGS - a table of uppercase tag name, which are invalid ancestors for `<a>` element.

### UrlMatcher

#### UrlMatcher.constructor([options: object])

The options object, all properties are optional:

* options.fuzzyIp: boolean, default:true - match 4 digits IP, which often looks like version numbers.
* options.ignoreMustache: boolean, default:false - ignore links inside mustache "{{", "}}". This is useful to work with other template library like Vue.js.
* options.unicode: boolean, default:false - match unicode character.
* options.customRules: array of string, default:[] - a list of regex pattern (in string). E.g. `["file:///\\S+", "magnet:\\?\\S+"]`
* options.standalone: boolean, default:false - the link must be surrounded by whitespace.
* options.boundaryLeft: string - works with `standalone` option. Allow some characters to be placed between whitespace and link. Some common characters are `{[("'`.
* options.boundaryRight: string - works with `standalone` option. Allow some characters to be placed between whitespace and link. Some common characters are `'")]},.;?!`.

#### UrlMatcher.match(text: string): generator

The generator yielding matched result. The result object:

* result.start: integer - the start position of the url.
* result.end: integer - the end position of the url.
* result.text: string - the matched text.
* result.url: string - the url of the link. `.url` doesn't always equal `.text`, that `.text` might lack of the protocol but `.url` is always a full URL.
* result.custom: boolean - indicate if the result is matched by custom rules.

There are also some properties for each parts of the URL: `.protocol`, `.auth`, `.domain`, `.port`, `.path`.

### Linkifier

#### Linkifier.constructor(options: object)

The options object:

* options.matcher: any object with MatcherInterface, required.

  A matcher is an object, having a `.match` method, which accepts a string and returns an iterable of matched result.
  
  The match result must have `.start`, `.end`, `.text`, and `.url` properties described above.
  
* options.validator: function, optional.

  A function recieving an element and returning a boolean to decide if the element should be linkified. Note that the elements in `INVALID_TAGS` are already filtered out before the validator.
  
* options.newTab: boolean, default:true - add `target="_blank"` to the link.
* options.embedImage: boolean, default:true - create `<img>` for the link if the url looks like an image.
* options.maxRunTime: number, default:100 - in milliseconds. The linkify process is splited into small chunks to avoid blocking. This is the max running time of each chunk.
* options.timeout: number, default:10000 - in milliseconds. If linkification have processed over this value, an error is raised. Note that any heavy work between each chunks are counted as in timeout too.

#### Linkifier.linkify(element): promise

Linkify an element. The linkifier would walk through the DOM tree, collect text node and `<wbr>` tags, match link with matcher, and convert them into links.

When finished, the promise is resolved with elapsed time.
When timeout, the promise is rejected with an error.

Other notes
-----------
* https://www.measurethat.net/Benchmarks/Show/1312/3/generator
* https://www.measurethat.net/Benchmarks/Show/1313/0/generator-with-low-count-of-items

License
-------
In the very old days, the script is based on Linkify Plus. Although it has been rewritten multiple times, the original license can be found at `LICENSE`.

TLD list is grabbed from <http://data.iana.org/TLD/tlds-alpha-by-domain.txt>.

TLD count is grabbed from <http://research.domaintools.com/statistics/tld-counts/>.

Changelog
---------

* Version 0.1.0 (Feb 23, 2017):

  - First release
