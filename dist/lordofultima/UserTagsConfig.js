/*** UserTags configuration ***/

window.UserTagsJS = {
    modules: {},
    tags: {
        uotm: {u: 'Users of the Month'},
        bureaucrat: {u: 'Bureaucrat'},
        sysop: {u: 'Administrator'},
        gfx: {u: 'Graphic Designer'},
        code: {u: 'Script Coder'},
        mcode: {u: 'Master Coder'},
        staff: {u: 'Wikia Staff'}
    }
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

// List of user-groups (any custom groups must be added here)
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'autoconfirmed',
    'uotm',
    'gfx',
    'code',
    'mcode',
    'staff'
];

// MODULE: Meta Filter
// Removes a group when a certain combination of groups is encountered
// { 'group': ['group', 'or group', ['or group 1', 'and group 2']] }
UserTagsJS.modules.metafilter = {
    rollback: ['sysop', 'bureaucrat'],
    chatmoderator: ['sysop', 'bureaucrat'],
    newuser: ['sysop', 'bureaucrat', 'staff'],
    autoconfirmed: ['sysop', 'bureaucrat', 'staff']
};

// Manually assign custom tags
UserTagsJS.modules.custom = {
    'WilliamLazycat': ['gfx'],
    'RyaNayR': ['uotm', 'mcode']
};