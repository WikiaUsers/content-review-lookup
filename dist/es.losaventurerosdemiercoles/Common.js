/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

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
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'Wiki Los Aventureros de Mi�rcoles:Administraci�n#Moderadores_del_Chat' },
        threadmoderator: { u: 'Moderador de discusiones', f: 'Moderadora de discusiones', link:'Wiki Los Aventureros de Mi�rcoles:Administraci�n#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de contenido', f: 'Moderadora de contenido', link: 'Wiki Los Aventureros de Mi�rcoles:Administraci�n#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Wiki Los Aventureros de Mi�rcoles:Administraci�n#Administradores' },
        bureaucrat: { u:'Bur�crata', f: 'Bur�crata', link:'Wiki Los Aventureros de Mi�rcoles:Administraci�n#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;

    
// Cambio de t�tulo
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});