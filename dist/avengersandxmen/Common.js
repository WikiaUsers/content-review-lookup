/* Any JavaScript here will be loaded for all users on every page load.*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
importScriptPage('ShowHide/code.js', 'dev');
var ajaxRefresh = 30000;
importScriptPage('AjaxRC/code.js', 'dev');