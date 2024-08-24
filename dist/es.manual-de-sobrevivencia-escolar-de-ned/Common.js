/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// Etiqueta Inactivo
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
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
	    retireduser: { u: 'Retirado del Wiki', f: 'Retirada del Wiki' },
		monthuser: { u: 'Usuario del mes' },
        rollback: { u: 'Reversor', f: 'Reversora' },
        chatmoderator: { u: 'Moderador del chat', f: 'Moderadora del chat' },
        threadmoderador: { u: 'Moderador de hilos', f: 'Moderadora de hilos' },
        sysop: { u: 'Administrador', f: 'Administradora' },
	}
};
 
UserTagsJS.modules.custom = {
	// Manuel de sobrevivencia escolar de ned Wiki
	'Mordecai5496': ['bureaucrat'],
	'WernerGRS': ['bureaucrat'],
 
};