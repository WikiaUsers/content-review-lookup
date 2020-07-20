/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('AjaxRC/code.js', 'dev');
 
// AjaxRC
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Specia:Log","Specia:NewFiles","Special:NewPages"];
AjaxRCRefreshText = 'Auto-refreshing';
AjaxRCRefreshHoverText = 'Refresh this page automatically';

/* Pop-up references */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});