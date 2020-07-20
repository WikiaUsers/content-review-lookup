importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});