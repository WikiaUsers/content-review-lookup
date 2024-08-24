window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Plantillas', order: 102 },
		rollbackers: { u: 'Reversor', order: 103 },
	        Eurovisi�n: { u: 'Editor de Eurovisi�n', order: 104 },
		bureaucrat: { u: 'Bur�crata', order: 1 }
	}
};
UserTagsJS.modules.custom = {
		'Lemon82orange': ['Eurovisi�n']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

importScriptPage('UserTags/code.js', 'dev');