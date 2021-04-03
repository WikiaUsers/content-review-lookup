// Legacy user tags script since the current one doesn't work for some reason.
// Don't use anything that will probably screw up the script, like "title" stuff
window.UserTagsJS = {
	modules: {},
	tags: { 
        councilor: 'Community Council',
        tech: 'Technician',
        topuser: 'Top user',
        patroller: 'Patroller',
        retired: 'Retired',
        bot: 'Bot',
        helpdesk: 'Help Desk',
        former: 'Former Staff',
        thanks: 'Special Thanks',
        'content-moderator': 'Moderator'
    }
};
 
UserTagsJS.modules.custom = {
    'PvZGwchampion': ['tech', 'patroller', 'topuser'],
    "Mysterkid1": ['retired, former'],
    "ThisUserLikesOreo": ['thanks'],
    "Zak4101-Bot": ['bot'],
    "Jackninja5DipperGravityFalls": ['thanks'],
    'ThatIsAPirate': ['tech']
    
};
 
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
    sysop: [
        'bureaucrat',
        'founder',
        'bot'
    ],
    bureaucrat: [
        'founder',
        'bot'
    ],
    chatmoderator: [
        'threadmoderator',
        'content-moderator',
        'sysop',
        'bureaucrat',
        'founder',
        'bot'
    ],
    rollback: [
        'sysop',
        'chatmoderator',
        'threadmoderator',
        'content-moderator',
        'bureaucrat',
        'founder',
        'bot'
    ],
    threadmoderator: [
        'content-moderator',
        'bureaucrat',
        'sysop',
        'founder',
        'bot'
    ],
    'content-moderator': [
        'bureaucrat',
        'sysop',
        'founder',
        'bot'
    ],
    inactive: ['retired']
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'chatmoderator',
    'rollback',
    'bot-global',
    'patroller',
    'bot'
];