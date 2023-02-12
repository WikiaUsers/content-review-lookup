// Import Chat features
importArticles({
    type    : "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        "u:dev:!mods/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});
 
importScriptPage('SpeedEmoticon/latest.js', 'korniux');
importScriptPage('ChatTimestamps/code.js','dev');

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');
var beepSound = 'http://soundbible.com/grab.php?id=1645&type=mp3';
var desktopNotifications = true;

importScriptPage('ChatImages/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "u:dev:IsTyping/code.js",
    ]
});

window.IsTyping = {
    $indicator: $('<div>', {
        class: 'typing-indicator'
    }).appendTo('body'),
    noStyle: true,
    doScroll: false,
    mainRoomDisabled: true
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatSyntaxHighlight.js',
    ]
});