/* Any JavaScript here will be loaded for all users on every page load. */
/*HighlightUsers config (http://dev.wikia.com/wiki/HighlightUsers)*/
highlight = {
    selectAll: true,
    helper: '#4C5F1D',
    vstf: '#F77',
    staff: '#DA0',
    sysop: '#006600',
    bot: '#A400A4',
    users: {
        
    }
};
/*MessageWallUserTags (http://dev.wikia.com/wiki/MessageWallUserTags)*/
window.MessageWallUserTags = {
    tagColor: 'black',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Miiohau' : 'Admin'
    }
};
/*ListUsers(http://dev.wikia.com/wiki/ListUsers)*/
window.listUsers = {
    talk: true,
    contribs: true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:ListUsers/code.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
    ]
});