// Import Chat features
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        // ...
    ]
});

importScriptPage('ChatTimestamps/code.js','dev');

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');
var beepSound = 'http://soundbible.com/grab.php?id=1645&type=mp3';
var desktopNotifications = true;