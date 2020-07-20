/* if(wgUserGroups.includes("sysop")) {
    mainRoom.userMain.attributes.canPromoteModerator = true; //Allows SYSOPS to kick & ban users with the chatmoderator or higher role
}*/

window.chatBlockReason = "Blocked via chat block button";
window.chatBlockExpiry = "20 minutes";

/* Chat Options */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		situation: "Solving a situation on Fandom",
		coding: "Coding",
    	game: "Playing video games",
	    brb: "be right back",
	    eating: "Eating",
	    private: "Private messaging",
	    washing: "washing hands",
	    yt: "Youtube",
	     discord: "Chatting on discord",
	    
	},
	debug: true
};

var chatags = {
    images: true,
    videos: true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:Pings.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:NewMessageCount.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:ChatAwayButton/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:RandomBackground/code.js',
        'u:dev:MediaWiki:ChatThemeSwitcher.js',
        
    ]
});