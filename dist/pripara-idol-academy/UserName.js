// 03:36, July 25, 2015 (UTC)
// <source lang="JavaScript">

// For [[:Template:USERNAME]]
// From RuneScape Wiki
// adapted for SP by [[User:Cblair91]]

// Insert username
/* Copied from Admin Tools Wiki */
$(function() {
 if (wgAction === 'view' && wgUserName !== null) {
     $('.insertusername').text(wgUserName);
 }
});

// END Insert username

// </source>