/* Any JavaScript here will be loaded for all users on every page load. */

/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:NullEditButton/code.js',
        'w:c:dev:Countdown/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:InactiveUsers/code.js',
    ]
});

/* Message Wall User Tags Config */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'ZQGame_Inc': 'Founder',
        'Arcelle': 'Wiki Admin',
        'Definewikipedia': 'Wiki Admin',
        'ChaosLordR': 'Wiki Admin'
    }
};

/* Highlight Config */
highlight = {
    selectAll: true,
    sysop: 'orange',
    users: {

    }
};