window.UserTagsJS = {
	modules: {},
	tags: {
		contentmoderator: { u:'Archive Reveiwer', order:-1/0 },
		ad: { u:'Enforcer', order: -1/0 },
		v: { u:'Veiwer', order: 101/0 },
		e: { u:'Editor', order: 0/0 },
		c: { u:'commenter', order: 0/0 },
		template: { u:'Template maker', order: -1/0 },
		code: { u:'Code helper', order: -1/0 },
		bureaucrat: { order: 1 },
	},
};


UserTagsJS.modules.custom = {
	'LavaShark.Wiki.Persona': ['ad', 'code', 'contentmoderator'] 
};