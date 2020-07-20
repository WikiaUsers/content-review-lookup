importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};

/*JS for the Chat*/
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importScriptPage('MediaWiki:ChatHacks.js', 'dev'); 
/*Everybody can add announcements*/
chatAnnouncementsAll = true;

importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});