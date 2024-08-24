// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Project:Administra��o#Burocratas'
        },
        bot: {
           link: 'Project:Administra��o#Bots'
        },
        chatmoderator: {
            link: 'Project:Administra��o#Moderadores_do_chat'
        },
        assistente: {
            link: 'Project:Administra��o#Assistentes'
        },
        rollback: {
            link: 'Project:Administra��o#Rollbacks'
        },
        vstf: {
            link: 'Special:ListUsers/vstf'
        },
        helper: {
            link: 'Special:ListUsers/helper'
        },
        staff: {
            link: 'Special:ListUsers/staff'
        },
        sysop: {
            link: 'Project:Administra��o#Administradores'
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
            'helper',
            'staff',
            'vstf',
            'bot'
        ],
        newuser: true
    }
};

//Import Script pages
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:SexyUserPage/code.js',
        'MediaWiki:Wikia.js/Nav.js'
    ]
});