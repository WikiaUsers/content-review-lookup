/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:DisplayTimer/code.js'
    ]
});

//
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
}

)('#togglebutton').click(function() {
    $('#elementtest').toggle();
});