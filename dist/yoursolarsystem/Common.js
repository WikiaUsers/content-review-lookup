// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { order: -1/0, link:'Project:Bureaucrats' },
                'sysop-bot': { u: 'Admin Bot', order: 0 },
                sysop: { order: 1, link:'Project:Administrators' },
                bot: { u: 'Bot', order: 2 },
                'half-sysop': { u: 'Half Administrator', order: 3, link:'Project:Half Administrators' },
                'content-moderator': { order: 4 },
                threadmoderator: { order: 5, link:'Project:Moderators' },
                chatmoderator: { order: 6, link:'Project:Moderators' },
                rollback: { u: 'Rollback', order: 7, link:'Project:Rollback' },
                founder: { u: 'Founder' },
                formerbcrat: { u: 'Former Bureaucrat' },
                formersysop: { u: 'Former Administrator' },
                formerhalfsysop: { u: 'Former Half Administrator' },
                formermoderator: { u: 'Former Moderator' },
                retired: { u: 'Retired' },
                inactive: { u: 'Inactive' },
                'semi-active': { u: 'Semi-Active' }
        }
};

UserTagsJS.modules.custom = { 
          'Atomic7732': ['founder'], // The founder on his current account
          'Bla DK': ['formerbcrat', 'formersysop'], // Former bureaucrat and administrator
          'Le Venom': ['formersysop'], // Former administrator
          'Hypercane': ['semi-active', 'bureaucrat', 'sysop'],
          'Neutron Star': ['founder'], // Original founder account
          'Sassmaster15': ['retired', 'formersysop'] // Former administrator
        
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'bannedfromchat']; // User Groups
UserTagsJS.modules.autoconfirmed = false; // No Autoconfirmed
UserTagsJS.modules.metafilter = { 
          bureaucrat: ['founder'], // Removes bureaucrat tag from founder
          sysop: ['founder'] // Removes sysop tag from founder
};

UserTagsJS.modules.implode = {
	'sysop-bot': ['sysop', 'bot'], // Add "sysop-bot" to accounts flagged as a bot and a sysop
	'half-sysop': ['content-moderator', 'threadmoderator'], // Designates our "half-sysop" group
        'moderator': [['chatmoderator', 'rollback'], ['threadmoderator', 'rollback']] // Designates our "moderator" group
};