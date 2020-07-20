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
 
 importArticles( { 
    type: 'script', 
    articles: [ 
        'u:dev:GiveChatModPrompt/code.js', 
        'u:dev:ChatAnnouncements/code.js', 
        'u:dev:!mods/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatOptions/code.js',  ] } );

importScriptPage('ChatImages/code.js', 'dev');
importScriptPage('MediaWiki:FixAdminKick/code.js','dev');
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});