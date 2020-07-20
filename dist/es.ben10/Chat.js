// [[MediaWiki:Chat-toolbox.js]]

importScriptPage('MediaWiki:CustomModIcons.js', 'dev');
importScriptPage('ChatOptions/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        'MediaWiki:Chat-toolbox.js',
        'u:dev:MediaWiki:ChatToolbox/code.js',
        'u:dev:MediaWiki:MobileChat.js',
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ChatTags/code.js',
    ]
});

//Escribiendo//
importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});