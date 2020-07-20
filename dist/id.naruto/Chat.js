importScriptPage('ChatOptions/code.js', 'dev');

/*Kick*/
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );

/*Mod*/
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );

/*Tags*/
importScriptPage("ChatTags/code.js", "dev");

/*Game*/
importArticles( {
    type: 'script',
    articles: [
        "u:dev:SpellingBee/startup.js"
    ]
} );

importArticles( {
    type: 'script',
    articles: [
        "u:dev:jumbles/startup.js"
    ]
} );