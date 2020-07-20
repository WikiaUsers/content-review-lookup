importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev')
var chatags = { images: true, videos: true }
 
importArticles( {
    type: 'script',
    articles: [
        "u:dev:jumbles/startup.js",
        "u:dev:ChatOptions/code.js",
        "u:dev:ChatToolbox/code.js",
    ]
} );