importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:LMBWChat.js');
 

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emojis",
        close: "Close"
    },
    help: "Choose an emoticon listed below."
};


importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');


var blinkInterval = 1000; // Custom blink delay, 1000ms is default
importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        // Other scripts...
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        // ...
    ]
});

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');