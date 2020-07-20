// Any JavaScript here will be loaded for all users on every page load

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 60,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { link:'Norse_World_of_Rick_Riordan_Wiki:Bureaucrat_Rights_Users' },
		sysop: { link:'Norse_World_of_Rick_Riordan_Wiki:Admins' },
		chatmoderator: { link:'Norse World of Rick Riordan Wiki:Chat-Moderator_Rights_Users' },
		rollback: { u:'Rollback', link:'Norse_World_of_Rick_Riordan_Wiki:Rollback_Rights_Users' },
		featured: { u:'Asgardian of the Month', link:'Norse_World_of_Rick_Riordan_Wiki:Asgardian_of_the_Month' },
		bot: { u:'Bot', link:'Help:Bots' }
			}
};
UserTagsJS.modules.custom = {
	'TheSonofNeptune': ['bureaucrat'],
	'Iamhisrighteousness': ['bureaucrat'],
	'Birdqueen102': ['bureaucrat'],
	'SonOfZeus1200': ['sysop'],
	'PoseidonEpicness45': ['featured']
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');