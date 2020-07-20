/* Any JavaScript here will be loaded for all users on every page load. */

var oggPlayerButtonOnly = false;

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */


// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };