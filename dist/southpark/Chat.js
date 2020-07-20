// Additional buttons
function addButtons(){
   if ($('.clearChatText').length == 0) {
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto 0px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear Your Window</a></div> <div class="afkButton" onclick="toggleAway()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; -khtml-user-select: none; user-select: none;" align="center"><a class="afkButton wikia-button">Set Away</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}

// Taken from Monchoman45's Chat Hacks
function toggleAway(msg) {
	if(!msg) {var msg = '';}
	if($('#ChatHeader .User').hasClass('away') == true) {
		mainRoom.setBack();
	}
	else {
		mainRoom.setAway(msg);
	}
}
 
window.onload=addButtons();

//New Chat Options 2016//
importScriptPage('ChatOptions/code.js', 'dev')

// WARNING: For normal displaying use fullscreen editor
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ChatAnnouncements/code.js",
        "u:shining-armor:MediaWiki:ChatTags/code.js",
        "u:kocka:MediaWiki:Emoticons.js"
    ]
});
 
 
 
importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
 
        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:!kick/code.js'
    ]
});

/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}