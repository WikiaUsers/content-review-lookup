// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF">Welcome to COMMS - USSR Naval Fleet Communications.<br /> All personnel should revise standardized <a href="/wiki/USSR_Wiki:Chat_Policy" target="_blank" title="USSR:Chat Policy"><u>protocol</u></a> while utilising the system.</font>'
 
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
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
 
// ****************
// END Chat options import
// ****************

/*Mark admins*/
// Written by administrators of the Runescape wiki, who also kindly gave permission for use. 
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match((/Pvt.Ed|Лорд-Эдвард-Гром-брюки|SWATminifigGUY|TheUltimateH4M|Vidmas7er/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000)