/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	threadmoderator: ['sysop', 'bureaucrat']
};

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 870
};