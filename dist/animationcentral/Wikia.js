/* imports*/
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('MediaWiki:Common.js/displayClock.js', 'admintools');
importScriptPage('User:SUL/massblock.js', 'admintools');
importScriptPage('ListAdmins/code.js', 'dev'); 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */


importScriptPage( 'FastDelete/code.js', 'dev' );
//fast delete buttons
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[w:Help:Spam|spam]]',
  'label': 'SP'
};
fdButtons[fdButtons.length] = {
  'summary': '[[w:Help:Vandalism|vandalism]]',
  'label': 'VA'
};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'HK'
};
 
// PurgeButton
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
 
 
importScriptPage('Sine/code.js', 'dev');