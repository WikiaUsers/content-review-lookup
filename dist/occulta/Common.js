/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})

importScriptPage('ShowHide/code.js', 'dev')

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
 
importScriptPage('Countdown/code.js', 'dev');
 
importScriptPage('DisplayClock/code.js', 'dev');