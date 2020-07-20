importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
 
importScriptPage('ChatNotifications/code.js', 'dev');
 
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
 
    ]
} );