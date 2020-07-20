/* Any JavaScript here will be loaded for all users on every page load. */

// UserTags
window.UserTagsJS = {
    modules: {},
    tags:    {}
};
 
UserTagsJS.modules.inactive      = 30;
UserTagsJS.modules.newuser       = false;
UserTagsJS.modules.autoconfirmed = true;
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
];
 
UserTagsJS.modules.metafilter = {
    sysop:         ['bureaucrat', 'founder'],
    bureaucrat:    ['founder'],
    chatmoderator: ['sysop', 'bureaucrat', 'rollback', 'threadmoderator'],
    rollback:      ['sysop', 'bureaucrat']
};

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};