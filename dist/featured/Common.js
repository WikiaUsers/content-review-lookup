/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
/* Test Username Replacement

function ReplaceUsername22() {
   var username22 = mw.config.get(wgUserName);
   if username22 == null) { return; } else { document.getElementById('span.insertUser').innerHTML = username22;
}
addOnloadHook(ReplaceUser22);
*/