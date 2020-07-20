/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/*** Auto refrescado de la wiki actividad{{w:c:five-nights-at-treasure-island}} ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
AjaxRCRefreshText = 'Actualización Automática';
AjaxRCRefreshHoverText = 'Actualiza automáticamente la página';
ajaxPages = [
    "Especial:RecentChanges",
    "Especial:WikiActivity",
    "Especial:Watchlist",
    "Especial:Log",
    "Especial:Contribuciones"
];
 
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
        'u:dev:MediaWiki:Medals/code.js',
        "MediaWiki:Common.js/plok.js",
        'u:dev:UserTags/code.js'
    ]
});
 
// Ultima edición - CONFIGURACIÓN.
 
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    lang: 'es',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
 
// Revelar ID de usuarios anónimos.
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 $(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */

/* User tags (de la Dev Wiki) */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Burócrata' },
		sysop: { u: 'Administrador' },
		rollback: { u: 'Reversor' },
		contentmod: { u: 'Moderador de contenido' },
		threadmoderator: { u: 'Moderador de Discusiones' },
		chatmod: { u: 'Moderador de Chat' }
	}
};
 
/* Para que el tag esté luego de los que están por default */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Burócrata', order: 1 },
		sysop: { u: 'Administrador', order: 2 },
		rollback: { u: 'Reversor', order: 3 },
		contentmod: { u: 'Moderador de contenido', order: 4 },
		threadmoderator: { u: 'Moderador de Discusiones', order: 5 },
		chatmod: { u: 'Moderador de Chat', order: 6 },
	}
};
 
/* Aplicamos los tags a los respectivos usuarios */
UserTagsJS.modules.custom = {
/* Bots y controladores (Bot de la wiki) */
    /*'Karma Akabane-bot': ['bot'],
/* Bureucrats (Burócratas) */
    'Thelosted': ['bureaucrat','sysop'],
    'Suzaku 13': ['bureaucrat','sysop'],
/* Sysops (Administradores) */
    'BranDaniMB': ['sysop'],
    'Minase Kirishima-Rei': ['sysop'],
/* Content Moderators (Moderadores de Contenidos) */
    'BRAIAN.FINN': ['threadmoderator'],
/* Chat Moderators (Moderadores del Chat */
    /* */
};