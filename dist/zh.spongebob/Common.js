/* 此處的JavaScript將載入於所有用戶每一個頁面。 */
/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
importScriptPage('ShowHide/code.js', 'dev');
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries

/*自動刷新*/
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1468579810/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
// Importing script from Dev Wiki 
importArticles({
    type: 'script',
    articles: [
'u:dev:UserTags/code.js',
'u:dev:WallGreetingButton/code.js',
    ]
})