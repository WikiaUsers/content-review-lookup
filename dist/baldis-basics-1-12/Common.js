/* Any JavaScript here will be loaded for all users on every page load. */

// Core configuration. We add 2 custom tags and change what the built-in sysop tag says
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: 'Founder of the Wiki',
		retiredmember: 'Retired Member',
		bureaucrat: { link:'Special:ListUsers/bureaucrat' },
		sysop: { link:'Special:ListUsers/sysop' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'TheObliviousQuailOfficial': ['founder'],
	'Mr. TheTrueOne': ['retiredmember']
};

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

UserTagsJS.modules.inactive = {
	days: 5,
	namespaces: [0], // Edits must be to articles, others don't count whatsoever
	zeroIsInactive: true // 0 article edits => inactive
};

UserTagsJS.modules.nonuser = true; // Switches on the tag for users with 0 edits