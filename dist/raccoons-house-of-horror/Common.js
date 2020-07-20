/* Any JavaScript here will be loaded for all users on every page load. */
 /****User who last edited a page****/
window.lastEdited = {
    avatar: false
};


importArticles({
    type: "script",
    articles: [
        'u:dev:LastEdited/code.js',
        ]
});