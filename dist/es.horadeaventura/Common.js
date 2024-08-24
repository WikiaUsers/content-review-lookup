/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
 
// Importes
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js',
        'u:dev:MediaWiki:YouTubeModal/code.js',
        'u:dev:AjaxRC/code.js',
    ]
});

/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

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
        threadmoderator: { u: 'Moderador de discusiones', f: 'Moderadora de discusiones', link:'Hora de aventura Wiki:Administraci�n#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de contenido', f: 'Moderadora de contenido', link: 'Hora_de_aventura_Wiki:Administraci�n#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Hora de aventura Wiki:Administraci�n#Administradores' },
        bureaucrat: { u:'Bur�crata', f: 'Bur�crata', link:'Hora de aventura Wiki:Administraci�n#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

/***** Actualizar los cambios recientes de la wikiactividad *****/
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Los cambios m�s recientes ser�n vistos sin la necesidad de refrescar la p�gina manualmente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
;
 
/* Cambio de t�tulo */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});