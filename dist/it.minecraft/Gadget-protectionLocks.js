// Page protection indicators
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

function getImageThumbnailURL(name, store, size) {
	var encodedName = mw.util.wikiUrlencode(name);
	return "https://minecraft.gamepedia.com/media/minecraft.gamepedia.com/thumb/"
		+ store
		+ "/"
		+ encodedName
		+ "/"
		+ size
		+ "px-"
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
			"Minecraft Wiki:Utenti autoconvalidati",
			"Semi-protected page lock.png",
			"9/9b",
			"Questa pagina è semi-protetta in modo che solo gli utenti registrati possono modificarla."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "directoreditprotected") {
		mimicIndicator(
			"protection-director",
			"Minecraft Wiki:Direttori",
			"Director-protected page lock.png",
			"8/85",
			"Questa pagina è protetta in modo che solo i direttori possono modificarla."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			"Minecraft Wiki:Amministratori",
			"Fully-protected page lock.png",
			"4/49",
			"Questa pagina è completamente protetta in modo che solo gli amministratori possono modificarla."
		).appendTo($(".mw-indicators"));
	}
});