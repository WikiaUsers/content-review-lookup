// ChatTags
window.chatags = {
    images: true,
    videos: true
};

// ChatAnnouncements
window.chatAnnouncementsAnonymous = true;

// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAwayButton/code.js',
        'u:dev:ChatLinkPreview.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:EmoticonsWindow/code.js',
        'u:dev:FixChatEscaping.js',
        'u:dev:FixChatWhitespace.js',
        'u:dev:IsTyping.js',
        'u:dev:NewMessageCount.js',
        'u:dev:Pings.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:kocka:CustomUndoLink.js',
        'u:shining-armor:ChatTags/code.js',
        'u:electroboom:ChatTagsLink.js',
    ]
});