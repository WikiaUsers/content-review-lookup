var ajaxRefresh = 60;
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');


/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 30,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
tags: {
		fluttershy: { u: 'fluttershy', order: 2 },
		handy: { u: 'handy', order: 2 },
		flaky: { u: 'flaky', order: 3 },
		werehog: { u: 'werehog', order: 4 },
		cynder: { u: 'cynder', order: 5 },
		sans: { u: 'sans', order: 2 },
			}
};
 
UserTagsJS.modules.custom = {
	"GamingDubstepGriffin101": ['sysop', 'bureaucrat', 'fluttershy', 'flaky', 'werehog', 'cynder'],
	'Captain Sans Nightmare': ['sysop', 'bureaucrat', 'sans'],
	'BlueTide': ['handy'],
};
 
UserTagsJS.modules.userfilter = {
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});