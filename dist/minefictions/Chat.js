
chatAnnouncementsAnonymous = true; /* Chat announcements */
chatAnnouncementsAll = true;
var chatags = { images: true, videos: true };
 
importScriptPage('MediaWiki:ChatAnnouncements/code.js', 'dev');
importScriptPage('Mediawiki:ChatEditTools/code.2.js', 'dev');
 
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:GiveChatMod/code.js',
        'u:dev:!ban/code.js', /*Ban*/
        'u:dev:ChatMessageWallCount/code.js',
        'u:dev:ChatSendButton.js', /*Chat Send Button */
        'u:dev:MediaWiki:!kick/code.js', /* Kick */
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        "u:dev:IsTyping/code.js",
        "u:dev:MediaWiki:QuickModTools/code.js",
        'MediaWiki:ChatOptions/code.js',
    ]
});