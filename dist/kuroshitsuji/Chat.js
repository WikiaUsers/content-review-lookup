// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Kuroshitsuji chat. Rules and more information can be found <a href="http://kuroshitsuji.wikia.com/wiki/Kuroshitsuji_Wiki:Chat_Policy"><u>here</u></a>.'
 
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

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');