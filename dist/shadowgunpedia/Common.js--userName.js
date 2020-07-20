/* Any JavaScript here will be loaded for all users on every page load. */
// 11:08, August 19, 2013 (UTC)
// <source lang="JavaScript">

// For Template:USERNAME
// From RuneScape Wiki
// adapted for SP by User:Cblair91

// Insert username
$(function() {
 if (wgAction === 'view' && wgUserName !== null) {
     $('.insertusername').text(wgUserName);
 }
});
// END Insert username

// </source>