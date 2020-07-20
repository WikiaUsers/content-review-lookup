// Dev Wiki imports
importArticles( {
    type: 'script',
    articles: [
        'u:dev:ChatImages/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatOptions/es/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
});

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
chatAnnouncementsAll = true;