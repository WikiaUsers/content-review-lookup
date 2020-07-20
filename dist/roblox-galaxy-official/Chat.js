importArticles({
    type: "script",
    articles: [
        "u:dev:ChatMessageWallCount/code.js"
    ]
});

var chatags = { videos: true };

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');