/* Any JavaScript here will be loaded for all users on every page load. */


// @import url('https://fonts.googleapis.com/css?family=Berkshire+Swash');

// Replaces {{USERNAME}} with the name of the user browsing the page
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
 
// End of the {{USERNAME}} replacement