// Configurations
 
//chatAnnouncementsAll = true;
chatAnnouncementsAnonymous = true;
window.chatReloadTime = 7000;
var chatags = { images: true, videos: true };

// Imports
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        //'u:dev:ChatHacks.js',
        "u:dev:ChatMessageWallCount/code.js",
        //'u:dev:ChatObject/code.js',
        //'u:dev:ChatOptions/code.js', Broken
        'u:dev:ChatReload/code.js',
        'u:dev:ChatSendButton.js',
        'u:shining-armor:ChatTags/code.js',
        'u:dev:ChatTimestamps/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:FixAdminKick/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:MediaWiki:TitleNotifications/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:IsTyping.js',
    ]
});