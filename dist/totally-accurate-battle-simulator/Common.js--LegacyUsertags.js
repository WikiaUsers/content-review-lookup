/* Any JavaScript here will be loaded for all users on every page load. */
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
        owner: 'Wiki Owner',
        helpdesk: 'Help Desk',
        former: 'Former Staff',
        founder: 'Founder',
        thanks: 'Special Thanks',
        'content-moderator': 'Moderator'
    }
};
 
UserTagsJS.modules.custom = {
    'PvZGwchampion': ['tech', 'patroller', 'topuser', 'helpdesk', 'thanks'],
    "Mister Kad": ['owner'],
    "Fireboyy44": ['patroller', 'thanks'],
  "Lieutenant Jozev, 1st Air Hussars Squadron, Hettic Royal Flying Service": ['founder', 'retired'],
    "MajorArmBreak": ['thanks'],
    "ShadowLeviathanKing": ['patroller', 'thanks']
    
 
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