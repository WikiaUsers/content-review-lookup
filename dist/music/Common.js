/* Any JavaScript here will be loaded for all users on every page load. */

// ==================================================================
// Insert username - From the RuneScape Wiki
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') == null) return;
    $("span.insertusername").text(mw.config.get('wgUserName'));
});