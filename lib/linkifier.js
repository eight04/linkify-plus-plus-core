/* eslint-env browser */

var Events = require("event-lite");

var INVALID_TAGS = {
	a: true,
	noscript: true,
	option: true,
	script: true,
	style: true,
	textarea: true,
	svg: true,
	canvas: true,
	button: true,
	select: true,
	template: true,
	meter: true,
	progress: true,
	math: true,
	time: true
};

class Pos {
	constructor(container, offset, i = 0) {
		this.container = container;
		this.offset = offset;
		this.i = i;
	}
	
	add(change) {
		var cont = this.container,
			offset = this.offset;

		this.i += change;
		
		// If the container is #text.parentNode
		if (cont.childNodes.length) {
			cont = cont.childNodes[offset];
			offset = 0;
		}

		// If the container is #text
		while (cont) {
			if (cont.nodeType == 3) {
				if (!cont.LEN) {
					cont.LEN = cont.nodeValue.length;
				}
				if (offset + change <= cont.LEN) {
					this.container = cont;
					this.offset = offset + change;
					return;
				}
				change = offset + change - cont.LEN;
				offset = 0;
			}
			cont = cont.nextSibling;
		}
	}
	
	moveTo(offset) {
		this.add(offset - this.i);
	}
}

function cloneContents(range) {
	if (range.startContainer == range.endContainer) {
		return document.createTextNode(range.toString());
	}
	return range.cloneContents();
}

var DEFAULT_OPTIONS = {
	maxRunTime: 100,
	timeout: 10000,
	newTab: true,
	noOpener: true,
	embedImage: true,
  recursive: true,
};

class Linkifier extends Events {
	constructor(root, options = {}) {
		super();
		if (!(root instanceof Node)) {
			options = root;
			root = options.root;
		}
		this.root = root;
		this.options = Object.assign({}, DEFAULT_OPTIONS, options);
		this.aborted = false;
	}
	start() {
		var time = Date.now,
			startTime = time(),
			chunks = this.generateChunks();
			
		var next = () => {
			if (this.aborted) {
				this.emit("error", new Error("Aborted"));
				return;
			}
			var chunkStart = time(),
				now;
				
			do {
				if (chunks.next().done) {
					this.emit("complete", time() - startTime);
					return;
				}
			} while ((now = time()) - chunkStart < this.options.maxRunTime);
			
			if (now - startTime > this.options.timeout) {
				this.emit("error", new Error(`max execution time exceeded: ${now - startTime}, on ${this.root}`));
				return;
			}
			
			setTimeout(next);
		};
			
		setTimeout(next);
	}
	abort() {
		this.aborted = true;
	}
	*generateRanges() {
		var {validator, recursive} = this.options;
		var filter = {
			acceptNode: function(node) {
				if (validator && !validator(node)) {
					return NodeFilter.FILTER_REJECT;
				}
				if (INVALID_TAGS[node.localName]) {
					return NodeFilter.FILTER_REJECT;
				}
				if (node.localName == "wbr") {
					return NodeFilter.FILTER_ACCEPT;
				}
				if (node.nodeType == 3) {
					return NodeFilter.FILTER_ACCEPT;
				}
				return recursive ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_REJECT;
			}
		};
		// Generate linkified ranges.
		var walker = document.createTreeWalker(
			this.root,
			NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT,
			filter
		), start, end, current, range;

		end = start = walker.nextNode();
		if (!start) {
			return;
		}
		range = document.createRange();
		range.setStartBefore(start);
		while ((current = walker.nextNode())) {
			if (end.nextSibling == current) {
				end = current;
				continue;
			}
			range.setEndAfter(end);
			yield range;

			end = start = current;
			range.setStartBefore(start);
		}
		range.setEndAfter(end);
		yield range;
	}
	*generateChunks() {
		var {matcher} = this.options;
		for (var range of this.generateRanges()) {
			var frag = null,
				pos = null,
				text = range.toString(),
				textRange = null;
			for (var result of matcher.match(text)) {
				if (!frag) {
					frag = document.createDocumentFragment();
					pos = new Pos(range.startContainer, range.startOffset);
					textRange = range.cloneRange();
				}
				// clone text
				pos.moveTo(result.start);
				textRange.setEnd(pos.container, pos.offset);
				frag.appendChild(cloneContents(textRange));
				
				// clone link
				textRange.collapse();
				pos.moveTo(result.end);
				textRange.setEnd(pos.container, pos.offset);
				
				var content = cloneContents(textRange),
					link = this.buildLink(result, content);

				textRange.collapse();

				frag.appendChild(link);
				this.emit("link", {link, range, result, content});
			}
			if (pos) {
				pos.moveTo(text.length);
				textRange.setEnd(pos.container, pos.offset);
				frag.appendChild(cloneContents(textRange));
				
				range.deleteContents();
				range.insertNode(frag);
			}
			yield;
		}
	}
	buildLink(result, content) {
		var {newTab, embedImage, noOpener} = this.options;
		var link = document.createElement("a");
		link.href = result.url;
		link.title = "Linkify Plus Plus";
		link.className = "linkifyplus";
		if (newTab) {
			link.target = "_blank";
		}
		if (noOpener) {
			link.rel = "noopener";
		}
		var child;
		if (embedImage && /^[^?#]+\.(?:jpg|jpeg|png|apng|gif|svg|webp)(?:$|[?#])/i.test(result.url)) {
			child = new Image;
			child.src = result.url;
			child.alt = result.text;
		} else {
			child = content;
		}
		link.appendChild(child);
		return link;
	}
}

function linkify(...args) {
	return new Promise((resolve, reject) => {
		var linkifier = new Linkifier(...args);
		linkifier.on("error", reject);
		linkifier.on("complete", resolve);
		for (var key of Object.keys(linkifier.options)) {
			if (key.startsWith("on")) {
				linkifier.on(key.slice(2), linkifier.options[key]);
			}
		}
		linkifier.start();
	});
}

module.exports = {
	INVALID_TAGS,
	Linkifier,
	linkify
};
