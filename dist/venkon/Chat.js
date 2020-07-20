window.ChatStatus = {
    statuses: {
        afk: "At war",
        edit: "Editing",
        food: "Eating",
        tv: "On break",
        game: "Gaming"
    },
    debug: false
};

$('.User').first().attr('data-user', mw.config.get('wgUserName'));
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatLinkPreview.js',
        'u:dev:ChatLogger.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods.js',
        'u:dev:AjaxEmoticons.js',
        'u:dev:BlinkingTabAlert.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:CustomChatPings/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:MessageBlocker/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:PingEveryone/code.js',
        'u:dev:IsTyping/code.js',
        'u:shining-armor:ChatTags/code.js',
        'u:dev:ChatBlockButton/code.2.js',
    ]
});

window.chatBanMessage = {
    title: 'Chat Ban', // The title of the message
    body: 'You have been banned from the chat. The ban will expire in $1, and the reason for your ban is $2' // Body of the message, '$1' is the expiry of the ban and '$2' is the reason for the ban
};