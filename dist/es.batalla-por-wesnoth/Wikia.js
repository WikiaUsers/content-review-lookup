 /*Name user*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
var tooltips_config = {
    waitForImages: true,
    noCSS: true,
}