/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:dev:ReferencePopups/code.js',
        'w:dev:ReferencePopups/custom.js',
        // ...
    ]
});

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});