/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */



importScriptPage('ShowHide/code.js', 'dev');

window.MessageWallUserTags = {
    tagColor: 'Snowy Mint',
    glow: true,
    glowSize: '15px',
    glowColor: '#ff89b8',
    users: {
        'Dogkid1': 'Bureaucrat',
    }
};