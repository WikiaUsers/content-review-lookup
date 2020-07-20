chatAnnouncementsAll = false;
importArticles( {
    type: 'script',
    articles: [
        'u:dev:ChatOptions/pl/code.js',
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
} );
importScriptPage('MediaWiki:ChatNotifications/code.js', 'dev');