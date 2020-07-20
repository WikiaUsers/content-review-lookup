/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    window.massCategorizationDelay = 1000;
    importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:AutoStamp/code.js',
        ]
    });
}