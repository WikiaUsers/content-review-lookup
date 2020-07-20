/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

window.UserTagsJS = {
	modules: {},
	tags: {
		founder: {u: 'Fundador'},
		contentmoderator: { u: 'Moderador' },
		edit: 'Editor'
	}
};

UserTagsJS.modules.custom = {
	'Yotchy': ['edit']
};

UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
	bureaucrat: ['bureaucrat']// Remove administrator group from bureaucrats
};