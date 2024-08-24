window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Plantillas', order: 102 },
		rollbackers: { u: 'Reversor', order: 103 },
	        Eurovisión: { u: 'Editor de Eurovisión', order: 104 },
		bureaucrat: { u: 'Burócrata', order: 1 }
	}
};
UserTagsJS.modules.custom = {
		'Lemon82orange': ['Eurovisión']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

importScriptPage('UserTags/code.js', 'dev');