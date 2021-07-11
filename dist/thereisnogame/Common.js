/* Any JavaScript here will be loaded for all users on every page load. */


// User Tags 
window.MessageWallUserTags = {
    tagColor: '#397D3B',
    txtSize: '10px',
    glow: false,
    users: {
        'NJF11': 'Bureaucrat',
    }
};

window.MessageWallUserTags = {
    tagColor: '#9B3ECF',
    txtSize: '10px',
    glow: false,
    users: {
        'Aeywoo': 'Admin',
    }
};

// Custom user tag names
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback'];
window.UserTagsJS = {
	modules: {},
	tags: {
		blocked: { u:'Blocked', order:-1/0 },
		sysop: { u: 'Admin' },
		threadmoderator: { u: 'Discussions Moderator' }
	}
};

// No license warning config
window.NoLicenseWarning = {
    forceLicense: true
};

// Prevents existing tags from being hidden
// https://dev.fandom.com/wiki/ProfileTags
(window.dev = window.dev || {}).profileTags = { noHideTags: true };