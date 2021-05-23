// Refrescar la página de la Actividad Reciente y de los Cambios Recientes.
var AjaxRCRefreshText = 'Act. automática';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente los cambios de la página.';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');
 
// Custom User Tags, including Inactive
window.UserTagsJS = {
	modules: {
		inactive: { // Edits must be to content namespaces
			days: 30,
			namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			zeroIsInactive: false
		},
		mwGroups: [
		    'founder',
            'bureaucrat',
            'chatmoderator',
            'asistente',
            'rollback',
            'sysop',
            'bannedfromchat',
            'threadmoderator',
            'content-moderator',
            'bot',
            'bot-global',
            'council',
            'global-discussions-moderator',
            'vanguard',
            'vstf',
            'helper',
            'staff',
            'voldev',
            'wiki-manager',
            'content-team-member',
            'content-volunteer',
        ], 
		autoconfirmed: false,
		newuser: false,
		inactive: true,
		metafilter: {
			bot: ['bot-global'],
			sysop: ['bot'],
		},
	},
    tags: {
        founder:         { u: 'Fundador', f: 'Fundadora' },
        bureaucrat:      { u: 'Burócrata', },
        sysop:           { u: 'Administrador', f: 'Administradora',  },
        asistente: { u: 'Asistente', f: 'Asistenta'},
        rollback:        { u: 'Reversor', f: 'Reversora', },
        bot:             { u: 'Bot',  },
    }
};