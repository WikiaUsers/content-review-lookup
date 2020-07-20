/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

// Etiquetas
window.UserTagsJS = {
    tags: {
        bureaucrat: {},
        founder: {},
        bot: {},
        chatmoderator: {},
        rollback: {},
        sysop: {}
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: false
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'founder',
            'sysop',
            'rollback',
            'bot'
        ],
        newuser: false
    }
};

//Import Script pages
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:ShowHide/code.js'
    ]
});