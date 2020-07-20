importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
var chatags = { images: true, videos: true };
 /*Use /sendannouncement */
chatAnnouncementsAnonymous = true; /* Chat announcements */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:GiveChatMod/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:!ban/code.js', /*Ban*/
        'u:dev:ChatMessageWallCount/code.js',
        'u:dev:ChatSendButton.js', /*Chat Send Button */
        'u:dev:MediaWiki:!kick/code.js' /* Kick */
    ]
});