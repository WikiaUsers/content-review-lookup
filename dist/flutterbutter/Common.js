/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'Code-Editor', order: 100 },
		csshelper: { u: 'Pony Lover', order: 101 },
		templatehelper: { u: 'Designer', order: 102 },
                wikitester: { u: 'Tester', order: 103 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'GuitarRock': ['csshelper', 'templatehelper', 'wikitester', 'jshelper'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});