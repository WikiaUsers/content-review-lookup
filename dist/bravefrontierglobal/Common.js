/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Contributions","Special:Watchlist"]; 

importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:ExtendedNavigation/code.js'
    ]
});