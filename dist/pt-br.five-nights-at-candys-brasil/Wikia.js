importScript('MediaWiki:Wikia.js/userRightsIcons.js');

$("body.ChatWindow .Chat .message img").attr("width","25px").attr("height","25px");

importArticles({
    type: 'script',
    articles: [
    'u:dev:ExtendedNavigation/code.js'
    ]
});