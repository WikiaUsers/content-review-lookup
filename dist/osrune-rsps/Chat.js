importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:ChatSendButton.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
} );
importScriptPage('MediaWiki:AnonymousChatAnnouncements/code.js','dev');
ajaxEmoticonsInterval = 45000;
importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');

window.absentMessage = '<user> is currently not at the chat.';
importScriptPage('!kick.js', 'dev')
importScriptPage( 'ChatObject/code.js', 'dev' );
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:FixAdminKick/code.js','dev');
importScriptPage('ChatTimestamps/code.js','dev');