importScriptPage('SocialIcons/code.js','dev');
 
$(function () {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});
 
importArticles({
    type: 'script',
    articles: [
        'u:community:MediaWiki:Snow.js'
    ]
});