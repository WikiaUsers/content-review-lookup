/* Any JavaScript here will be loaded for all users on every page load. */
 
/*** Config script options ***/
// Ajax auto-refresh
window.ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Contributions'];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxRefresh = 30000;
 
/*** Import scripts ***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:ShowHide/code.js'
    ]
});