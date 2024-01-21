// 22:01, January 20, 2021 (UTC)

/* Any JavaScript here will be loaded for all users on every page load. */

/* AjaxRC */
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
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* User Tags */
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
            order: 6
        },
        bot: {
            u: 'Bot',
            order: 7
        },
        'content-moderator': {
            u: 'Content Moderator',
            order: 8
        },
        'former-content-moderator': {
            u: 'Retired Content Moderator',
            order: 9
        },
        threadmoderator: {
            u: 'Discussion Moderator',
            order: 10
        },
        'former-threadmoderator': {
            u: 'Retired Discussion Moderator',
            order: 11
        },
        chatmoderator: {
            u: 'Chat Moderator',
            order: 12
        },
        'former-chatmoderator': {
            u: 'Retired Chat Moderator',
            order: 13
        },
        rollback: {
            u: 'Rollback',
            order: 14
        },
        consultant: {
            u: 'Consultant',
            order: 100
        },
        bannedfromchat: {
            u: 'Banned from Chat',
            order: 500
        },
        inactive: {
            u: 'Inactive',
            order: -1/0
        }
    }
};
UserTagsJS.modules.inactive = {
    days: 30,
    // namespaces: [0, 'Talk', 'User', 'User talk', 'Forum'], // Only articles, talk pages, user pages, user talk pages or forums edits count, other Wikia namespace edits don't count
    zeroIsInactive: true // 0 edits = inactive
};
UserTagsJS.modules.autoconfirmed = true; // Switch on Autoconfirmed User check
UserTagsJS.modules.newuser = {
    namespace: 1, // Edits must be made to articles to count
    computation: function(days, edits) {
        // If the expression is true then they will be marked as a new user
        // If the expression is false then they won't.
        // In this instance, newuser is removed as soon as the user gets 30
        // edits, OR as soon as they have been present for 10 days, whichever
        // happens first.
        return days < 10 && edits < 30;
    }
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator', 
    'chatmoderator',
    'patroller',
    'rollback',
    'bannedfromchat'
];
UserTagsJS.modules.custom = {
    'Dewott the epic': ['founder', 'former-bureaucrat'],
    'Kavpeny': ['former-sysop'],
    'SchutzenDunkelZiel1217': ['former-sysop'],
    'Azure Sha-Barracuda14.99': ['former-chatmoderator'],
    'Abbadon the Chaos King': ['former-sysop'],
    'EliminatorVenom': ['former-sysop'],
    'BlitzStrike': ['former-threadmoderator'],
    'LeonRaidenYun': ['former-sysop'],
    'Fllflourine': ['former-content-moderator'],
    'CrossverseCrisis': ['former-bureaucrat'],
    'ExoSaiyan9000': ['former-sysop'],
    'Drag-O-Drawgon': ['former-content-moderator'],
    'Dragonmasterxyz': ['former-sysop'],
    'Xmark12': ['former-content-moderator'],
    'Shadowbokunohero': ['former-chatmoderator'],
    'Promestein': ['former-bureaucrat']
};

UserTagsJS.modules.metafilter = {
    // Remove inactive from all bureaucrats, sysops, bots, global bots, staff, wikia utility and vstf
    'inactive': [
        'sysop',
        'bureaucrat',
        'bot',
        'bot-global',
        'staff',
        'util',
        'vstf'
    ], 
    'sysop': ['bot', 'bot-global', 'bureacrat'], // Remove "Administrator" tag from bots, global bots, and bureaucrats
    'content-moderator': ['bureaucrat', 'sysop'], // Remove "Content Moderator" tag from bureaucrats and administrators
    'threadmoderator': ['bureaucrat', 'sysop'], // Remove "Discussions Moderator" tag from bureaucrats and administrators
    'chatmoderator': ['bureaucrat', 'sysop'], // Remove "Chat Moderator" tag from bureaucrats and administrators
    'rollback': ['bureaucrat', 'sysop'] // Remove "Rollback" tag from bureaucrats and administrators
};