// Chat options
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}

// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatTags/code.js',
        'u:dev:ChatDelay/code.js',
        'u:dev:NewMessageCount.js',
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        "u:electroboom:MediaWiki:ChatTagsLink.js"
    ]
});