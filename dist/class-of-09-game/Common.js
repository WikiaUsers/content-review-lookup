/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		originalfounder: { u: 'Original Founder', order: 100 },
		newowner: { u: 'New Founder', order: 101 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Franmaya2': ['originalfounder'],
	'Diamentus': ['newowner']
};

UserTagsJS.modules.mwGroups = ['bureaucrat'];