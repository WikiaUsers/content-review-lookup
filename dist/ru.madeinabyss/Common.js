/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

importArticles({
    type: "сss",
    article: "MediaWiki:Fonts.css"
});


// Отображатели защиты страницы

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
			"Project:Автоподтверждённые участники",
			"Semiprotected.svg",
			"7/79",
			"Эта страница защищена от правок неавторизованными или незарегистрированными участниками."
		).appendTo($(".mw-indicators"));
	} else if (protectionLevel === "sysop") {
		mimicIndicator(
			"protection-full",
			"Project:Администраторы",
			"Fullyprotected.svg",
			"b/ba",
			"Эта страница полностью защищена от правок обычными участниками."
		).appendTo($(".mw-indicators"));
	}
	
	if (moveProtectionLevelData[0] === "sysop") {
		mimicIndicator(
			"protection-move",
			"Project:Защита страниц",
			"Move protected.svg",
			"3/39",
			"Эта страница полностью защищена от переименования обычными участниками."
		).appendTo($(".mw-indicators"));
	}
});