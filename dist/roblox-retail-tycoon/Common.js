/* Any JavaScript here will be loaded for all users on every page load. */
/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		cofounder: { u: 'CoFounder', order: 100 },
		recruiter: { u: 'Recruiter', order: 101 },
		helper: { u: 'Helper', order: 102 },
		sysop: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Toxicbreath': ['cofounder', 'recruiter']
};
UserTagsJS.modules.mwGroups = ['sysop'];