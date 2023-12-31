/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(window.disableUsernameReplace || !mw.config.get('wgUserName')) return;
    $("span.insertusername").text(mw.config.get('wgUserName'));
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */