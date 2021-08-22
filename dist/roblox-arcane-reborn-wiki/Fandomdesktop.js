// Core configuration. Link to Administrator.
window.UserTagsJS = {
	modules: {},
	tags: {
		TestRole: ['Special'],
		HeadAdmin: ['Head Admin']
		/*sysop: { link:'Special:ListUsers/sysop' },
		bureaucrat: { link:'Special:ListUsers/bureaucrat'},
		moderator: {link:'Special:ListUsers/moderator'},*/
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Quannax': ['Special'],
	'Rash20000': ['Head Admin']
};
/*
UserTagsJS.modules.custom = {
	'Quannax': ['TestRole']
};
*/

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 7; // Inactive if no edits in 7 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats

//Adds tags to mwGroup
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bannedfromchat',
    'blocked',
    'bot',
    'chatmoderator',
    'checkuser',
    'content-moderator',
    'council',
    'helper',
    'rollback',
    'staff',
    'threadmoderator',
    'vanguard',
    'vstf'
];

window.BackToTopModern = true;