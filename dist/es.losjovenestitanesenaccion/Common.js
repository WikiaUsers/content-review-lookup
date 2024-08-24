/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
// Etiqueta Inactivo
InactiveUsers = { text: 'Entrenando' };
importScriptPage('InactiveUsers/code.js', 'dev');

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
        'bannedfromchat',
        'bot',
        'bot-global'
    ],
	newuser: true,
	metafilter: {
		bot: ['bot-global'],
		sysop: ['bureaucrat']
	}
	};
	
window.UserTagsJS = {
	modules: {},
	tags: {
	    retireduser: { u: 'Retirado del Wiki', f: 'Retirada del Wiki' },
        rollback: { u: 'Reversor', f: 'Reversora' },
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'Wiki Los J�venes Titanes en Acci�n:Administraci�n#Moderadores_del_Chat' },
        threadmoderator: { u: 'Moderador de Discusiones', f: 'Moderadora de Discusiones', link:'Wiki Los J�venes Titanes en Acci�n:Administraci�n#Moderadores_de_Discusiones'},
        contentmoderator: {u: 'Moderador de Contenido', f: 'Moderadora de Contenido', link: 'Wiki Los J�venes Titanes en Acci�n:Administraci�n#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Wiki Los J�venes Titanes en Acci�n:Administraci�n#Administradores' },
        bureaucrat: { u:'Bur�crata', f: 'Bur�crata', link:'Wiki Los J�venes Titanes en Acci�n:Administraci�n#Bur.C3.B3cratas' },
    }
};

UserTagsJS.modules.custom = {
	// Los J�venes Titanes en Acci�n Wiki
	'TheParker5496': ['retireduser'],
	'LightWatcher': ['retireduser'],
	'Perlzafidot 840': ['bureaucrat'],
	'LucidumStar': ['bureaucrat'],
	'Pablito.vega.50': ['retireduser'],
	'WernerGRS': ['retireduser'],
	'Dark Akuma': ['retireduser'],
	'DavidAguilarLopez05 2': ['retireduser']
};
    
/* Cambio de t�tulo */
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});