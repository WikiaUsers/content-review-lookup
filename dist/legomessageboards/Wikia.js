/* User Tags Configuration - http://dev.wikia.com/wiki/UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order:-1/0 },
		bannedfromchat: 'Banned from Chat',
		rbpt: 'Rollback Patroller',
        retiredsysop: 'Retired Administrator',
        retiredburo: 'Retired Bureaucrat',
        inactivesysop: 'Inactive Administrator',
        inactiveburo: 'Inactive Bureaucrat',
        cb: 'Chat Bot'
	}
};
UserTagsJS.modules.inactive = 14;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'sysop', 'bannedfromchat', 'bot', 'checkuser', 'rollback', 'threadmoderator', 'content-moderator'];
UserTagsJS.modules.custom = {
    'BusyCityGuy': ['retiredburo'],
    'Drew1200': ['retiredburo'],
    'Danielboone6702': ['retiredburo'],
    'LBK10': ['retiredburo'],
    'Seaside98': ['retiredburo'],
    'Agent Spy': ['retiredsysop'],
    'Assassin Swipe': ['retiredsysop'],
    'Avalair': ['retiredsysop'],
    'Goggles99': ['retiredsysop'],
    'Ireithien': ['retiredsysop'],
    'Madkatmaximus': ['retiredsysop'],
    'Nxtstep101': ['retiredsysop'],
    'ZXSpidermanXZ': ['retiredsysop']
 
};
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot', 'retiredburo', 'retiredsysop'],
	bureaucrat: ['founder', 'retiredburo'],
	chatmoderator: ['sysop', 'bureaucrat', 'bot'],
	rollback: ['sysop', 'bureaucrat', 'bot'],
	patroller: ['sysop', 'bureaucrat', 'bot'],
	inactiveburo: ['retiredburo', 'founder', 'bot'],
	inactivesysop: ['retiredburo', 'inactiveburo', 'retiredsysop', 'bot'],
	contentmoderator: ['bot', 'sysop', 'bureaucrat'],
	inactive: ['bot'],
	neweditor: ['bot']
};
UserTagsJS.modules.implode = {
	'rbpt': ['patroller', 'rollback'],
	'inactivesysop': ['sysop', 'inactive'],
	'inactiveburo': ['bureaucrat', 'inactive'],
	'cb': ['bot', 'chatmoderator']
};



/* Import scripts */
importArticles({
	type: 'script',
	articles: [
		'MediaWiki:YoutubePlayer/code.js', //Youtube Player
		'u:dev:DupImageList/code.js', //List of Duplicate Images
		'u:dev:AjaxPatrol/code.js', //Quick Patrolling
		'u:dev:UserTags/code.js', //Custom Userpage Tags
		'u:dev:WallGreetingButton/code.js', //Add Wall Greeting Edit Button
	]
});



/* Open External Links in New Tabs - by ShermanTheMythran */
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');



/* Couples with Template:User to move SourceBox to the bottom of an article - by Seaside98 */
$('.moveToBottom').appendTo('#mw-content-text').show();