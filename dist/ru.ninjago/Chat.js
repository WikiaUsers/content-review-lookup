importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatImages/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:GiveChatMod/code.js'
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});
importScriptPage('MediaWiki:ChatAnnouncements/code.js', 'dev');
chatAnnouncementsAnonymous = true;