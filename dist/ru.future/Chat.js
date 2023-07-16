var chatags = { images: true, videos: true }; 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor'); 
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev'); 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}
var blinkInterval = 1000; 
importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');
importScriptPage('SpeedEmoticon/latest.js', 'korniux');