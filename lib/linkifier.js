/* eslint-env browser */
var INVALID_TAGS = {
	A: true,
	NOSCRIPT: true,
	OPTION: true,
	SCRIPT: true,
	STYLE: true,
	TEXTAREA: true,
	SVG: true,
	CANVAS: true,
	BUTTON: true,
	SELECT: true,
	TEMPLATE: true,
	METER: true,
	PROGRESS: true,
	MATH: true,
	TIME: true
};

var doc = document,
	time = Date.now;

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

function* generateRanges(node, filter) {
	// Generate linkified ranges.
	var walker = doc.createTreeWalker(
		node,
		NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT,
		filter
	), start, end, current, range;

	end = start = walker.nextNode();
	if (!start) {
		return;
	}
	range = doc.createRange();
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

function createFilter(customValidator) {
	return {
		acceptNode: function(node) {
			if (customValidator && !customValidator(node)) {
				return NodeFilter.FILTER_REJECT;
			}
			if (INVALID_TAGS[node.nodeName]) {
				return NodeFilter.FILTER_REJECT;
			}
			if (node.nodeName == "WBR") {
				return NodeFilter.FILTER_ACCEPT;
			}
			if (node.nodeType == 3) {
				return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_SKIP;
		}
	};
}

function cloneContents(range) {
	if (range.startContainer == range.endContainer) {
		return doc.createTextNode(range.toString());
	}
	return range.cloneContents();
}

function* generateChunks({ranges, matcher, newTab = true, embedImage = true}) {
	for (var range of ranges) {
		var frag = null,
			pos = null,
			text = range.toString(),
			textRange = null;
		for (var result of matcher.match(text)) {
			if (!frag) {
				frag = doc.createDocumentFragment();
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

			var link = doc.createElement("a");
			link.href = result.url;
			link.title = "Linkify Plus Plus";
			link.className = "linkifyplus";
			if (newTab) {
				link.target = "_blank";
			}
			var child;
			if (embedImage && /^[^?#]+\.(?:jpg|png|gif|jpeg)(?:$|[?#])/i.test(result.url)) {
				child = new Image;
				child.src = result.url;
				child.alt = result.text;
			} else {
				child = cloneContents(textRange);
			}
			link.appendChild(child);
			
			textRange.collapse();

			frag.appendChild(link);
			yield;
		}
		if (pos) {
			pos.moveTo(text.length);
			textRange.setEnd(pos.container, pos.offset);
			frag.appendChild(cloneContents(textRange));
			
			range.deleteContents();
			range.insertNode(frag);
			yield;
		}
	}
}

class Linkifier {
	constructor(options) {
		this.options = options;
	}
	
	linkify(root) {
		return new Promise((resolve, reject) => {
			var {
					matcher,
					validator,
					maxRunTime = 100,
					timeout = 10000,
					newTab,
					embedImage,
				} = this.options,
				
				ranges = generateRanges(root, createFilter(validator)),
				chunks = generateChunks({matcher, newTab, embedImage, ranges}),
				
				linkifyStart = time();
				
			function next(){
				var nextStart = time(),
					now;
					
				do {
					if (chunks.next().done) {
						resolve(time() - linkifyStart);
						return;
					}
				} while ((now = time()) - nextStart < maxRunTime);
				
				if (now - linkifyStart > timeout) {
					reject(new Error(`max execution time exceeded: ${now - linkifyStart}, on ${root}`));
					return;
				}
				
				setTimeout(next);
			}
			
			setTimeout(next);
		});
	}
}

module.exports = {
	INVALID_TAGS,
	Linkifier
};
