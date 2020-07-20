/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		mod: { u: 'Novaly Moderator', order: 101 },
		cm: { u: 'Novaly Community Manager', order: 100 },
		igmod: { u: 'Ingame Moderator', order: 99 },
		bureaucrat: { order: 1 },
	}
};
UserTagsJS.modules.custom = {
	'Btkelley': ['mod','igmod'],
	'K1ngmark45': ['cm','igmod']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];