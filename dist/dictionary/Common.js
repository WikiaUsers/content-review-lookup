/* Any JavaScript here will be loaded for all users on every page load. */



highlight = {
    selectAll: true,
    bot: '#A400A4',
    users: {
    }
};

importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:HighlightUsers/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:DisableBotMessageWalls/code.js'
    ]
});