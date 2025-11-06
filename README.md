Linkify Plus Plus Core
======================

[![test](https://github.com/eight04/linkify-plus-plus-core/actions/workflows/test.yml/badge.svg)](https://github.com/eight04/linkify-plus-plus-core/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/eight04/linkify-plus-plus-core/branch/master/graph/badge.svg)](https://codecov.io/gh/eight04/linkify-plus-plus-core)

A JavaScript library for linkification stuff. Used by [linkify-plus-plus](https://github.com/eight04/linkify-plus-plus).

Demo
----
https://rawgit.com/eight04/linkify-plus-plus-core/master/demo/demo.html

Features
--------

This module exports 2 classes.

* UrlMatcher - a URL matcher which can match almost all types of links from a string.
* Linkifier - to linkify an element.

Compatibility
-------------

* Tested on Firefox >= 56.
* Support HTML/XHTML pages.

Installation
------------

```
npm install linkify-plus-plus-core
```

```JavaScript
const {UrlMatcher, Linkifier} = require("linkify-plus-plus-core");
// or use the matcher only
const {UrlMatcher} = require("linkify-plus-plus-core/lib/url-matcher")
```

There is also a browserified standalone build in `dist` folder, which can be included in your html directly.

```
<script src="path/to/linkify-plus-plus-core.js"></script>
<script>
// access the module with "linkifyPlusPlusCore" global
const {UrlMatcher, Linkifier} = linkifyPlusPlusCore;
</script>
```

unpkg.com CDN:

* https://unpkg.com/linkify-plus-plus-core/dist/linkify-plus-plus-core.js
* https://unpkg.com/linkify-plus-plus-core/dist/linkify-plus-plus-core.min.js

Usage
-----

```JavaScript
// create a matcher
const matcher = new UrlMatcher();

for (const link of matcher.match(text)) {
	// matcher.match() returns a generator, yielding an object for each match result
	console.log(link.start, link.end, link.text, link.url);
}
```

```JavaScript
// Linkifier needs a matcher to work
const linkifier = new Linkifier(document.body, {matcher: matcher});

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

This module exports:

* UrlMatcher - a class to find link from string
* Linkifier - a class to linkify elements
* linkify - a function wrapping Linkifier. Return a promise.
* INVALID_TAGS - a table of uppercase tag name, which are invalid ancestors for `<a>` element.

### UrlMatcher

```js
const urlMatcher = new UrlMatcher({
  fuzzyIp: Boolean,
  mail: Boolean,
  ignoreMustache: Boolean,
  unicode: Boolean,
  customRules: Array<{pattern: string, replace?: string}>,
  standalone: Boolean,
  boundaryLeft: String,
  boundaryRight: String
});
```

All options are optional:

* `fuzzyIp` - match 4 digits IP, which often looks like version numbers. Default: `true`
* `mail` - match email. Default: `true`
* `ignoreMustache` - ignore links inside mustache "{{", "}}". This is useful to work with other template library like Vue.js. Default: `false`
* `unicode` - match unicode character. Default: `false`
* `customRules` - add custom regex with optional replacement string. The replacement string is used to generate `matchResult.url`. Example: `[{pattern: "magnet:\\?\\S+"}, {pattern: "(\\d{10})", replace: "tel:+$1"}]`. Default: `[]`
* `standalone` - the link must be surrounded by whitespace. Default: `false`
* `boundaryLeft` - has no effect without the `standalone` option. Allow some characters to be placed between whitespace and link. Some common characters are `{[("'`. Default: `""`
* `boundaryRight` - has no effect without the `standalone` option. Allow some characters to be placed between whitespace and link. Some common characters are `'")]},.;?!`. Default: `""`

#### urlMatcher.match

```js
for (const matchResult of urlMatcher.match(text: String)) {
  ...
}
```

Match the text and return a generator which yields matched results.

`matchResult` object:

```js
matchResult: {
  start: Integer,
  end: Integer,
  text: String,
  url: String,
  custom: Boolean,
  protocol: String,
  auth: String,
  domain: String,
  port: String,
  path: String
}
```

* `start` - the start position of the url.
* `end` - the end position of the url.
* `text` - matched text.
* `url` - the url of the link. `.url` doesn't always equal `.text`, that `.text` might lack of the protocol but `.url` is always a full URL.
* `custom` - indicate if the result is matched by custom 4rules.

Other properties i.e. `.protocol`, `.auth`, `.domain`, `.port`, and `.path` are different parts of the URL.

### Linkifier

```js
const linkifier = new Linkifier([root: Element, ] options: Object);
```

This class extends [`event-lite`](https://www.npmjs.com/package/event-lite).

* `root` - the element that is going to be linkified.

`options` object:

```js
options: {
  matcher: UrlMatcher,
  validator?: Function,
  newTab?: Boolean,
  noOpener?: Boolean,
  root?: Element,
  embedImage?: Boolean,
  maxRunTime?: Number,
  timeout?: Number,
  recursive?: Boolean
}
```

* `matcher` - A `UrlMatcher`, required.

  In fact, any object having a `.match` method which accepts a string and returns an iterable of matched result should work.
  
  The match result must have `.start`, `.end`, `.text`, and `.url` properties described above.
  
* `validator` - A function recieving an element and returning a boolean to decide if the element should be linkified. Note that the elements in `INVALID_TAGS` are already filtered out before the validator.
* `newTab` - add `target="_blank"` to the link. Default: `true`
* `noOpener` - add `rel="noopener"` to the link. Default: `true`
* `root` - if you didn't supply the position argument `root` argument to the constructor, this value is used.
* `embedImage` - create `<img>` for the link if the URL looks like an image. Default: `true`
* `maxRunTime` - in milliseconds. The linkify process is split into small chunks to avoid blocking. This is the max execution time of each chunk. Default: `100`
* `timeout` - in milliseconds. If linkification have processed over this value, an error is raised. Note that any heavy work between each chunks are counted as in timeout too. Default: `10000`
* `recursive` - if true, linkify the entire node tree. Otherwise, only text nodes under `root` are linkified. Default: `true`

#### linkifier.start

```js
linkifier.start()
```

Start linkification. The linkifier would walk through the DOM tree, collect text nodes and `<wbr>` tags, match URLs with matcher, and convert them into links.

#### linkifier.abort

```js
linkifier.abort()
```

Abort linkification.

#### linkifier events

`Linkifier` emits following events, which could be listened with `.on`:

* `complete` - emitted when the linkification completed. Listener arguments:

  - `elapse: Number` - time in milliseconds that the linkifier took to complete.
  
* `error` - emitted when the linkification failed. Listener arguments:

  - `error: Error` - The error.
  
* `link` - emitted when a link is created. You can alter the style, or implement your link builder to replace the default one. Listener arguments:
  
  - An object containing following properties:
  
    - `result: Object` - the result object yielded by `UrlMatcher.match()`
    - `range: Range` - the text range that the linkifier is working on. Do not change the range unless you know what you are doing.
    - `link: AnchorElement` - the link element.
    - `content: DocumentFragment` - the text (including `<wbr>` tags) extracted from matched text range, which is usually used as the content of the link.
    
### linkify

```js
async linkify([root: Element, ] options: Object)
```

A convenient function to setup/start a linkifier. See `Linkifier` for the arguments. Additionally, if the options object has some keys starting with `on`, the function treats them as event listeners. You can register event listeners like:

```js
linkify({
  root,
  matcher,
  onlink: ({link}) => {...}
})
  .then(...);
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

* 0.8.1 (Nov 6, 2025)

  - Refactor: add `lib/rx.js` for regex related utilities.

* 0.8.0 (Oct 27, 2025)

  - **Breaking: change `customRules` shape.**
  - Add: `replace` property to custom rules for URL transformation.
  - Update TLDs.

* 0.7.0 (Feb 20, 2025)

  - Add: onion TLD.
  - Update TLDs.

* 0.6.1 (Feb 16, 2024)

  - Fix: options is undefined error.

* 0.6.0 (Feb 14, 2024)

  - Add: `recursive` option in `Linkifier`.
  - Update TLDs.

* 0.5.3 (Mar 10, 2021)

  - Fix: allow domains starting with digits.

* 0.5.2 (Feb 12, 2021)

  - Fix: infinite loop bug.

* 0.5.1 (Feb 11, 2021)

  - Update TLDs.
  - Change: match custom rules first.
  - Fix: handle invalid domains in a better way.

* 0.5.0 (Oct 29, 2020)

  - Update TLDs.
  - Add: mail option.
  - Add: embed webp and apng.
  - **Change: the matcher will only verify TLD if the protocol is http(s) or mailto.**

* 0.4.1 (Jun 17, 2019)

  - Update TLDs.

* 0.4.0 (Feb 17, 2019)

  - **Breaking: drop Firefox < 56.**
  - **Breaking: drop babel.**
  - **Breaking: INVALID_TAGS is now in lower-case.**
  - Add: support XHTML pages.
  - Update TLDs.

* 0.3.0 (Aug 23, 2017)

  - **Drop: Linkifier.prototype.linkify. Now Linkifier uses event pattern.**
  - Add linkify function.
  - Update TLDs.

* 0.2.0 (Mar 4, 2017)

  - Use standalone build instead of require.
  - Fix: blocking bug with large element without matching urls.

* 0.1.0 (Feb 23, 2017)

  - First release
