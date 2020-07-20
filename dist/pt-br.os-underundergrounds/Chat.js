importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );

/* ChatTags criado por [[User:Shining-Armor]] */
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('MediaWiki:Chat.js/ChatOptions.js', 'pt-br.sims');
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');