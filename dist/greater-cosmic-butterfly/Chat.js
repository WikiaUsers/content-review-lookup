importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

var chatags = { images: true, videos: true };
 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importArticles({
    type: 'script',
    articles: [
        'u:dev:NewMessageCount.js'
    ]
});
 
importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});
 
window.IsTyping = {
    $indicator: $('<div>', {
        class: 'typing-indicator'
    }).appendTo('body'),
    noStyle: true,
    doScroll: false
}