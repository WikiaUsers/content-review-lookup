/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
// Tags (cr�ditos a: Wiki Los J�venes Titanes en Acci�n!)
 
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
        bureaucrat: { u:'Bur�crata', f: 'Bur�crata', link:'Wiki Drama Total Fannon:Administradores#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

    
/* Cambio de t�tulo a p�ginas */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

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