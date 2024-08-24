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
        'contentmoderator',
        'chatmoderator',
        'rollback',
        'sysop',
        'bot',
    ],
	tags: {
        rollback: { u: 'Reversor', f: 'Reversora' },
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'Wiki Los Aventureros de Miércoles:Administración#Moderadores_del_Chat' },
        threadmoderator: { u: 'Moderador de discusiones', f: 'Moderadora de discusiones', link:'Wiki Los Aventureros de Miércoles:Administración#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de contenido', f: 'Moderadora de contenido', link: 'Wiki Los Aventureros de Miércoles:Administración#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Wiki Los Aventureros de Miércoles:Administración#Administradores' },
        bureaucrat: { u:'Burócrata', f: 'Burócrata', link:'Wiki Los Aventureros de Miércoles:Administración#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

    
// Cambio de título
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});