/* Any JavaScript here will be loaded for all users on every page load. */
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

window.ajaxRefresh = 60000;
window.ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Contributions',
    'Special:Log',
    'Special:Log/move',
    'Special:AbuseLog',
    'Special:NewFiles',
    'Special:NewPages',
    'Special:Watchlist',
    'Special:Statistics',
    'Special:ListFiles',
    'Category:Speedy_deletion_candidates',
    'Category:Speedy_move_candidates'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.LockForums = { 
    expiryDays: Infinity,
    warningDays: 90,
    warningMessage: "This thread has not been commented on for over <warningDays> days. There is no need to reply, unless it is part of the versus forum."};

window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data },
        founder: {
            u: 'Founder',
            order: 1
        },
        bureaucrat: {
            u: 'Bureaucrat',
            order: 2
        },
        'former-bureaucrat': {
            u: 'Retired Bureaucrat',
            order: 3
        },
        sysop: {
            u: 'Administrator',
            order: 4
        },
        'former-sysop': {
            u: 'Retired Administrator',
            order: 5
        },
        'bot-global': {
            u: 'Global Bot',
            order: 7
        },
        bot: {
            u: 'Bot',
            order: 8
        },
        'content-moderator': {
            u: 'Content Moderator',
            order: 10
        },
        'former-content-moderator': {
            u: 'Retired Content Moderator',
            order: 11
        },
        threadmoderator: {
            u: 'Discussion Moderator',
            order: 13
        },
        'former-threadmoderator': {
            u: 'Retired Discussion Moderator',
            order: 14
        },
        chatmoderator: {
            u: 'Chat Moderator',
            order: 16
        },
        'former-chatmoderator': {
            u: 'Retired Chat Moderator',
            order: 17
        },
        rollback: {
            u: 'Rollback',
            order: 19
        },
        'former-rollback': {
            u: 'Former Rollback',
            order: 20
        },
        calc: {
            u: 'Calc Group',
            order: 22
        },
        'former-calc': {
            u: 'Retired Calc Group',
            order: 23
        },
        'js-helper': {
            u: 'JS Helper',
            order: 51
        },
        'css-helper': {
            u: 'CSS Helper',
            order: 52
        },
        'image-helper': {
            u: 'Image Helper',
            order: 53
        },
        'template-helper': {
            u: 'Templates Helper',
            order: 54
        },
        'human-resources': {
            u: 'Human Resources',
            order: 55
        },
        'former-human-resources': {
            u: 'Retired Human Resources',
            order: 56
        },        
        consultant: {
            u: 'Consultant',
            order: 100
        },
        'former-consultant': {
            u: 'Retired Consultant',
            order: 101
        },
        'former-image-helper': {
            u: 'Retired Image Helper',
            order: 102
        },

        bannedfromchat: {
            u: 'Banned from Chat',
            order: 500
        },
        inactive: {
            u: 'Inactive',
            order: 1 / 0
        }
    }
};