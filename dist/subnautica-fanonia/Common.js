/**** Any JavaScript here will be loaded for all users on every page load. ****/

/*** Dissabling override ***/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/** UserTags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		winnermarchq: { u: 'Winner of March Quality Award', order: 100 }
	}
};
UserTagsJS.modules.custom = {
	'BlackLord101': ['winnermarchq'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];