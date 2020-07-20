// This is used from https://dev.wikia.com/wiki/UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
            bureaucrat: { u: 'BUREAUCRAT', order: -1/0},
            sypos: { u: 'ADMINISTRATOR', order: 1},
            moderator: {u: 'MODERATOR', order: 2},
            train: {u: 'STAFF IN-TRAINING', order: 3},
            contributor: { u: 'CONTRIBUTOR', order: 4},
            retired: {u: 'FORMER WIKI STAFF', order: 5},
            newuser: { u: 'NEW EDITOR', order: 6}}
};
UserTagsJS.modules.inactive = {
	days: 5,
	edits: 5,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.userfilter = {   // used to exempt tags for specific people
	'EatingGlasss': ['founder'],
	'Vastmine1029': ['inactive']
};
UserTagsJS.modules.custom = {
    'Tintenfische':['contributor', 'retired'],
    'MyUsernamesThis': ['contributor', 'retired'],
	'Anotherwildeboy': ['contributor'],
	'Nayrina': ['contributor'],
	'ThePotatoes': ['contributor'],
	'111yxiao': ['contributor'],
	'Jikoo103': ['contributor'],
	'Reteego': ['contributor'],
	'Sonnenlichior': ['contributor'],
	'Jacemcc1': ['contributor'],
	'BenEvilbite': ['contributor'],
	'JJForge': ['contributor'],
	'DatDolphin': ['contributor'],
	'DarkRockStar': ['contributor'],
	'Sonnenly': ['contributor'],
	'BooTra': ['contributor','retired'],
	'EatingGlasss': ['contributor','retired'],
	'Jeff816': ['contributor','retired'],
	'DerpyMcDerpell': ['contributor','retired']
};
UserTagsJS.modules.newuser = {
	days: 7, // Must have been on the Wiki for 7 days
	edits: 20, // And have at least 20 edits to remove the tag
	namespace: [0, 'Talk', 'User talk', 'Forum'] // Edits must be made to articles to count
};
UserTagsJS.modules.implode = {
    'moderator': ['content-moderator','threadmoderator']
};
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'inactive': ['bureaucrat'],
    'content-moderator': ['sysop']
};
window.MessageWallUserTags = {
    tagColor: 'Red',
    txtSize: '10px',
    glow: false,
    glowSize: '0px',
    glowColor: '',
    users: {
        'Vastmine1029': 'Bureaucrat • Wiki Staff',
        'Zeumus': 'Bureaucrat • Wiki Staff',
        'NewFissy': 'Administrator • TreeLands Developer',
        'UltChowsk': 'Administrator • Wiki Staff'
    }
};

window.railWAM = {
    logPage:"Project:WAM Log"
};
TBL_GROUP = "roblox-en";