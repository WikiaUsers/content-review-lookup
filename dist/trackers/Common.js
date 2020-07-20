/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('InactiveUsers/code.js', 'dev');
// Inactive username
// Courtesy of Runescape Wiki
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});