// convert files defined to <div>s including
// the correlating background-image

/*
  attributions:
    https://fallout.fandom.com/wiki/MediaWiki:Common.js#L-38
    https://dev.fandom.com/wiki/MediaWiki:DiscordIntegrator/code.js#L-46
*/

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
		
	document.body.addEventListener('load', $.proxy(function(event) {
		var img = event.target;
		console.log(img);
		var iob = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				var img = entry.target;
				this.observer.unobserve(img);
				var div = $("<div>", {
					class: "cc-imghoriz",
					style: "background-image: url('" + img.getAttribute("data-src") + "')"
				});
				var pos = img.getAttribute("data-pos");
				div.css("background-position", (
					(!pos || isNaN(parseInt(pos)))
					? "50" : pos
				) + "%");
				div.css("width", img.height);
				div.css("height", img.height);
				$(img).replaceWith(div);
			}, this);
		});
		this.d.forEach(function(el) {
			if ($(img).is('img[data-image-name="' + el[0] + '"]:not(a img)')) {
				img.className = "";
				img.setAttribute("data-pos", el[1]);
				iob.observe(img);
			}
		}, this);
	}, {d: fd}), true);
});