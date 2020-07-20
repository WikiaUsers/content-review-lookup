// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF">Welcome to CrossOverRP! Have fun!</font>'
  
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// END Chat topic


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
	//importScriptPage('Chat/Options.js','scripts');
	importScriptPage('ChatOptions/code.js','dev');
	$('#chatOptionsButton').remove()
	$('#chat-options-button').appendTo("#ChatHeader").css({'right' : '155px', 'bottom' : 0, 'position' : 'absolute', 'cursor' : 'pointer'});
}
 
// ****************
// END Chat options import
// ****************

/*Mark admins*/
// Written by administrators of the Runescape wiki, who also kindly gave permission for use. 
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/Danno-048|Sgt D Grif|Commander Church/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000)