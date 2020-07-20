// ChatAnnouncements
window.chatAnnouncementsAnonymous = true;
 
// ChatBlockButton
window.chatBlockReason = "[[Help:Sockpuppet|Sockpuppet]]";
window.chatBlockExpiry = "infinite";
 
// ChatTags
window.chatags = {
    images: true,
    videos: true
};
 
// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatAwayButton/code.js',
        'u:dev:ChatBlockButton/code.2.js',
        'u:dev:ChatLinkPreview.js',
        'u:dev:ChatSyntaxHighlight.js',
        'u:dev:ChatThemeSwitcher.js',
        'u:dev:ChatUserPageButton.js', 
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:FixChatEscaping.js',
        'u:dev:FixChatWhitespace.js',
        'u:dev:IsTyping.js',
        'u:dev:NewMessageCount.js',
        'u:dev:Pings.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:Tabinsert.js',
        'u:kocka:CustomUndoLink.js',
        'u:shining-armor:ChatTags/code.js',
        'u:electroboom:ChatTagsLink.js',
    ]
});