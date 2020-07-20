// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatAwayButton/code.js',
        'u:dev:MediaWiki:ChatLinkPreview.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:FixChatEscaping.js',
        'u:dev:MediaWiki:FixChatWhitespace.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:NewMessageCount.js',
        'u:dev:MediaWiki:Pings.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:PingEveryone/code.js',
        'u:dev:MediaWiki:FaviconNotifier/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:QuickModTools/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:LightBlock/code.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:kocka:MediaWiki:CustomUndoLink.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:electroboom:MediaWiki:ChatTagsLink.js',
    ]
});

// ChatTags
window.chatags = {
    images: true,
    videos: true
};
 
// ChatAnnouncements
window.chatAnnouncementsAnonymous = true;

// PingEveryone
window.pingEveryone = {
    modsOnly: false,
    color: 'yellow',
    phrase: 'everyone',
};

// ChatStatus
window.ChatStatus = {
	statuses: {
	    chat: "Chatting",
	    away: "Away",
		surviv: "Playing surviv.io",
		check: "Exploring Wiki",
		edit: "Editing Wiki",
        afk: "Away From Keyboard",
        other: "Doing Other Things",
	},
	debug: false
};