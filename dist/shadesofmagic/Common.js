/* Any JavaScript here will be loaded for all users on every page load. */

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: {
            u: 'Monarch',
            link: 'http://shadesofmagic.wikia.com/wiki/Special:ListUsers/bureaucrat',
            order:-1/0
        },
        sysop: { 
            u: 'Regent',
            link: 'http://shadesofmagic.wikia.com/wiki/Special:ListUsers/sysop',
            order: -1/0
        },
		inactive: { u: 'Went to Black London' },
        chatmoderator: { u: 'Guard', order: 1/0 },
        contentmoderator: { 
            u: 'Priest',
            link: 'http://shadesofmagic.wikia.com/wiki/Special:ListUsers/content-moderator' 
        },
        rollback: { 
            u: 'Magician',
            link: 'http://shadesofmagic.wikia.com/wiki/Special:ListUsers/rollback' 
        },
        ambassador: { u: 'Antari', order: -1/0 },
        eventhost: { u: 'Entertainer', order: -1/0 },
        threadmoderator: { u: 'Keeper of Threads', order: -1/0 },
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
    tagColor: '#cd2626',
    glow: true,
    glowSize: '15px',
    glowColor: '#fffaf0',
    users: {
        "TerriaNight" : "MONARCH • REGENT",
    }
};

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

/* Toggle spoiler button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (!button.length) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('A Life Restored');
        } else {
            $(this).addClass('shown');
            $(this).text('A Life Erased');
        }
    }

    button.text('A Life Restored');

	button.click(toggleText);
});