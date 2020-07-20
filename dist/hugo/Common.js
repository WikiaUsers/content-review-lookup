/* Any JavaScript here will be loaded for all users on every page load. */
window.SpoilerAlertJS = {
    question: '"Even in its sad state of disrepair, it was beautiful."<br>This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: {
            u: 'Magician',
            link: 'http://hugo.wikia.com/wiki/Special:ListUsers/bureaucrat',
            order:-1/0
        },
        sysop: { 
            u: 'Filmmaker',
            link: 'http://hugo.wikia.com/wiki/Special:ListUsers/sysop',
            order: -1/0
        },
		inactive: { u: 'Dreamer' },
        chatmoderator: { u: 'Actor', order: 1/0 },
        contentmoderator: { 
            u: 'Clockkeeper',
            link: 'http://hugo.wikia.com/wiki/Special:ListUsers/content-moderator' 
        },
        rollback: { 
            u: 'Engineer',
            link: 'http://hugo.wikia.com/wiki/Special:ListUsers/rollback' 
        },
        ambassador: { u: 'Adventurer', order: -1/0 },
	}
};
 
// Add custom groups to several users
UserTagsJS.modules.custom = {
 
};
 
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 40, // And have at least 40 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
 
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat', 
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];
 
UserTagsJS.modules.metafilter = {
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
// MessageWallUserTags
window.MessageWallUserTags = {
    tagColor: '#004C4C',
    glow: true,
    glowSize: '15px',
    glowColor: '#00E5E5',
    users: {
        "RueNightshade" : "MAGICIAN • FILMMAKER",
    }
};