/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

importScriptPage('AjaxRC/code.js', 'dev');

cacheSkip = [];
cacheSkipLimit = 1000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:CacheCheck/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

importScriptPage('Voice_Dictation/voice.js', 'dev');

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

importScriptPage('EditIntroButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:HeaderLinks/code.js'
    ]
});

importScriptPage('BackToTopButton/code.js', 'dev');

// http://dev.wikia.com/wiki/FixWantedFiles
importScriptPage('FixWantedFiles/code.js', 'dev');