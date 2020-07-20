/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Etiquetas de Usuarios
window.UserTagsJS = {
	modules: {
        inactive: { // Edits must be to content namespaces
            days: 60,
            namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            zeroIsInactive: false
        },
	},
	mwGroups: [
        'bureaucrat',
        'contentmoderator',
        'chatmoderator',
        'rollback',
        'sysop',
        'bannedfromchat',
        'bot',
        'bot-global'
    ],
	newuser: true,
	metafilter: {
		bot: ['bot-global'],
		sysop: ['bureaucrat']
	},
	tags: {
        rollback: { u: 'Reversor', f: 'Reversora' },
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'The Loud House Fanon Wiki:Administración#Moderadores_del_Chat' },
        threadmoderator: { u: 'Moderador de Discusiones', f: 'Moderadora de Discusiones', link:'The Loud House Fanon Wiki:Administración#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de Contenido', f: 'Moderadora de Contenido', link: 'The Loud House Fanon Wiki:Administración#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'The Loud House Fanon Wiki:Administración#Administradores' },
        bureaucrat: { u:'Burócrata', f: 'Burócrata', link:'The Loud House Fanon Wiki:Administración#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

    
/* Cambio de título */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

window.ajaxPages = [
    "Especial:WikiActivity",
    "Especial:CambiosRecientes"
];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/ltesting/images/0/0b/Spinner.svg/revision/latest?cb=20170924143857';
window.ajaxRefresh = 20000;
window.AjaxRCRefreshText = 'Refrescar actividad';
window.AjaxRCRefreshHoverText = 'Los cambios más recientes serán vistos sin la necesidad de refrescar la página manualmente';

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