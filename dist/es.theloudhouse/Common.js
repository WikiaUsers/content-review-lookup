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
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'The Loud House Wikia:Administraci�n#Moderadores_del_Chat' },
        threadmoderator: { u: 'Moderador de Discusiones', f: 'Moderadora de Discusiones', link:'The Loud House Wikia:Administraci�n#Moderadores_de_Discusiones'},
        content_moderator: {u: 'Moderador de Contenido', f: 'Moderadora de Contenido', link: 'The Loud House Wikia:Administraci�n#Moderadores_de_Contenido'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'The Loud House Wikia:Administraci�n#Administradores' },
        bureaucrat: { u:'Bur�crata', f: 'Bur�crata', link:'The Loud House Wikia:Administraci�n#Bur.C3.B3cratas' },
    }
};
 
UserTagsJS.modules.inactive = 30;