/* Any JavaScript here will be loaded for all users on every page load. */

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

 
/* Show/Hide button */
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { autoCollapse: Infinity };