// convert files defined to <div>s including
// the correlating background-image
$(document).ready(function() {
	'use strict';
	var fd = ({
		conf: [],
		api: new mw.Api(),
		apiGetter: function() {
			this.api.get({
				action: 'query',
				meta: 'allmessages',
				ammessages: 'Custom-CountryCollectors-config-horizimg'
				}).done($.proxy(function(d) {
				if (!d.error) {
				   	d.query.allmessages.forEach(function(el) {
						if (el['*']) el['*'].split("\n").forEach(function(e) {
							if (e.includes(".") && e != "") this.conf.push(e.split("|"));
						}, this);
					}, this);
				}
			}, this));
			return this.conf;
		}
	}).apiGetter();
		
	setTimeout($.proxy(function() {
		this.d.forEach(function(el) {
			[].forEach.call(document.querySelectorAll('img[data-image-name="' + el[0] + '"]:not(a img)'), function(img) {
				$.proxy(function defer() {
					if (img.getAttribute("src").startsWith("data:image/gif")) {
						setTimeout(function() { defer() }, 50);
					} else {
						img.onload = $.proxy(function() {
							var div = $("<div>", {
								class: "cc-imghoriz",
								style: "background-image: url('" + img.getAttribute("src") + "')"
							});
							div.css("background-position", (
								(!this.pos || isNaN(parseInt(this.pos)))
								? "50" : this.pos
							) + "%");
							div.css("width", img.height);
							div.css("height", img.height);
							$(img).replaceWith(div);
						}, {pos: el[1], img: img});
					}
				}, {pos: el[1], img: img})();
			}, {pos: el[1]});
		});
	}, {d: fd}), 1000);
});