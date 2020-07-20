importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:BlinkingTabAlert.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatBinaryButton.js'
    ]
});

importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js'
]});

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});