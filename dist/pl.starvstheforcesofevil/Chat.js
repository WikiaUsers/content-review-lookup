/* ChatTags */
var chatags = { videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

/* ChatOptions */
importScriptPage('ChatOptions/pl/code.js', 'dev');

/* IsTyping */
importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});