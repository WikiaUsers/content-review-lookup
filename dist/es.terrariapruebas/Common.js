// Refrescar la p�gina de la Actividad Reciente y de los Cambios Recientes.
var AjaxRCRefreshText = 'Act. autom�tica';
var AjaxRCRefreshHoverText = 'Refrescar autom�ticamente los cambios de la p�gina.';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;

// Custom User Tags, including Inactive
window.UserTagsJS = {
	modules: {
		inactive: { // Edits must be to content namespaces
			days: 30,
			namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			zeroIsInactive: false
		},
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'emw',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global',
            'threadmoderator',
            'content-moderator',
            'council',
            'vanguard',
            'vstf',
            'helper',
            'staff',
        ], 
		autoconfirmed: false,
		newuser: false,
		inactive: true,
		metafilter: {
			bot: ['bot-global'],
			sysop: ['bot'],
			rollback: ['content-moderator'],
			threadmoderator: ['content-moderator'],
			
		},
	},
    tags: {
        emw: { u: 'Dise�ador', f: 'Dise�adora' },
        sysop: { u: 'Administrador', f: 'Administradora' },
        threadmoderator: { u: 'Moderador', f: 'Moderadora' },
        'content-moderator': { u: 'Asistente' },
        bot: { u: 'Bot' },
        bureaucrat: { u: 'Bur�crata' },
        rollback: { u: 'Reversor', f: 'Reversora' },
    }
};