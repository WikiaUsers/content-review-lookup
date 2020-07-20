/* Any JavaScript here will be loaded for all users on every page load. */
/*Time*/
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});
importArticle({type:'script', article:'w:c:dev:DisplayTimer/code.js'});

/*User tags on messages of message walls*/
var messageWallUserTags = {
    'Roranoa_zoro': 'Founder',
    'User1': 'Founder',
};
window.messageWallTagColor = 'blue';
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});