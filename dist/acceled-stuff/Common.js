/* Any JavaScript here will be loaded for all users on every page load. */
UserTagsJS.modules.inactive = 50; // 50 days
UserTagsJS.modules.mwGroups = ['Commander', 'sysop', 'Redo', 'LOST CHAT CONNECTION!'];
UserTagsJS.modules.custom = {
	'AcceledAcceled': ['Godess']
	'UserName 2': ['featured'], // Add featured
	'UserName 3': ['featured', 'templates'], // Add featured + templates guru
	'UserName 4': ['inactive'] // Always inactive
};

// 11:08, August 19, 2013 (UTC)
// <source lang="JavaScript">

// For Template:USERNAME
// From RuneScape Wiki
// adapted for ATW by User:Cblair91

// Insert username
$(function() {
 if (wgAction === 'view' && wgUserName !== null) {
     $('.insertusername').text(wgUserName);
 }
});
// END Insert username

// </source>