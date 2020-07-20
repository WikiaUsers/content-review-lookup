/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0, 'Talk', 'User talk', 'Forum']
};
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'chatmoderator': ['sysop', ['patroller', 'rollback']]// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
};