importScript('MediaWiki:Morph.js');

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});

window.railWAM = {
   logPage:"Project:WAM Log"
};