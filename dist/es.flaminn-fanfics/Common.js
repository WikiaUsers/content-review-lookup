//Custom user tags
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces
				days: 25,
				namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				zeroIsInactive: false
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'threadmoderator', 'mediawiki', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				bot: ['bot-global'],
				sysop: ['bureaucrat'],
			},
		}
	};
 
//Custom user tags
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces
				days: 25,
				namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				zeroIsInactive: false
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'threadmoderator', 'mediawiki', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				bot: ['bot-global'],
				sysop: ['bureaucrat'],
			},
		}
	};

window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'Reversor' },
		rollback2: { u: 'Reversora' },
		chatmoderator: { u: 'Moderador del chat' },
		chatmoderator2: { u: 'Moderadora del chat' },
                threadmoderator: { u: 'Moderador de hilos' },
		sysop: { u: 'Administrador' },
		sysop2: { u: 'Administradora' },
		bureaucrat: { u: 'Burócrata' },
		founder: { u: 'Fundador' },
		founder2: { u: 'Fundadora' },
	}
};
 
UserTagsJS.modules.custom = {
	'Luly22': ['founder2'], ['bureaucrat'],
	'Adventurelover 24': ['sysop2'],
	'Candy Girl :3': ['sysop2'],
	'Mangle U.U' : ['sysop2'],
	'SweetFluffy~' : ['sysop2']
};