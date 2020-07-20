/* Any JavaScript here will be loaded for all users on every page load. */
 
 
// Insert username - from runsescape.wikia.com
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});