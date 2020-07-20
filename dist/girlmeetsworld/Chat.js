// Implements an edit restriction for the chat
// Credit to Sonic News Network and Foodbandlt 
importScriptPage('MediaWiki:ChatEditRestriction.js');
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Matthews\' house!';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove();
}
 
window.onload=addClearChatText();

//Clear chat button

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

//Send button

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatSendButton.js'
    ]
});

//Private message alert

importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');

//Window for emoticons

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});

//Quick moderator tools

importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:QuickModTools/code.js"
	]
});

//Chat timestamps

importScriptPage('ChatTimestamps/code.js','dev

//Chat announcements

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

//Game: Jumbles

importArticles( {
    type: 'script',
    articles: [
        "u:dev:MediaWiki:Jumbles/startup.js"
    ]
} );

//Game: SpellingBee

importArticles( {
    type: 'script',
    articles: [
        "u:dev:SpellingBee/startup.js"
    ]
} );

//Word filter

alertMessage = 'MESSAGETOSHOWWHENBADWORDFOUND';
window.badWords = ['BADWORD', 'ANOTHERBADWORD']; // add bad words to pre-generated list
importScriptPage('MediaWiki:WordFilter/code.js','dev');