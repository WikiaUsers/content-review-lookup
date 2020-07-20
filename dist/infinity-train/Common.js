/* Username */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

//User Tags
window.UserTagsJS = {modules: {}, tags: {}};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['patroller', 'chatmoderator'];