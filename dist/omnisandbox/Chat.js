/* To create in line alerts for use by chat moderators and admins */
importScript('MediaWiki:Chat.js/announce.js');

//Chat Header Script by Gamedezyner | Free to use across Wikia as long as credit is given
//Customize the font color here
var ctcolor = '#83839C';
//Import latest code version
importScriptURI("https://raw.github.com/GameDezyner/ChatTopic/master/chattopic.js");
//End Chat Header Script


// Chat options 
// Written by Callofduty4 and Madnessfan34537
importScriptPage("MediaWiki:Chat.js/Options.js");
 
// END Chat options



/* DISABLE CHAT HACKS FOR TESTING
// Chat Hacks
importScriptPage('MediaWiki:ChatHacks.js'); 
// End Chat Hacks

// Multi User PMs
importScriptPage('MediaWiki:ChatPMs.js'); 
// End Multi User PMs

$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
//Chat buttons
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;position:absolute;top:0px;right:260px;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').appendTo('#ChatHeader');
   }
}
function addAfkText(){
   if ($('.afkText').length <= 0) {
      var afkText = document.createElement('span');
      $('<div class="afkText" onclick="toggleAway()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;position:absolute;top:0px;right:355px;" align="center"><a class="afkButton wikia-button">Toggle Away</a></div>').appendTo('#ChatHeader');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
} 
window.onload=addClearChatText();
window.onload=addAfkText();
 
//END Clear chat button
*/