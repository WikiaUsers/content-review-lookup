importScriptPage('User:Gamedezyner/ChatScripts.js');

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking. 

var chatTopic = 'Welcome to chat! Please remember to follow the <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>chat rules</u></a>!'

$(function() {$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>') .find('a').attr('style','position:relative;text-decoration:underline;') })

$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// Additional buttons
 
function addButtons(){
   if ($('.clearChatText').length == 0) {
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto 0px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div> <div class="afkButton" onclick="toggleAway()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; -khtml-user-select: none; user-select: none;" align="center"><a class="afkButton wikia-button">Away from keyboard</a></div>').prependTo('.Rail');
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
 



// ********************************************
// Implement edit restriction on chat feature
// Written by Foodbandlt for Sonic News Network
// ********************************************
importScriptPage('MediaWiki:ChatEditRestriction.js');