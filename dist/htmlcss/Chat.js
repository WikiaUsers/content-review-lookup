/**
 * This is the chat JavaScript
 * page. Please do not copy this
 * code without an admin's consent.
 * Thank you.
 * 
 * - Ultimate Dark Carnage
 **/

importArticles({
    'type': 'script',
    'articles': [
        'multipms.js',
        'library.js',
        'media.js',
        'multikick.js',
        'multiban.js',
        'party.js',
        'options.js'
    ].map(function(name){
        return 'MediaWiki:Chat.js/' + name;
    })
});