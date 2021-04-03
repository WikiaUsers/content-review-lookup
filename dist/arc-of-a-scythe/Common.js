/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		discordmod: { u: 'Discord Mod' },
		supremeblade: { u: 'Supreme Blade' },
		grandslayer: { u: 'Grandslayer' },
		highblade: { u: 'High Blade' }
	}
};

UserTagsJS.modules.custom = {
	'Scythe Creeggan': ['discordmod'],
	'Tamirobson': ['supremeblade'],
	'Otakusmiles': ['discordmod'] // NOTE: order of list here does NOT matter
};

UserTagsJS.modules.inactive = 30; // 30 days