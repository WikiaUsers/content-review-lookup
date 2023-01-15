/* Any JavaScript here will be loaded for all users on every page load. */

/*-----importscriptpage-----*/

importScriptPage('Countdown/code.js', 'dev');

PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('InactiveUsers/code.js', 'dev');
 
/* add contribs to user menu - 2/1/11 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 

/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});