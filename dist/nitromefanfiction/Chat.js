/* Imported from Nitrome wiki */

// Clear chat
function clearChat() {
    $('.Chat li').remove();
}
$('<div class="clear" onclick="clearChat()" style="margin: 10px auto;" align="center"><a class="wikia-button">Clear Chat</a></div>').prependTo('.Rail');
 
/* ChatTags - allows some formatting of text in a chat message */
importScriptPage('ChatTags/code.js', 'dev');
 
/* ChatOptions from Dev Wiki */
importScriptPage('ChatOptions/code.js', 'dev');