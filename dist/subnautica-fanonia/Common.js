/**** Any JavaScript here will be loaded for all users on every page load. ****/

/*** Dissabling override ***/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/** Custom UserTags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		winnermarchq: { u: 'Winner of March Quality Award', order: 100 },
		bestwikiarm: { u: 'Best arm of the Wiki', order: 101 }
	}
};
/** Users **/
UserTagsJS.modules.custom = {
	'SammytheSafetyReaper13': ['winnermarchq', 'bestwikiarm'], // NOTE: order of list here does NOT matter
	'JokerJetty15': ['winnermarchq']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];