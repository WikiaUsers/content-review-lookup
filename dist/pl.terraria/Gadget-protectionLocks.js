// Page protection indicators
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

var docLink = "Project:Protected pages";

function getImageURL(name, store, size) {
	var encodedName = mw.util.wikiUrlencode(name);
	return "https://terraria.gamepedia.com/media/"
		+ store
		+ "/"
		+ encodedName;
}

function mimicIndicator(id, link, imgName, imgStore, title) {
	var encodedLink = mw.util.getUrl(link);
	return $("<div>")
		.attr("id", "mw-indicator-" + id)
		.addClass("mw-indicator")
		.addClass("mw-indicator-protection-lock")
		.append($("<a>")
			.attr({
				"href": encodedLink,
				"title": title,
				"class": "image"
			}).append($("<img>")
				.attr({
				"alt": title,
				"src": getImageURL(imgName, imgStore, 29),
				"width": "25",
				"height": "25"
				})
			)
		);
}

$(function() {
	var protectionLevelData = mw.config.get("wgRestrictionEdit");
	var moveProtectionLevelData = mw.config.get("wgRestrictionMove");
	
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
			docLink,
			"Silver Lock.png",
			"7/78",
			"This page is protected from being edited by unregistered or new users."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			docLink,
			"Gold Lock.png",
			"5/55",
			"This page is fully protected from being edited by regular users."
		).appendTo($(".mw-indicators"));
	}
	
	if (moveProtectionLevelData[0] === "sysop") {
		mimicIndicator(
			"protection-move",
			docLink,
			"Green Lock.png",
			"a/ab",
			"This page is fully protected from being moved by regular users."
		).appendTo($(".mw-indicators"));
	}
});