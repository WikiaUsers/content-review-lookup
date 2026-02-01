/* Any JavaScript here will be loaded for all users on every page load. */
/* This script finds every "insertusername" class 
   and replaces the text with the viewer's real name.
*/
$(function() {
    var userName = mw.config.get('wgUserName');
    if (userName) {
        $('.insertusername').text(userName);
    }
});