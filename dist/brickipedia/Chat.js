function inlineAlert(text) { mainRoom.model.chats.add(new models.InlineAlert( {text:(text)} )); }
importScriptPage('ChatOptions/code.js', 'dev')
importScriptPage('MediaWiki:ClassicModIcons/code.js', 'dev');

var chatags = { videos: true };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
    ]
});