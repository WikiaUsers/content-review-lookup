// Page protection indicators
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

function getImageThumbnailURL(name, store, size) {
	var encodedName = mw.util.wikiUrlencode(name);
	return "https://static.wikia.nocookie.net/minecraft_gamepedia/images/"
		+ store
		+ "/"
		+ encodedName
		+ "/revision/latest"
}

function mimicIndicator(id, link, imgName, imgStore, title) {
	var encodedLink = mw.util.getUrl(link);
	return $("<div>")
		.attr("id", "mw-indicator-" + id)
		.addClass("mw-indicator")
		.append($("<a>")
			.attr({
				"href": encodedLink,
				"title": title
			}).append($("<img>")
				.attr({
				"alt": title,
				"src": getImageThumbnailURL(imgName, imgStore, 25),
				"srcset": getImageThumbnailURL(imgName, imgStore, 38)
					+ " 1.5x, "
					+ getImageThumbnailURL(imgName, imgStore, 50)
					+ " 2x",
				"width": "25",
				"height": "25"
				})
			)
		);
}

$(function() {
	var protectionLevelData = mw.config.get("wgRestrictionEdit");
	if (protectionLevelData === null) {
		// Null on nonexistent or special pages. Avoids a crash there.
		return;
	}
	if (mw.config.get("wgAction") !== "view") {
		// No need to display the indicator when viewing history or editing the page
		return;
	}
	if (mw.config.get("wgIsMainPage")) {
		// The indicator lock breaks formatting on the main page due to the level 1 header being hidden
		return;
	}
	
	var protectionLevel = protectionLevelData[0];
	if (protectionLevel === "autoconfirmed") {
		mimicIndicator(
			"protection-semi",
			"Minecraft Wiki:Autoconfirmed users",
			"Semi-protected page lock.png",
			"9/9b",
			"This page is semi-protected so that only registered users can edit it."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "directoreditprotected") {
		mimicIndicator(
			"protection-director",
			"Minecraft Wiki:Directors",
			"Director-protected page lock.png",
			"8/85",
			"This page is directors-only protected so that only directors can edit it."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			"Minecraft Wiki:Administrators",
			"Fully-protected page lock.png",
			"4/49",
			"This page is fully protected so that only administrators can edit it."
		).appendTo($(".mw-indicators"));
	}
});