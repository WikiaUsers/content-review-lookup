/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage( 'PurgeButton/code.js', 'dev' );
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
ajaxPages = ["Battlefront_Wiki_Judicial_System"];
var ajaxRefresh = 1000;
importScriptPage('DisplayClock/code.js', 'dev');
/* script for countdown timer */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});