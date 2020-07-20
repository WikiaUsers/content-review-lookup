window.UserTagsJS = {
	modules: {},
	tags: {
	    bot: {u:'Bot'},
	    discord: {u:'Discord Server'},
	    juniorsysop  : {u:'Junior Administrator'},
		major: { u: 'Major', order: 101 },
		tester: { u: 'Tester', order: 102 },
		miss: { u: 'Missing', order: 103 },
		bureaucrat: { order: 1 } 
		// NOTE: Tester's for Erikah Mabayo since she's usually dealing with the codes. Meanwhile, there are two majors: Dawn14 and Erikah Mabayo. PeridotGem's formerly one of them but was removed due to fights.
	}
};
UserTagsJS.modules.custom = {
    'Dawn14': ['major'],
    'Anthony045'        : ['discord'],
    'Mallow Bot'        : ['bot'],
    'Geillade12'        : ['discord'],
    'JohnDavid1188'     : ['juniorsysop', 'discord'],
    'Roman6767'         : ['discord'],
    'Laundry Machine'   : ['discord'],
    'JK55556'           : ['discord'],
    'Danger1'           : ['discord'],
};
UserTagsJS.modules.userfilter = {
    'JohnDavid1188': [
        'chatmoderator', 
        'threadmoderator', 
        'content-moderator'],
};
 
UserTagsJS.modules.mwGroups = [
    'founder',
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'chatmoderator',
    'rollback',
    'global-discussions-moderator',
    'vstf',
];
 
/* Autodata updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
massCategorizationDelay = 10; importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');