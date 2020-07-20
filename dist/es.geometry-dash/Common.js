/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Importes
importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js',
        'u:dev:MediaWiki:YouTubeModal/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:AddRailModule/code.js',
        'u:dev:dev:UserTags/code.js'
    ]
});

/* User tags (de la Dev Wiki) */
window.UserTagsJS = {
	modules: {},
	tags: {
		facebook: { u: 'FB Mod' },
		bot: { u: 'Bot' },
		bureucrat: { u: 'Burócrata' },
		sysop: { u: 'Administrador' },
		rollback: { u: 'Reversor' },
		contentmod: { u: 'Moderador de contenido' },
		threadmoderator: { u: 'Moderador de Discusiones' },
		chatmoderator: { u: 'Moderador del Chat' }
	}
};
 
/* Para que el tag esté luego de los que están por default */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureucrat: { u: 'Burócrata', order: 1 },
		sysop: { u: 'Administrador', order: 2 },
		rollback: { u: 'Reversor', order: 3 },
		contentmod: { u: 'Moderador de contenido', order: 4 },
		threadmoderator: { u: 'Moderador de Discusiones', order: 5 },
		chatmoderator: { u: 'Moderador del Chat', order: 6 },
		bot: { u: 'Bot' , order: 98 },
		facebook: { u: 'FB Admin' , order: 99 }
	}
};
 
/* Aplicamos los tags a los respectivos usuarios */
UserTagsJS.modules.custom = {
/* Bots y controladores (Bot de la wiki) */
    'Usuario de Wikia': ['bot'],
/* Bureucrats (Burócratas) */
    'Sebasonic17': ['bureucrat','sysop'],
    'Tobias Alcaraz': ['bureucrat','sysop', 'facebook'],
    'Zitromateo': ['bureucrat','sysop', 'facebook'],
/* Sysops (Administradores) */
    'GetRekt420Noscoped': ['sysop'],
/* Content Moderators (Moderadores de Contenidos) */
    'MaroWiki': ['contentmod', 'chatmoderator', 'threadmoderator'],
    'Misterumgamer': ['contentmod'],
/* Chat Moderators (Moderadores del Chat */
    'G3A01': ['chatmoderator'],
    'GeometryCarl': ['chatmoderator', 'rollback'],
    'THEALEBOY X': ['chatmoderator', 'rollback'],
};

 
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

//Configuración del reloj
// Pone el tiempo en las 24 horas seguido por día y mes (nombre completo en
// inglés) y el año con el "(UTC)" al final
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{Enero;Febrero;Marzo;Abril;Mayo;Junio;Julio;Agosto;Septiembre;Octubre;Noviembre;Diciembre}m %Y (UTC)';

// 4. AutoRefreshing RecentChanges and WikiActivity
AjaxRCRefreshText = 'Actualización automática.';
AjaxRCRefreshHoverText = 'Automaticamente actualiza la página.';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity","Especial:Watchlist","Especial:Log","Especial:Contributions"];