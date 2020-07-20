// Ajax de dev wiki
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Seguimiento","Especial:Registro","Especial:Contribuciones"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automáticamente refresca la página';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxindicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';

/* User tags (de la Dev Wiki) */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureucrat: { u: 'Burócrata' },
		sysop: { u: 'Administrador' },
		rollback: { u: 'Reversor' },
		contentmod: { u: 'Moderador de contenido' },
		discussionmod: { u: 'Moderador de Discusiones' },
		chatmod: { u: 'Moderador del Chat' }
	}
};

/* Para que el tag esté luego de los que están por default */
window.UserTagsJS = {
	modules: {},
	tags: {
		
		bureucrat: { u: 'Guerrero de luz', order: 1 },
		sysop: { u: 'Guerrero de luz', order: 2 },
		rollback: { u: 'Reversor', order: 3 },
		contentmod: { u: 'Moderador de contenido', order: 4 },
		discussionmod: { u: 'Moderador de Discusiones', order: 5 },
		chatmod: { u: 'Moderador del Chat', order: 6 },
		tagone: { u: 'Administrador', order: 7 }
	}
};

/* Aplicamos los tags a los respectivos usuarios */
UserTagsJS.modules.custom = {
/* Bureucrats (Burócratas) */
    'Jake el mago': ['bureucrat'],
/* Sysops (Administradores) */
    'Paper Kirby 2390': ['sysop'],
    'Skyraidstar': ['sysop'],
    'Roserade6159': ['sysop'],
    'LenFan12': ['sysop'],
    'Jolts the Fox': ['sysop'],
    'Darkest Lizard': ['tagone'],
    'BowserRDML': ['tagone'],
    'AthenaEri32': ['tagone'],
    'Kalee the Daisy%27s Flower': ['tagone'],
/* Content Moderators (Moderadores de Contenidos) */
    
/* Discussion Moderators (Moderadores de Discusiónes) */
    
/* Chat Moderators (Moderadores del Chat */
    
/* Otros tags by user request (Other tags a petición de usuario) */
    
};

// Importes de páginas MediaWiki y de la Dev Wiki.
importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:Digital_Clock/code.js',
        'u:dev:DisplayTimer/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:WikiaNotification/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MediaWiki:Medals/code.js'
    ]
});