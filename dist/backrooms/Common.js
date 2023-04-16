window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

// UserTags thingamajigs
window.UserTagsJS = {
	modules: {},
	tags: {
		// usergroup: { associated tag data }
		inactive: { order:-2 },
		bot: { link:'Help:Bots', order:-1 },
		bureaucrat: { order:0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order:1 },
		technician: { u:'Technician', order:2 },
		'content-moderator': { order:3 }, // <- usergroup wrapped in quotes as there is a hyphen in the name
		threadmoderator: { order:4 },
	},
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;
UserTagsJS.modules.userfilter = { 'ScutoidWasTaken': ['sysop'] };
UserTagsJS.modules.custom = {
	'PexyWasTaken': ['technician'],
	'ScutoidWasTaken': ['technician'],
};