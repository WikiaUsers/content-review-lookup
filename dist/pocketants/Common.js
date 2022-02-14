/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		pawikiteam: { u:'PA Discord Wiki Team', order: 10 },
		imagesspec: { u:'Images Specialist', order: 20 },
		templates: { u:'Templates Guru', order: 40},
		updates: { u:'Updates Steward', order: 50 },
		css: { u:'CSS', order: 30 },
		taskman: { u:'Task Minion', order: 60 },
		bureaucrat: { order: 1 },
		founder: { order: -1 }
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
	'JahelZimnarzeka': ['pawikiteam', 'imagesspec'],
	'Onthefarhorizon': ['pawikiteam', 'templates', 'css'],
	'BraxtonGms': ['pawikiteam', 'updates'],
	'Xfroggo': ['pawikiteam', 'taskman'],
	'Genuis1': ['pawikiteam'],
	'TacticalFedorine': ['founder', 'pawikiteam'],
	'XBunbunny': ['pawikiteam'],
	'Sir_mANT': ['pawikiteam'],
	'PLANET23K': ['pawikiteam'],
	'K1401986': ['pawikiteam'],
	'Piixelgamercat': ['pawikiteam'],
	'AnthonyRose1': ['pawikiteam'],
	'TKD_Kedis': ['pawikiteam'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'founder', 'inactive'];

(window.dev = window.dev || {}).profileTags = { noHideTags: true };