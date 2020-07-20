importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:IsTyping.js',
        'u:dev:NewMessageCount.js',
    ]
});


window.ChatHacksNoStar = true;

var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}