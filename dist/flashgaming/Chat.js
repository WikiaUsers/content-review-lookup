// Configurations

//chatAnnouncementsAll = true;
chatAnnouncementsAnonymous = true;
var chatags = { images: true/*, videos: true */};
window.chatReloadTime = 7000;
window.ChatHacksPingSound = 'https://www.youtube.com/watch?v=sjcomokUNN4';
chatBlockReason = "Terms of Use violation";
chatBlockExpiry = "2 months";

window.chatBanMessage = {
     // The title of the message
    title: "You've been banned from chat",
    // Body of the message, '$1' is the expiry of the ban and '$2' is the reason for the ban
    body: "You have been banned from the chatroom for the following reason: $2. The ban's expiry / duration has been set to $1. If you believe you have been unrightfully banned, should be unbanned early (if the ban duration is finite) or should be given another chance, please contact a Chat Moderator, Discussions Moderator or Admin."
};

// Imports

importArticles({
    type: 'script',
    articles: [
        //'u:dev:ChatHacks.js',
        "u:dev:ChatMessageWallCount/code.js",
        'u:dev:ChatObject/code.js',
        //'u:dev:ChatOptions/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:MediaWiki:ChatBanMessage/code.js',
        'u:dev:ChatTimestamps/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js'
    ]
});