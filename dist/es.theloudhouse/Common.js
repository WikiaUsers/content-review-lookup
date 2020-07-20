/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// Etiquetas de Usuarios
 
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
        'content_moderator',
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
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'The Loud House Wikia:Administración#Moderadores_del_Chat' },
        threadmoderator: { u: 'Moderador de Discusiones', f: 'Moderadora de Discusiones', link:'The Loud House Wikia:Administración#Moderadores_de_Discusiones'},
        content_moderator: {u: 'Moderador de Contenido', f: 'Moderadora de Contenido', link: 'The Loud House Wikia:Administración#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'The Loud House Wikia:Administración#Administradores' },
        bureaucrat: { u:'Burócrata', f: 'Burócrata', link:'The Loud House Wikia:Administración#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

    
/* Cambio de título */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

/* Refrescar actividad */
window.ajaxPages = [
    "Especial:WikiActivity",
    "Especial:CambiosRecientes"
    ];
    
window.ajaxRefresh = 20000;
window.AjaxRCRefreshText = 'Refrescar actividad';
window.AjaxRCRefreshHoverText = 'Los cambios más recientes serán vistos sin la necesidad de refrescar la página manualmente';