/* Clear chat button */
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
 
/* END Clear chat button */

/* Chat options import
 * Obtained from the Call of Duty Wiki @ w:c:cod
 */
 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
 
/* END Chat options import */