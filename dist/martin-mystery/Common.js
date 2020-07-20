/* Any JavaScript here will be loaded for all users on every page load. */
/* RevealAnonIp JavaScript code*/ 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
/* Code END */

/* AjaxRC JavaScript */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Code END */