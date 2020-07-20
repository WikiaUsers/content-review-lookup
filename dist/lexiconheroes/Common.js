/* Any JavaScript here will be loaded for all users on every page load. */

/* import articles from other wiki pages */
importArticles({
    type: 'script',
    articles: [
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:DynamicImages/code.js']
});