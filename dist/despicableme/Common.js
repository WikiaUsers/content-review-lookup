/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    $('.insertusername').html(wgUserName);
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:ListFiles/code.js',
        'u:dev:AjaxBatchDelete/code.js'
    ]
});
window.railWAM = {
    logPage:"Project:WAM Log"
};
window.railWAM = {
     logPage:"Despicable Me Wiki:WAM Logs",
     loadOnPage:"Special:WikiActivity",
     loadOnNamespace:[2,3] ,
};
// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev');