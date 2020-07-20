/* Any JavaScript here will be loaded for all users on every page load. */

/* Added SiteNotice Functionality */
importScript('MediaWiki:Common.js/sitenotice.js');
 
/* Add MyContributions to AccountNavigation */
importScript('MediaWiki:Common.js/accountNavigation.js');

importScriptPage('ShowHide/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatReload/code.js'
        'u:dev:SearchSuggest/code.js'
    ]
});