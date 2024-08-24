importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );

// AjaxEmoticons
ajaxEmoticonsInterval = 45000;
importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');
 
// Diversos
importArticles( {
    type: 'script',
    articles: [
        "MediaWiki:Chat.js/ChatTags.js",                     // ChatTags
        "u:dev:MediaWiki:ChatAnnouncements/code.js",         // An�ncio
        "u:dev:MediaWiki:IsTyping/code.js"                   // D�gitos.PM
    ]
});