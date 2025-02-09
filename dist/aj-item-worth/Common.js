/* Any JavaScript here will be loaded for all users on every page load. */
window .AddRailModule = ['Template:RailModule'];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BlockSummary.js',
    ]
});