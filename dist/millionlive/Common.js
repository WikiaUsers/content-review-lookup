PurgeButtonText = 'Reload'; //Refresh Button
importScriptPage('PurgeButton/code.js', 'dev');//Refresh Button
importArticles({
    type: 'script',
    articles: [
        "w:c:dev:Countdown/code.js",
        'u:dev:ExtendedNavigation/code.js',
        "u:pad.wikia.com:MediaWiki:FilterTable.js",
    ]
});