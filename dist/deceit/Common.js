/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		official: { u: 'Automaton Staff', order: 1 },
		wikidec: { u: 'Deceit Wiki Staff', order: 2 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		founder: { order: 0 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};
UserTagsJS.modules.custom = {
	'=ADK= UpboatPlym': ['founder', 'wikidec'],
	'AustiePlays': ['wikidec'],
	'Probetoss' : ['wikidec']
	// NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];