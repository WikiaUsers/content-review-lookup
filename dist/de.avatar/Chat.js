/* Aktiviert Chat-Options */

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js'
    ]
});

/* Zeigt "Emoticons"-Button an */

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});
window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FixAdminKick/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PingEveryone/code.js',
    ]
});