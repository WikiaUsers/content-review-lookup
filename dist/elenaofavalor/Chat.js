
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

window.ChatStatus = {
	statuses: {
		afk: "Visiting Avalor",
		edit: "Editing",
		food: "Eating Avaloran cuisine",
		game: "Gaming",
		tv: "Watching TV",
	},
	debug: false
};
importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js"
	]
});

importScriptPage('MediaWiki:Day/Night chat/code.js', 'dev');
//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
//
//Color scheme for DAY Chat
//
//Link color
var linkColorDay = '##e70080';
 
//All text Color
var textColorDay = 'Black';
 
//Self text background color
var selfTextColorDay = '#CCCCCC';
 
//Chat background color
var backgroundColorDay = '#ff4fba';
 
//Chat foreground color
var foregroundColorDay = '#E0E0E0';
 
//User stats foreground color
var userStatsColorDay = 'Silver';
 
//END DAY Chat color scheme
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#df007c';
 
  //All text Color
    var textColor = '#e3da02';
 
  //Self text background color
    var selfTextColor = 'e3da02';
 
  //Chat background color
    var backgroundColor = '#000080';
 
  //Chat foreground color
    var foregroundColor = '#0343cc';
 
  //User stats foreground color
    var userStatsColor = 'Silver';
 
//END NIGHT Chat color scheme
 
//Clear chat button
function addClearChatText() {
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
    }
}
 
function clearChat() {
    chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}
 
window.onload = addClearChatText();
 
//END Clear chat button

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importScriptPage('ChatImages/code.js', 'dev');
importScriptPage('ChatNotifications/code.js', 'dev');
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );