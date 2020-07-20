/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    modules: {},
	tags: {
		admin: { u: 'Administrator', order: 100 },
		rpmod: { u: 'Roleplay Moderator', order: 101 },
		contentmod: { u: 'Content Moderator', order: 102 },
		chatmod: { u: 'Chat Moderator', order: 103 },
		chatmodtrial: { u: 'Chat Mod Trial', order: 105 },
		retired: { u: 'Retired', order: 104 },
		inactive: { u: 'Inactive 90+ Days', order: -1/0 }
	}
};
UserTagsJS.modules.custom = {
	'Jekkers': ['admin'],
	'Mauller': ['admin'],
	'Carthois': ['chatmod'],
	'Flodoomable': ['rpmod'],
	'Dynamite Scroll': ['retired'],
	'Ochiverde': ['retired'],
	'Kuruni': ['retired'],
	'Mad Larry': ['retired'],
	'Holstaurus': ['retired'],
	'Party Vanderbilt': ['retired'],
};
UserTagsJS.modules.metafilter = {
	'sysop': ['sysop'], // Remove "Admin" tag from Sysops
	'bureaucrat': ['bureaucrat'], // Remove "Bureaucrat" tag from Bureaucrats
	'chatmoderator': ['chatmoderator'], // Remove "Chat Moderator" tag from Chat Moderators
	'threadmoderator': ['threadmoderator'], // Remove "Discussion Moderator" tag from Discussion Moderators
	'content-moderator': ['content-moderator'], // Remove "Content Moderator" tag from Content  Moderators
};
UserTagsJS.modules.userfilter = {
	'VACANTCONTENTMOD': ['moderator' , 'rollback' , 'poweruser' , 'patroller']
};
UserTagsJS.modules.inactive = 90;
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});