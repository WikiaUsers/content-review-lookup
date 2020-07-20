//last edited user put at top left corner on each page
window.lastEdited = {
    avatar: false
};
 
$(function() { 
$('.wg-username').text(mw.config.get('wgUserName')); 
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js',
    ]
});