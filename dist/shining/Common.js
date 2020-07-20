/* Any JavaScript here will be loaded for all users on every page load. */

/*############################################################################*/
/*########################## Import Script Pages #############################*/
/*############################################################################*/

importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
/*############################################################################*/
/*######################### End Import Script Pages ##########################*/
/*############################################################################*/

/*############################################################################*/
/*################################ Contribs ##################################*/
/*############################################################################*/
 
/* add contribs to user menu - 2/1/11 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
/*############################################################################*/
/*############################## End Contribs ################################*/
/*############################################################################*/