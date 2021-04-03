/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JS', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		founder: { u: 'Templates', order: 102 },
        }
};
 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'sysop',
    'bot'
];
UserTagsJS.modules.metafilter = {
	sysop: ['founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'],
	rollback: ['contentmoderator', 'sysop'],
	threadmoderator: ['sysop'],
	contentmoderator: ['sysop']
};
 
UserTagsJS.modules.custom = {
	'HatQueen1107': ['csshelper']
};
 
// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';