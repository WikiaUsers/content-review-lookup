window.chatAnnouncementsAll = true;
window.chatTimestamps24Hour = true;
window.chatTimestampsAPM = true;
window.chatAnnouncementsAnonymous = true;
 
window.ChatStatus = {
    statuses: {
        afk: 'On vacation',
        edit: 'Editing',
        food: 'Eating',
        game: 'Gaming'
    },
    debug: false
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods.js',
        'u:dev:AjaxEmoticons.js',
        'u:dev:BlinkingTabAlert.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatBanMessage.js',
        'u:dev:ChatBlockButton/code.2.js',
        'u:dev:ChatImages/code.js',
        'u:dev:ChatInterwikiLinks/code.js',
        'u:dev:ChatMessageWallCount/code.js',
        'u:dev:ChatModHover/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatThemes/code.js',
        'u:dev:ChatTimestamps/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:FaviconNotifier/code.js',
        'u:dev:FixAdminKick/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:Tictactoe/code.js',
        'u:dev:MediaWiki:ChatDeveloperTools.js',
 
        'u:shining-armor:MediaWiki:ChatTags/code.js',
     ]
});