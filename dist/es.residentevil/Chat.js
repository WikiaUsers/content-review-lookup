importScriptPage('ChatTags/code.js', 'dev')
var chatags = { images: true, videos: true };
// Credit to Runescape Wiki
 
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
 
// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// ****************
 
/*Mark admins*/
// Written by administrators of the Runescape wiki
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/Crisdelta|Robert S.T.A.R.S|Jeann 23|Super ferleon/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000)