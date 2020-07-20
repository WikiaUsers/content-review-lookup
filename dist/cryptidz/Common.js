/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/usertags.js"
    ]
});

var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

window.MassCategorizationGroups = ['sysop', 'content-moderator'];