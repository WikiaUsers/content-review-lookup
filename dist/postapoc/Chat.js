var chatags = { images: true, videos: true };

importScriptPage('ChatOptions/code.js', 'dev');

importScriptPage('ChatAnnouncements/code.js','dev');

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}