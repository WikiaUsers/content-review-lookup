importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

// Add EditCount tab to user namespace
importScriptPage('MediaWiki:Wikia.js/editCount.js', 'admintools');
// END Add EditCount tab to user namespace