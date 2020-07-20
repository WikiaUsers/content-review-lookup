window.MessageWallUserTags = {
    users: {
        'Taliseth': 'Viscount'
    },
    tagColor: 'orange',
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:DisplayClock/code.js'       // Clock for both skins
    ]
});