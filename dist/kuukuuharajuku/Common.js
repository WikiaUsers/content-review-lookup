/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: false,
    time: 'timestamp',
    position: {
        element: document.getElementById('WikiaPageHeader'),
        method: 'append'
    },
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
window.railWAM = {
    logPage:"Project:WAM Log"
};