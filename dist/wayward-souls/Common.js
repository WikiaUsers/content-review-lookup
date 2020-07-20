/* Any JavaScript here will be loaded for all users on every page load. */
highlight = {
    selectAll: true,
    sysop: 'purple',
    'other group': 'white',
    users: {
 
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]
});