/* Any JavaScript here will be loaded for all users on every page load. */

/* importScriptPages-start */

PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('ReferencePopups/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('OasisToolbarButtons/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

/* importScriptPages-end */



/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */