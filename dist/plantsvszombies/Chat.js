var chatags = { videos: true };
 
// Chat Announcements; chat moderators and above 

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:ChatToolbox/code.js',
        'u:dev:MediaWiki:Tictactoe/code.js',
        'u:dev:MediaWiki:SpellingBee/startup.js',
        'u:dev:MediaWiki:Jumbles/startup.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ChatTimestamps/code.js',
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:MediaWiki:ChatCount.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:GiveChatModPrompt/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!block/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:!pm.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:FaviconNotifier/code.js',
        'u:dev:MediaWiki:Tabinsert.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:IsTyping.js',
    ]
});

 window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games",
		study: "Studying",
		zombie: "Fighting zombies"
	},
	debug: true
};
 
/* Day/Night Switch Feature */
function dayNightButton() {
    var dayText = 'Day theme';
    var nightText = 'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}