/* import articles */
// Admin Dashboard Block
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]

});
/* BackToTop */
window.BackToTopModern = true;
/* status */
window.UserStatusSettings = {
    colorBlindMode: 1,
    lightTheme: 1,
    statusIndicator: 0,
    online: '#0078ff',
    away: '#cc7',
    dnd: 'crimson',
    offline: 'darkgray',
};
/* LockDiscussions */
window.LockForums = {
    expiryDays: 30,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
}; 
 
/* LockOldBlogs */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn\'t been commented on for over 30 days. There is no need to comment."
};
/* UserTags */
window.UserTagsJS = {
    tags: {
        // group: { associated tag data }
        founder: {
            u: 'Mest Coast President',
            order: -1 / 0
        },
        bureaucrat: {
            u: 'High Ranking Squad Members',
            link: 'Project:Staff of the Wiki#Bureaucrats',
            order: -1 / 0
        },
        sysop: {
            u: 'Squad Members',
            link: 'Project:Staff of the Wiki#Administrators',
            order: -1 / 0
        },
        chatmoderator: {
            u: 'Mini Squad Members',
            link: 'Project:Staff of the Wiki#Chat_Moderators',
            order: -1 / 0
        },
        adopter: {
            u: 'New Squad Ember',
            link: 'Project:Staff of the Wiki#Wiki_Adopter',
            order: -1 / 0
        },
        usermonth: {
            u: 'Best Person',
            order: -1 / 0
        },
        vstf: {
            u: 'VSTF',
            order: -1 / 0
        },
        staff: {
            u: 'Staff',
            order: -1 / 0
        },
        councilor: 'Councilor',
        facebook: 'Facebook Manager',
        twitter: {
            u: 'Twitter Manager',
            link: 'Project:Staff of the Wiki#Twitter_Manager',
            order: -1 / 0
        },
        google: 'Google+ Manager',
        assistant: 'Assistant',
        skype: 'Skype Admin',
        permdisabled: 'Permanantly Disabled Account',
        admincrat: {
            u: 'Admincrat',
            link: 'Project:Staff of the Wiki#Admincrats'
        },
        supportadmin: {
            u: 'Support Administrator',
            link: 'Project:Staff of the Wiki#Support_Administrators',
            order: -1 / 0
        },
        patroller: {
            u: 'Patroller',
            link: 'Project:Staff of the Wiki#Patrollers',
            order: -1 / 0
        },
        formeradmin: {
            u: 'Former Administrator',
            link: 'Project:Staff of the Wiki#Former_Admins',
            order: -1 / 0
        },
        'bot-global': {
            u: 'Wikia Bot',
            link: 'Project:Staff of the Wiki#Wikia_Bots',
            order: -1 / 0
        },
        bot: {
            u: 'Bot',
            link: 'Project:Staff of the Wiki#Bot_Accounts',
            order: -1 / 0
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};