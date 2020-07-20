
// Usertags
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		technician: 'Cipher',
		featured: 'Employee of the Month',
		wasfeatured: 'Former Employee of the Month',
}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'South Ferry': ['technician'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.userfilter = {
	'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat'],
rollback: ['bureaucrat'],
chatmoderator: ['bureaucrat']
}

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});