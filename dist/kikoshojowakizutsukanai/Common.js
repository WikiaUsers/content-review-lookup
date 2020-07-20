/* Any JavaScript here will be loaded for all users on every page load. */
/* import Scripts */
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');

/* auto refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

// ****** END: JavaScript for [[Special:Upload]] ******
 
/*Reference Popups*/

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});