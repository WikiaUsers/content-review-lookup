/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/*User Tags*/
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces
				days: 30,
				namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				zeroIsInactive: false
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'threadmoderator'],
			autoconfirmed: false,
			newuser: false,
			metafilter: {
				bot: ['bot-global'],
			},
		},
	    tags: {
	    	bot: { u: 'Bot' },
	    	chatmoderator: { u:'Moderador del chat', f: 'Moderadora del chat' },
	    	rollback: { u: 'Reversor', f: 'Reversora' },
	    	sysop: { u: 'Administrador', f: 'Administradora' },
	    }
    };