window.alertMessage = 'MESSAGETOSHOWWHENBADWORDFOUND';
window.badWords = ['BADWORD', 'ANOTHERBADWORD']; // add bad words to pre-generated list

importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:AjaxEmoticons/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:ChatBanMessage/code.js',
        'u:dev:ChatBinaryButton2.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:ChatDelay/code.js',
        'u:dev:ChatEditTools/code.2.js',
        'u:dev:ChatHacks.js',
        'u:dev:ChatImages/code.js',
        'u:dev:ChatInterwikiLinks/code.js',
        'u:dev:ChatMessageWallCount/code.js',
        'u:dev:ChatModHover/code.js',
        'u:dev:ChatNotifications/code.js',
        'u:dev:ChatObject/code.js',
        'u:dev:ChatOptions.js',
        'u:dev:ChatRefresh/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:ChatTimestamps/code.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:CustomChatPings/code.js',
        'u:dev:CustomModIcons.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:FandomizedChat/code.2.js',
        'u:dev:FaviconNotifier/code.js',
        'u:dev:FixAdminKick/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:dev:IsTyping/code.js',
        'u:dev:Jumbles/startup.js',
        'u:dev:NewMessageCount.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:SpellingBee/startup.js',
        'u:dev:Tictactoe/code.js',
        'u:dev:TitleNotifications.js',
        'u:dev:WordFilter/code.js',

        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});