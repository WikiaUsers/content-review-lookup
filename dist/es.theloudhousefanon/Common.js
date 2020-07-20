/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Lista
1. Etiquetas de usuarios
2. Cambio de título
*/

// Etiquetas de usuarios
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
	newuser: false,
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

    
// Cambio de título
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});