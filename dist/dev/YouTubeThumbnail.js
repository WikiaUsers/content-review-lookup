(function (mw) {
	"use strict";

	// Double-run protection
	window.dev = window.dev || {};
	window.dev.youtubeThumbnail = window.dev.youtubeThumbnail || {
		hasRan: false
	};

	// Only run on article pages
	if (mw.config.get("wgNamespaceNumber") !== 0) return;

	if (window.dev.youtubeThumbnail.hasRan) {
		console.log("YouTubeThumbnail already ran!");
		return;
	}
	window.dev.youtubeThumbnail.hasRan = true;

	mw.hook('wikipage.content').add(function($content) {
		$content.find(".youtube-thumbnail:not(.loaded)").each(function(_, thumbPlaceholder) {
			thumbPlaceholder.classList.add('loaded');
			var imgElem = document.createElement("img");
			imgElem.src = "https://i.ytimg.com/vi/".concat(thumbPlaceholder.dataset.ytThumbId, "/hq720.jpg");
			imgElem.style.maxWidth = "100%";

			thumbPlaceholder.appendChild(imgElem);
		});
	});
})(window.mediaWiki);