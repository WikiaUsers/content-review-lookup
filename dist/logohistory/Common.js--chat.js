/* Any JavaScript here will be loaded for all users on every page load. */

// Clear chat button

function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      $('<span class="clearChatText" onclick="clearChat()"   style="margin: 10px;"><a class="clearChatButton wikia-button">Clear chat</a></span>').prependTo('.chattopic');
   }
}
 
function clearChat(){
   $('.Chat li').remove()
}
 
window.onload=addClearChatText()

// END Clear chat button