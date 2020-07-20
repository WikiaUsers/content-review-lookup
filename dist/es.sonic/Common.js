/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//Custom User Tags:
window.UserTagsJS = {
	modules: {
		inactive: { // Edits must be to content namespaces
			days: 30,
			namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			zeroIsInactive: false
		},
		mwGroups: [
		    'bureaucrat', 'sysop', 'rollback', 'bannedfromchat'
        ],
		autoconfirmed: false,
		newuser: false,
		metafilter: {
			bot: ['bot-global'],
			rollback: ['content-moderator'],
			chatmoderator: ['content-moderator', 'threadmoderator'],
			'content-moderator': ['bot'],
		},
		implode: {
		    'asistente' : ['content-moderator', 'threadmoderator'],
		},
	},
    tags: {
        threadmoderator: { u: 'Moderador de discusiones', f: 'Moderadora de discusiones'  },
        emw: { u: 'diseñador', f: 'diseñadora' },
        bot: { u: 'Bot' },
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat' },
        rollback: { u: 'Reversor', f: 'Reversora' },
        sysop: { u: 'Administrador', f: 'Administradora' },
        'content-moderator': { u: 'Moderador de contenido' , f: 'Moderadora de contenido' },
        'asistente': { u: 'Asistente' },
        bureaucrat: { u: 'Burócrata', link:'Sonic Wiki:Administración' },
    }
};


// AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];