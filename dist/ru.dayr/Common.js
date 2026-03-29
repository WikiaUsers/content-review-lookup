importArticles({
	type: "script",
	articles: [
		"u:nkch:MediaWiki:ExploreMenuIcons.js",
		"u:nkch:MediaWiki:nkchSlider.js",
		"u:nkch:MediaWiki:Snippet/ExternalLinksInNewWindow.js",
		"u:nkch:MediaWiki:Snippet/SpecificLinksInNewWindow.js"
	]
});

importArticles({
	type: "script",
	articles: [
		"MediaWiki:TabberTiles.js",
		"MediaWiki:ExpansiveInteractionTable.js",
		"MediaWiki:ImgSize.js",
		"MediaWiki:HideRowsTable.js"
	]
});

// Подключение расширенного таймера
$(function() {
    importArticles({
        type: "script",
        articles: [
            "dev:Countdown.js"
        ]
    });
});