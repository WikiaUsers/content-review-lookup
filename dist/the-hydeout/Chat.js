importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}