importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js', /*Ban*/
        'u:dev:!kick/code.js', /* Kick */
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatMessageWallCount/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatSendButton.js', /*Chat Send Button */
        'u:dev:ChatStatus/code.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:Day/Night_chat/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:IsTyping/code.js', /* Typing indicator similar to Discord */
        'u:dev:MessageBlocker/code.js',
        'u:dev:PingEveryone/code.js', /* Ping everyone */
    ]
});
 
window.chatAnnouncementsAnonymous = true; /* Chat announcements */
window.chatAnnouncementsAll = true;
window.ChatStatus = {
    statuses: {
        afk: "AFK",
        edit: "Editing",
        food: "Eating",
        game: "Gaming"
    },
    debug: false 
};

window.pingEveryone = {
    modsOnly: true, // So only moderators can use the ping
    color: '#940000', // The background color of the message that pinged everyone, default is yellow
    phrase: 'phrase', // The phrase to use that will ping everyone, default is @everyone
};