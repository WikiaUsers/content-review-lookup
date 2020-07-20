// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
// END of ajax auto-refresh
 
InactiveUsers = { months: 1 };
 
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* Replaces {{USERNAME}} with the name of the user browsing the page. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* Extra user right icons */
importScript('MediaWiki:Common.js/Usericons.js');
 
// Display Comments w/ Local Times
// importScript('MediaWiki:Common.js/localTimeComments.js');
 
// Clock to both skins
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});