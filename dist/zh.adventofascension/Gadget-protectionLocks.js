// From Minecraft Wiki

// Page protection indicators
function getImageThumbnailURL(name, store, size) {
	var encodedName = encodeURIComponent(name.replace(/ /g, "_"));
	return "/media/"
		+ store
		+ "/"
		+ encodedName
}

function mimicIndicator(id, link, imgName, imgStore, title) {
	var encodedLink = encodeURIComponent(link.replace(/ /g, "_")); 
	return $("<div></div>")
		.attr("id", "mw-indicator-" + id)
		.addClass("mw-indicator")
		.append($("<a></a>")
			.attr({
				"href": "/" + encodedLink,
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
	if (mw.config.get("wgPageName") === "Advent_of_Ascension_Wiki") {
		// The indicator lock breaks formatting on the main page due to the level 1 header being hidden
		return;
	} 
	
	var protectionLevel = protectionLevelData[0];
	if (protectionLevel === "autoconfirmed") {
		mimicIndicator(
			"protection-semi",
			"Advent_of_Ascension_Wiki:自动确认用户",
			"Semi-protected page lock.png",
			"9/9b",
			"本页被半保护，只能由自动确认用户编辑。"
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			"Advent_of_Ascension_Wiki:管理员",
			"Fully-protected page lock.png",
			"4/49",
			"本页被全保护，只能由管理员编辑。"
		).appendTo($(".mw-indicators"));
	}
});