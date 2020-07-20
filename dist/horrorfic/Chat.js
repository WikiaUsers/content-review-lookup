chatAnnouncementsAnonymous = true; /* Chat announcements */
chatAnnouncementsAll = true;
window.chatAnnouncementsAll = true;
window.ChatStatus = { statuses: { afk: "AFK", edit: "Editing", food: "Eating", game: "Gaming" }, debug: false };
window.pingEveryone = {
    modsOnly: true, // So only moderators can use the ping
    color: '#940000', // The background color of the message that pinged everyone, default is yellow
    phrase: '@e', // The phrase to use that will ping everyone, default is @everyone
};
 
 
importScriptPage('MediaWiki:ChatAnnouncements/code.js', 'dev');
 
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:GiveChatMod/code.js',
        'u:dev:!ban/code.js', /*Ban*/
        'u:dev:ChatMessageWallCount/code.js',
        'u:dev:ChatSendButton.js', /*Chat Send Button */
        'u:dev:MediaWiki:!kick/code.js', /* Kick */
        'u:dev:ChatStatus/code.js',
        'u:dev:IsTyping/code.js', /* Typing indicator similar to Discord */
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:Day/Night_chat/code.js',
        'u:dev:MediaWiki:PingEveryone/code.js', /* Ping everyone */
    ]
});