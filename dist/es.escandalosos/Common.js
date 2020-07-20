/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// Etiquetas de Usuarios
 
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces
				days: 25,
				namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				zeroIsInactive: false
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'mediawiki', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				bot: ['bot-global'],
				sysop: ['bureaucrat'],
			},
		}
	};
 
 
 
window.UserTagsJS = {
	modules: {},
	tags: {
        rollback: { u: 'Reversor', f: 'Reversora' },
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat', link:'Escandalosos Wiki:Administradores#Moderadores_del_Chat' },
        threadmoderador: { u: 'Moderador de Discusiones', f: 'Moderadora de Discusiones', link:'Escandalosos Wiki:Administradores#Moderadores_de_Discusiones'},
        sysop: { u: 'Administrador', f: 'Administradora', link:'Escandalosos Wiki:Administradores#Admins' },
        bureaucrat: { u:'Burócrata', f: 'Burócrata', link:'Escandalosos Wiki:Administradores#Bcratas' },
        founder: { u:'Fundador', link:'Escandalosos Wiki:Administradores#Fundador' }
	}
};
 
UserTagsJS.modules.custom = {
	'Pardo XD': ['founder', 'bureaucrat'],
	'TheSimmer5': ['bureaucrat'],
	'AngelaQuartz': ['bureaucrat'],
	'SKYNX': ['bureaucrat'],
};