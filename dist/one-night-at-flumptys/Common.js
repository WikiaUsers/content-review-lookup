//last edit top of pages
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