window.UserTagsJS = {
	modules: {},
	tags: {
		founder: {order: 0 },
		'head-bureaucrat': {u: 'Chief Bureaucrat', order: 1 },
		bureaucrat: { order: 2 },
		'head-sysop': {u: 'Head Admin', order: 3 },
		sysop: {order: 4 },
		'head-forumadm': {u: 'Head Forum Admin', order: 5 },
		'forum-adm': {u: 'Forum Admin', order: 6 },
		'head-chatmod': {u: 'Head Chat Moderator', order: 7 },
		chatmoderator: {order: 8 },
		'head-techsysop': { u: 'Head Technical Admin', order: 9 },
		'tech-sysop': { u: 'Technical Admin', order: 10 },
		'tech-expert': { u: 'Technical Expert', order: 11 },
		senior: {u: 'Senior Editor', order: 12},
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Ethrundr' : ['head-bureaucrat', 'head-techsysop', 'head-sysop', 'chatmoderator', 'head-forumadm', 'senior']
};
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});