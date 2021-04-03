/* CER */
importScript('MediaWiki:ChatEditRestriction.js')
 
/* Other */
importScriptPage("User:Monchoman45/ChatHacks.js", "c"); 
importScriptPage("User:Madnessfan34537/multikick.js", "cod"); 
$('a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); 
importScriptPage("MediaWiki:Chat.js/multipms.js", "cod");

importScriptPage('ChatOptions/code.js', 'dev');
 
/* Topic */
var chatTopic = 'Welcome to the ever epic PVZGC Chat!'
 
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

importScriptPage('ChatTags/code.js', 'dev');