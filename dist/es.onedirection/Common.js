/* Tags Personalizados */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u:'Admin', f:'Administradora', m:'Administrador', order:1 },
		"content-moderator": { u:'Vigilante', f:'Moderadora de Contenido', m:'Moderador de Contenido' },
		blocked: { u:'Inexistente', f:'Bloqueada', m:'Bloqueado'},
		inactive: { u:'Inactividad', f:'Inactiva', m:'Inactivo' },
		autoconfirmed: { u:'Primeros Pasos', f:'Nueva Usuaria', m:'Nuevo Usuario' },
		"1D": { u:'Nator', f:'Directioner', m:'Directioner' },
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.inactive = 184;
UserTagsJS.modules.custom = {
	'PatPatBoo': ['1D'],
};

/* Regresar Arriba */
importArticles
({  type: 'script',
    articles: ['u:dev:MediaWiki:BackToTopButton/code.js',]});
    window.BackToTopModern = true;