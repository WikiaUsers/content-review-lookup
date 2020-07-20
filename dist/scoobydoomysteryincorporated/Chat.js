/* Clear */
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear window</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
 
/* Images */
var chatags = { images: true, videos: true };

// Imports
importArticles({
	type: "script",
	articles: [
	    'u:dev:MediaWiki:ChatImages/code.js',
	    'u:dev:MediaWiki:ChatOptions/code.js',
	    'u:dev:MediaWiki:ChatReload/code.js',
	    'u:dev:MediaWiki:ChatSendButton.js',
	    'u:dev:MediaWiki:ChatUserPageButton.js',
	    'u:dev:MediaWiki:IsTyping.js',
	]
});