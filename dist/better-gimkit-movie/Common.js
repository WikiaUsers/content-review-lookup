/* Any JavaScript here will be loaded for all users on every page load. */
dev:UserTags/code.js// Core configuration. We add 2 custom tags and change what the built-in sysop tag says

window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'https://en.wikipedia.org/wiki/Gender' },
		muckraker: 'The Imposter',
		sysop: { u:'Addermin', link:'Project:Administrators' }, // Change "Administrator" to "Addermin"
		'mini-sysop': { u: 'Half Administrator', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Spamdal Janitor', link:'Project:Janitors' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'ItzSmarmyAndStuff': ['muckraker', 'hello'],
	'Someone': ['hello'],
	'You': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Other User': ['hello', 'muckraker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	hello: ['muckraker'], // Remove hello group from people with muckraker group
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};
UserTagsJS.modules.userfilter = {
	'StalkersAlt': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'threadmoderator'] // Remove patroller, rollback and threadmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};