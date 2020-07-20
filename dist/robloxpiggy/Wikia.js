window.UserTagsJS = {
	modules: {},
	tags: {
            leadadmin: { u: 'LEAD ADMINISTRATOR', order: -1/0 },
            contlead: { u: 'CONTENT MOD LEAD', order: 1 },
            disclead: { u: 'DISCUSSION MOD LEAD', order: 2 },
            sysop: { u: 'ADMINISTRATOR', order: 3 },
            moderator: {u: 'GENERAL MODERATOR', order: 4 },
            'content-moderator': {u: 'CONTENT MODERATOR', order: 5 },
            threadmoderator: {u: 'DISCUSSIONS MODERATOR', order: 6 },
            retired: {u: 'FORMER WIKI STAFF', order: 7 },
            newuser: { u: 'NEW EDITOR', order: 8 }
	}
};

UserTagsJS.modules.autoconfirmed = true;

/*
UserTagsJS.modules.userfilter = {   // used to exempt tags for specific people
	'Vastmine1029': ['sysop']
};
*/

/*
UserTagsJS.modules.custom = {
    'Vastmine1029': ['leadadmin']
};
*/

UserTagsJS.modules.newuser = { //autoconfirmed
	days: 4, // Must have been on the Wiki for 4 days
	edits: 0, // And have at least 0 edits to remove the tag
	namespace: [0, 'Talk', 'User talk', 'Forum'] // Edits must be made to articles to count
};

UserTagsJS.modules.implode = {
    'moderator': ['content-moderator','threadmoderator']
};

UserTagsJS.modules.metafilter = {
    'inactive': ['bureaucrat','sysop','moderator'],
    'bureaucrat': ['bureaucrat'],
    'founder':['founder']
};

window.MessageWallUserTags = {
    tagColor: 'Salmon',
    txtSize: '10px',
    glow: false,
    glowSize: '0px',
    glowColor: '',
    users: {
    'Vastmine1029': 'Administrator • Wiki Staff',
    'CatsyTheRedCat': 'Administrator • Wiki Staff',
    'GumdropTheGummyBee': 'Administrator • Wiki Staff',
    'Marcusngne': 'Administrator • Wiki Staff',
    'PeakAviator': 'Administrator • Wiki Staff',
    'Raz Mail': 'Administrator • Wiki Staff',
    'Wolfman5580': 'Administrator • Wiki Staff',
    'Mishacattv': 'Content Moderator • Wiki Staff',
    }
};