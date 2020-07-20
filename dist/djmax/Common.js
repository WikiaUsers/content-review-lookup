window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Special:ListUsers/bureaucrat', order:101 },
		sysop: { link:'Special:ListUsers/sysop', order:102 },
		chatmoderator: { link:'Special:ListUsers/chatmoderator', order:104 },
		adopter: { u: 'Wiki Adopter', order:99 },
		rollback: { link:'Special:ListUsers/rollback', order:103 },
		dj: { u: 'DJ of the Month', order:100 }
	}
};
UserTagsJS.modules.custom = {
	'MissingNo.': ['adopter']
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});