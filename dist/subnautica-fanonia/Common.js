/**** Any JavaScript here will be loaded for all users on every page load. ****/

/*** Dissabling override ***/
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/** Custom UserTags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		winnermarchq: { u: 'Winner of March Quality Award', order: 110 },
		bestwikiarm: { u: 'Best arm of the Wiki', order: 111 },
		king: { u: 'The King', order: 102},
		headmod: { u: 'Head Moderator', order: 103 },
		headadmin: { u: 'Head Admin', order: 103 }
	}
};
/** Users **/
UserTagsJS.modules.custom = { // NOTE: order of list here does NOT matter //
	'SammytheSafetyReaper13': ['winnermarchq', 'bestwikiarm'], 
	'JokerJetty15': ['winnermarchq', 'headadmin'],
	'BlackLord101': ['king'],
	'Pokemon_was_better': ['headmod'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];