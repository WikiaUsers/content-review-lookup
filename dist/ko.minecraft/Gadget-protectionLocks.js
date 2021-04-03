// Page protection indicators
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

function getImageThumbnailURL(name, store, size) {
	var encodedName = mw.util.wikiUrlencode(name);
	/*return "/media/thumb/"
		+ store
		+ "/"
		+ encodedName
		+ "/"
		+ size
		+ "px-"
		+ encodedName;*/
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
			"이 페이지는 준보호되어있어 로그인 한 사람만 편집할 수 있습니다."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "directoreditprotected") {
		mimicIndicator(
			"protection-director",
			"Minecraft Wiki:Directors",
			"Director-protected page lock.png",
			"8/85",
			"이 페이지는 directors-only보호되어있어 Directors 이상만 편집할 수 있습니다."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			"Minecraft Wiki:Administrators",
			"Fully-protected page lock.png",
			"4/49",
			"이 페이지는 보호되어있어 관리자만 편집할 수 있습니다."
		).appendTo($(".mw-indicators"));
	}
});