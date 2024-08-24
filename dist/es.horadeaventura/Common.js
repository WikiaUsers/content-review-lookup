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
        'bot',
    ],
	tags: {
        rollback: { u: 'Reversor', f: 'Reversora' },
        threadmoderator: { u: 'Moderador de discusiones', f: 'Moderadora de discusiones', link:'Hora de aventura Wiki:Administración#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de contenido', f: 'Moderadora de contenido', link: 'Hora_de_aventura_Wiki:Administración#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Hora de aventura Wiki:Administración#Administradores' },
        bureaucrat: { u:'Burócrata', f: 'Burócrata', link:'Hora de aventura Wiki:Administración#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

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