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
            'emw',
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
            'content-volunteer',
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
        founder:         { u: 'Fundador', f: 'Fundadora' },
        bureaucrat:      { u: 'Burócrata', link: 'project:Administración' },
        sysop:           { u: 'Administrador', f: 'Administradora', link: 'project:Administración' },
        'content-moderator': { u: 'Asistente', f: 'Asistenta', link: 'project:Administración' },
        chatmoderator  : { u: 'Moderador del chat', f: 'Moderadora del chat', link: 'project:Administración' },
        threadmoderator: { u: 'Moderador de discusiones', f: 'Moderadora de discusiones', link: 'project:Administración' },
        emw:             { u: 'Editor de códigos', f: 'Editora de códigos', link: 'project:Administración' },
        rollback:        { u: 'Reversor', f: 'Reversora', link: 'project:Administración' },
        bot:             { u: 'Bot', link: 'project:Administración' },
    }
};

// 

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DupImageList/code.js',
        'u:dev:RevealAnonIP/code.js',
    ]
});