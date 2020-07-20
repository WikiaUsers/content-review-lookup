window.chatBanMessage = {
    title: 'Chat Ban', // The title of the message
    body: 'You have been banned from the chat. The ban will expire in $1, and the reason for your ban is $2' // Body of the message, '$1' is the expiry of the ban and '$2' is the reason for the ban
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatBanMessage.js',
    ]
});

// Refresh chat every 5 seconds
window.chatReloadTime = 5000;
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatReload/code.js'
    ]
});
window.WordFilter = $.extend(window.WordFilter, {
    alert: 'Warning',
    badWords: ['test111', 'test222']
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MediaWikiWordFilter/code.js',
    ]
});

//show if someone is typing
window.IsTyping = $.extend(window.IsTyping, {
    mainRoomDisabled: true,
    ignore: ['WikiaBot', 'Dorumin']
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});


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