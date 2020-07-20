/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
    
});

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    window.massCategorizationDelay = 1000;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:MassCategorization/code.js'
    });
};