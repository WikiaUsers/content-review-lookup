
// Configurations

window.dev = window.dev || {};
window.dev.chatdelay = {
	max: 10,
	mainOnly: false
};

window.ChatHacksPingSound = 'https://www.youtube.com/watch?v=SD-MOxV7KhI';

chatAnnouncementsAll = true;
chatAnnouncementsAnonymous = true;
var chatags = { images: true, videos: true };

// Imports

importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatDelay/code.js',
        'u:dev:ChatEditTools/code.2.js',
        'u:dev:ChatMessageWallCount/code.js',
        //'u:dev:ChatHacks.js',
        'u:dev:ChatSendButton.js',
        //'u:dev:ChatOptions/code.js',
        //'u:dev:ChatStatus/code.js',
        //'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:IsTyping/code.js',
        'u:dev:TitleNotifications.js',
        'u:shining-armor:ChatTags/code.js'
    ]
});