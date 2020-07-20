window.MessageWallUserTags = {
    tagColor: 'red',
    glow: false,
    glowSize: '15px',
    users: {
        'username': 'usergroup',
        'IAmDefalt': 'Bureaucrat',
        'Tominator777': 'Administrator',
        'Lady_Blue': 'Bureaucrat',
        'Random_Pony': 'Rollback',
        'Legacyofhades': 'Moderator',
        'Heroesyatta': 'Moderator',
        'Richisalive': 'Moderator'
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});