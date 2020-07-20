/* Any JavaScript here will be loaded for all users on every page load. */
 
// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 

 window.UserTagsJS = {
    modules: {
        mwGroups: {}
    },
    tags: {
        rollback: {
            u: 'Rollback'
        }
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatErrorExplanation.js',
    ]
});