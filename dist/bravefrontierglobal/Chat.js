importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatTags/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
});

alertMessage = 'WARNING! The message you are about to send may contain word(s) that are unsuitable for chat. Clicking Continue may cause you to be kicked! If you think the message you\'re about to send is appropriate, just click Continue. Otherwise, Cancel.';
importScriptPage('MediaWiki:WordFilter/code.js');