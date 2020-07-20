/* Any JavaScript here will be loaded for all users on every page load. */

// Core Configuration. Add Custom Tags/Rename Existing Tags

window.UserTagsJS = {
    modules: {},
    tags: {
            // groupname: {u:'DisplayName', link:'Page', order:number}
            // status
            blocked: {u:'Exiled', link:'Blocked Users', order: -1/0},
            inactive: {u:'Inactive', order: 1/0},
            stareditor: {u:'Starcaller', order: -1/0},
            //ranks
            bureaucrat: { u:'Sage', link:'Wiki Staff', order: -1},
            sysop: { u:'Machnist', link:'Wiki Staff', order: -1},
            'content-moderator': { u:'Paladin', link:'Wiki Staff', order: -1},
            threadmoderator: { u:'Mystic', link:'Wiki Staff', order: 1},
            chatmoderator: { u:'Warlord', link:'Wiki Staff', order: 1},
            rollback: { u:'Dryad', link:'Wiki Staff', order: 1},
            //server staff
            serveradmin: { u:'Server Administrator', link:'Avalon Network Staff', order: -1},
            servermod: { u:'Server Moderator', link:'Avalon Network Staff', order: -1},
            serverdev: { u:'Server Developer', link:'Avalon Network Staff', order: -1},
            serverbuilder: { u:'Server Developer', link:'Avalon Network Staff', order: -1},
            serverstaff: { u:'Server Staff', link:'Avalon Network Staff', order: -1}
    },
    oasisPlaceBefore: ''
};
// Add Groups to Users
UserTagsJS.modules.custom = { //add custom roles to users
    'CuriouslyKai': ['stareditor', 'servermod'],
    'JPGMC': ['serveradmin'],
    'MarcSeamus': ['serveradmin']
};

UserTagsJS.modules.mwGroups = [ //ability to CSS certain tags
    'blocked', 'inactive', 'stareditor', 'bureaucrat', 'sysop', "content-moderator", 'threadmoderator', 'chatmoderator', 'rollback', 'serveradmin', 'servermod', 'serverdev', 'serverbuilder', 'serverstaff'];

UserTagsJS.modules.metafilter = { //remove lower-tank tags from higher-rank users
    'sysop': ['bureaucrat', 'founder'],
    "content-moderator": ['sysop','bureaucrat', 'founder'],
    'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'rollback': ['chatmoderator','threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};    

UserTagsJS.modules.userfilter = {
    'CuriouslyKai': ['inactive', 'founder']
};
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 2 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days

//TZclock Config
window.TZclockSimpleFormat = true;

/* Page Lock Configs */

//LockForums config
window.LockForums = {
    expiryDays: 20,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived and locked due to inactivity.'
};

//LockBlogs config
window.LockOldBlogs = {
    expiryDays: 20,
    expiryMessage: 'This blog has been archived and locked due to inactivity. If you believe there is an issue, please contact an Administrator.'
};