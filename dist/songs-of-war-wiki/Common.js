/* Any JavaScript here will be loaded for all users on every page load. */

// Core Configuration. Add Custom Tags/Rename Existing Tags

window.UserTagsJS = {
    modules: {},
    tags: {
            // groupname: {u:'DisplayName', link:'Page', order:number}
            // status
            blocked: {u:'Exiled', link:'Blocked Users', order: -1/0},
            inactive: {u:'Inactive', order: 1/0},
            //ranks
            css: {u:'CSS Manager', order: -1},
            founder: {order: 1/0},
            bug: {u:'Bug Squasher', order: -1/0}
    },
    oasisPlaceBefore: ''
};

// Add Groups to Users
UserTagsJS.modules.custom = { //add custom roles to users
    'CuriouslyKai': ['css'],
    'Spatial Designs':['css'],
    'SpielefreakJLP': ['bug']
};
UserTagsJS.modules.mwGroups = [ //ability to CSS certain tags
    'blocked', 'inactive', 'css', 'bureaucrat', 'sysop', "content-moderator", 'threadmoderator', 'chatmoderator', 'rollback'];

UserTagsJS.modules.metafilter = { //remove lower-tank tags from higher-rank users
    'sysop': ['bureaucrat', 'founder'],
    "content-moderator": ['sysop','bureaucrat', 'founder'],
    'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'rollback': ['chatmoderator','threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};    

UserTagsJS.modules.userfilter = {
    'CuriouslyKai': ['inactive']
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