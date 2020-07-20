// Chat options
// Written by Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
        chatOptionsLoaded = 1;
        importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
// END Chat options

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});