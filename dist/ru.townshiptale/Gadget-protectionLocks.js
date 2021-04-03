// Page protection indicators
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

function getImageURL(name, store, size) {
	var encodedName = mw.util.wikiUrlencode(name);
	return "/media/"
		+ store
		+ "/"
		+ encodedName;
}

function mimicIndicator(id, link, imgName, imgStore, title) {
	var encodedLink = mw.util.getUrl(link);
	return $("<div>")
		.attr("id", "mw-indicator-" + id)
		.addClass("mw-indicator")
		.append($("<a>")
			.attr({
				"href": encodedLink,
				"title": title,
				"class": "image"
			}).append($("<img>")
				.attr({
				"alt": title,
				"src": getImageURL(imgName, imgStore, 25),
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
			"Minecraft Wiki:Автоподтверждённые участники",
			"Серый замок.svg",
			"0/00",
			"Эта страница защищена от правок незарегистрированными или новыми участниками."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			"Minecraft Wiki:Администраторы",
			"Замок.svg",
			"6/6d",
			"Эта страница полностью защищена от правок обычными участниками."
		).appendTo($(".mw-indicators"));
	}
	
	if (moveProtectionLevelData[0] === "sysop") {
		mimicIndicator(
			"protection-move",
			"Minecraft Wiki:Защита страниц",
			"Зелёный замок.svg",
			"b/b7",
			"Эта страница полностью защищена от переименования обычными участниками."
		).appendTo($(".mw-indicators"));
	}
});