// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
if(mw.config.get('wgNamespaceNumber') === 0) {
    importArticles({
        type: "script",
        articles: [
            "u:fr.naruto:MediaWiki:Common.js/CategoriesSort.js"
        ]
    });
}