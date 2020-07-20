/*------ UserTags config ------*/
window.UserTagsJS = {
    modules: {},
    tags: {
        bot: { u: 'BOT', order: -1 / 0 },
        blocked: { u: 'Banned', order: -1 / 0 },
        bureaucrat: { u: 'Bureaucrat', order: 0 },
        sysop: { u: 'Admin', order: 100 },
        radmin: { u: 'Reserve Admin', order: 100 },
        chatmoderator: { u: 'Chat Mod', order: 101 },
        'bot-owner': { u: 'Bot Owner' },
        autoconfirmed: { u: 'Autoconfirmed' },
        inactive: { u: 'Inactive', order: 1 / 0 }
    }
};

// List of user-groups (any custom groups must be added here)
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'bot-owner',
    'inactive',
    'newuser',
    'autoconfirmed',
    'radmin'
];

// Manually assign custom tags
UserTagsJS.modules.custom = {
    'DeviantSerpent': ['bot-owner', 'radmin'],
    'RyaNayR': ['bot-owner'],
    'Bloody18': ['radmin']
};

UserTagsJS.modules.inactive = 25;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

// MODULE: Meta Filter
// Removes a group when a certain combination of groups is encountered
// { 'group': ['group', 'or group', ['or group 1', 'and group 2']] }
UserTagsJS.modules.metafilter = {
    rollback: ['sysop', 'bureaucrat'],
    autoconfirmed: ['sysop', 'bureaucrat', 'chatmoderator', 'staff'],
    sysop: ['radmin'],
    newuser: ['staff']
};