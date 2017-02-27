/* eslint-env browser */
/* globals Vue */
var {UrlMatcher, Linkifier} = linkifyPlusPlusCore;

var app = new Vue({
	el: ".main",
	data: {
		text: "Try some links here!\n\nexample.com\nhttp://www.example.com",
		options: {
			fuzzyIp: true,
			ignoreMustache: true,
			unicode: false,
			newTab: true,
			embedImage: true
		}
	}
});

var state = {
	working: false,
	pending: false
};

function output() {
	if (state.working) {
		state.pending = true;
		return;
	}
	state.working = true;
	var out = document.querySelector("#output");
	out.textContent = app.text;
	var options = Object.assign(app.options);
	options.matcher = new UrlMatcher(options);
	new Linkifier(options).linkify(out).then(() => {
		state.working = false;
		if (state.pending) {
			state.pending = false;
			output();
		}
	});
}

app.$watch(function() {
	return [this.text, this.options];
}, output, {deep: true});

output();

function resize() {
	var el = document.querySelector("#input");
	el.style.minHeight = Math.max(el.scrollHeight, el.offsetHeight) + "px";
}

app.$watch("text", resize);

resize();
