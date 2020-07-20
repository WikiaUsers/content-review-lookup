
window.chatAnnouncementsAll = true;
window.ChatStatus = {
    statuses: {
        afk: 'On vacation',
        edit: 'Editing',
        food: 'Eating',
        game: 'Gaming'
    },
    debug: false
};

window.IsTyping = {
    doScroll: true
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:BlinkingTabAlert.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatDeveloperTools.js',
        'u:dev:ChatImages/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:Day/Night_chat/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:MediaWiki:ChatModHover/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        
        'u:shining-armor:ChatTags/code.js',
    ]
});