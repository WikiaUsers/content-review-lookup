/* Any JavaScript here will be loaded for all users on every page load. */




/*User Tages*/
window.UserTagsJS = {
	modules: {},
	tags: {
	    jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		newfounder: { u: 'New-Founder', order: 1},
		bureaucrat: { u: 'Fengo', order: 2},
		sysop: {u: 'Chieftain', order: 3}
	},
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];

UserTagsJS.modules.metafilter = {
	sysop: ['founder', 'bureaucrat'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'],
	rollback: ['contentmoderator', 'sysop'],
	threadmoderator: ['sysop'],
	contentmoderator: ['sysop']
};
 
UserTagsJS.modules.custom = {
	'XUbiquitousx': ['csshelper', 'templatehelper', 'jshelper'],
	'Skaarsgurd': ['newfounder', 'bureaucrat']
};




/*Auto refresh*/
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';