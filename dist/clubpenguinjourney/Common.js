/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		'wikifounder': { u:'Wiki Founder', order: 0 },
		bureaucrat: { order: 1 },
		sysop: { order: 2 },
		contentmoderator: { order: 3 },
		threadmoderator: { order: 4 },
		rollback: { order: 5 },
		'trialmoderator': { u:'Trial Moderator', order: 6 },
		'topmonth': { u:'Top Monthly Editor', order: 7 },
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
	'Hermbeurg': ['wikifounder'],
	'CPJ.Annie': ['topmonth'],
	'Tenny407': ['trialmoderator'],
};
UserTagsJS.modules.mwGroups = ['content-moderator', 'threadmoderator'];
UserTagsJS.modules.inactive = 90; // 90 days

(window.dev = window.dev || {}).profileTags = { noHideTags: true };