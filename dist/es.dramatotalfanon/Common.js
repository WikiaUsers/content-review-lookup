/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// Tags (créditos a: Wiki Los Jóvenes Titanes en Acción!)
 
window.UserTagsJS = {
	modules: {
        inactive: { // Edits must be to content namespaces
            days: 30,
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
        'threadmoderator',
        'bot',
    ],
	newuser: true,
	metafilter: {
		bot: ['bot-global'],
		sysop: ['bureaucrat']
	},
	tags: {
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'Wiki Drama Total Fannon:Administradores#Moderadores_de_Chat' },
        threadmoderator: { u: 'Moderador de Discusiones', f: 'Moderadora de Discusiones', link:'Wiki Drama Total Fannon:Administradores#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de Contenido', f: 'Moderadora de Contenido', link: 'Wiki Drama Total Fannon:Administradores#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Wiki Drama Total Fannon:Administradores#Administradores' },
        bureaucrat: { u:'Burócrata', f: 'Burócrata', link:'Wiki Drama Total Fannon:Administradores#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

    
/* Cambio de título a páginas */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
// Importes
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js',
        'u:dev:MediaWiki:YouTubeModal/code.js',
        'u:dev:AjaxRC/code.js',
    ]
});
 
/***** Actualizar los cambios recientes de la wikiactividad *****/
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Los cambios más recientes serán vistos sin la necesidad de refrescar la página manualmente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
;
 
/* Cambio de título */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});