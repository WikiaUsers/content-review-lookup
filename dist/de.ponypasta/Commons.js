window.UserTagsJS = {
	modules: {},
	tags: {
		monthwriter: { u: 'Autor des Monats', order: 100 },
		fuehrer: { u: 'Führer', order: 101 },
		RHDW: { u: 'Rechte Hand des Wikis', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Flatinka': ['RHDW'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});