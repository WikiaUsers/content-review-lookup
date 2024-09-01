(function (mw) {
	"use strict";

	// Double run protection
	window.dev = window.dev || {};
	window.dev.ghBadges = window.dev.ghBadges || {
		hasRan: false
	};

	if (mw.config.get("wgNamespaceNumber") !== 0 || window.dev.ghBadges.hasRan) return;
	window.dev.ghBadges.hasRan = true;

	mw.hook('wikipage.content').add(function($content) {
		$content.find("div.gh-badge:not(.loaded)").each(function(_, badge) {
			badge.classList.add('loaded');
			var data = badge.dataset,
				link = new URL('https://github.com/' + data.ghRepository + '/actions/workflows/' + data.ghWorkflow + '/badge.svg');
			if (data.ghBranch) link.searchParams.append("branch", data.ghBranch);
			if (data.ghEvent) link.searchParams.append("event", data.ghEvent);

			var ghBadge = document.createElement("img");
			ghBadge.src = link.href;
			badge.appendChild(ghBadge);
		});
	});
})(window.mediaWiki);