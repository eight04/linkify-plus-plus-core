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
* Linkifier - to run linkification on an element.

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

CDN
```
<script src="https://unpkg.com/linkify-plus-plus-core/dist/linkify-plus-plus-core.js"></script>
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
var linkifier = new Linkifier(document.body, {matcher: matcher});

// Linkifier will walk through the DOM tree, match url against all text nodes, and replace them with anchor element.
linkifier.on("complete", elapse => {
	console.log(`finished in ${elapse}ms`);
});
linkifier.on("error", err => {
	console.log("failed with error:", err);
});
linkifier.start();

// It is suggested to use `linkify()` function which wraps Linkifier to a promise.
linkify(document.body, {matcher}).then(onComplete, onError);
```	

API references
--------------
This module exports

* UrlMatcher - a class to find link from string
* Linkifier - a class to linkify elements
* linkify - a function wrapping Linkifier. Return a promise.
* INVALID_TAGS - a table of uppercase tag name, which are invalid ancestors for `<a>` element.

### UrlMatcher

#### new UrlMatcher([options: object])

The options object, all properties are optional:

* options.fuzzyIp: boolean, default:true - match 4 digits IP, which often looks like version numbers.
* options.ignoreMustache: boolean, default:false - ignore links inside mustache "{{", "}}". This is useful to work with other template library like Vue.js.
* options.unicode: boolean, default:false - match unicode character.
* options.customRules: array of string, default:[] - a list of regex pattern (in string). E.g. `["file:///\\S+", "magnet:\\?\\S+"]`
* options.standalone: boolean, default:false - the link must be surrounded by whitespace.
* options.boundaryLeft: string - works with `standalone` option. Allow some characters to be placed between whitespace and link. Some common characters are `{[("'`.
* options.boundaryRight: string - works with `standalone` option. Allow some characters to be placed between whitespace and link. Some common characters are `'")]},.;?!`.

#### UrlMatcher.prototype.match(text: string): generator

This generator yields matched result. The result object:

* result.start: integer - the start position of the url.
* result.end: integer - the end position of the url.
* result.text: string - the matched text.
* result.url: string - the url of the link. `.url` doesn't always equal `.text`, that `.text` might lack of the protocol but `.url` is always a full URL.
* result.custom: boolean - indicate if the result is matched by custom rules.

There are also some properties for each parts of the URL: `.protocol`, `.auth`, `.domain`, `.port`, `.path`.

### Linkifier

This class extends [`event-lite`](https://www.npmjs.com/package/event-lite).

#### new Linkifier([root: element, ] options: object)

* root: the element to be linkified.

The options object:

* options.matcher: URLMatcher, required.

  Any object having a `.match` method, which accepts a string and returns an iterable of matched result, should work.
  
  The match result must have `.start`, `.end`, `.text`, and `.url` properties described above.
  
* options.validator: function, optional.

  A function recieving an element and returning a boolean to decide if the element should be linkified. Note that the elements in `INVALID_TAGS` are already filtered out before the validator.
  
* options.newTab: boolean, default:true - add `target="_blank"` to the link.
* options.noOpener: boolean, default:true - add `rel="noopener"` to the link.
* options.root: element - if `root` argument is omitted, this value is adopted.
* options.embedImage: boolean, default:true - create `<img>` for the link if the url looks like an image.
* options.maxRunTime: number, default:100 - in milliseconds. The linkify process is splited into small chunks to avoid blocking. This is the max running time of each chunk.
* options.timeout: number, default:10000 - in milliseconds. If linkification have processed over this value, an error is raised. Note that any heavy work between each chunks are counted as in timeout too.

#### Linkifier.prototype.start()

Start linkification. The linkifier would walk through the DOM tree, collect text nodes and `<wbr>` tags, match URLs with matcher, and convert them into links.

#### Linkifier.prototype.abort()

Abort linkification.

#### Events

Linkifier emits following events, which could be listened with `.on`:

* complete - emit when the linkification completed. Listener arguments:

  - elapse: number. Time in milliseconds that Linkifier take to complete.
  
* error - emit when the linkification failed. Listener arguments:

  - error: The error.
  
* link - emit when a link is created. You can alter the style, or implement your link builder to replace the default one. Listener arguments:
  
  - An object containing following properties:
  
    - result: the result object generated by `UrlMatcher.match()`
    - range: Range. The text range linkifier is working on. Do not change the range unless you know what you are doing.
    - link: AnchorElement.
    - content: DocumentFragment. The text (including `<wbr>` tags) extract from matched text range, which is usually used as the content of the link.
    
### linkify([root: element, ] options: object) -> Promise

A convenient function to setup Linkifier. See Linkifier for the arguments. Additionally, if option object has some keys starting with `on`, the function treats them as event listeners. You can register event listener like this:

```
linkify(root, {
  matcher,
  onlink: ({link}) => {...}
}).then(...);
```

Other notes
-----------
* https://www.measurethat.net/Benchmarks/Show/1312/3/generator
* https://www.measurethat.net/Benchmarks/Show/1313/0/generator-with-low-count-of-items

License
-------
In the very old days, the script is based on Linkify Plus. Although it has been rewritten multiple times, the original license can be found [here](https://github.com/eight04/linkify-plus-plus-core/blob/master/LICENSE).

TLD list is grabbed from <http://data.iana.org/TLD/tlds-alpha-by-domain.txt>.

TLD count is grabbed from <http://research.domaintools.com/statistics/tld-counts/>.

Changelog
---------

* Version 0.2.0 (Mar 4, 2017):

  - Use standalone build instead of require.
  - Fix: blocking bug with large element without matching urls.

* Version 0.1.0 (Feb 23, 2017):

  - First release
