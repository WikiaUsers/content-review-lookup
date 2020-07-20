importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:EmoticonsWindows/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:NewMessageCount.js',
        'u:kocka:MediaWiki:CustomUndoLink.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:electroboom:MediaWiki:ChatTagsLink.js',
    ]
});

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');