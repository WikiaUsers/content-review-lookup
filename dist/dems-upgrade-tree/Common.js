/* Any JavaScript here will be loaded for all users on every page load. */

// START USERTAG SECTION
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Maker', order: -1/0, title: 'This is the founder of the wiki.'},
		altacc: { u: 'Alternate account of someone.'}
	}
};
UserTagsJS.modules.inactive = 45;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller', 'rollback', 'bot', 'bot-global'];
UserTagsJS.modules.implode = {
	//e
};
UserTagsJS.modules.custom = {
	'HarryplaysOMG4': ['founder'], // Hello! Im the founder!
	'HarryplaysOMG3': ['Alternate Account'],
};
UserTagsJS.modules.userfilter = {
	'HarryplaysOMG4': ['sysop', 'bureaucrat', 'threadmoderator', 'patroller', 'rollback'],
};
// END USERTAG SECTION
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 365;
window.lockOldComments.addNoteAbove = true;