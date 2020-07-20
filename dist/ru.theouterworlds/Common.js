/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 }
	}
};

UserTagsJS.modules.custom = {
	'TheOuterWorlds': ['csshelper', 'templatehelper', 'jshelper'] // NOTE: order of list here does NOT matter
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];