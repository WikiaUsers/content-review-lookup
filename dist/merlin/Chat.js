//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Merlin Wiki\'s chat. <br /> Click <a href="/wiki/Community/Emoticons" target="_blank" title="Emoticons">here</a> to see chat emoticons'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:90%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// END Chat topic

// Chat options 
// Written by Callofduty4 and Madnessfan34537, modified by Fang³ for use on Merlin //Wiki
importScriptPage('MediaWiki:Chat.js/options.js','fang');
// END Chat options

mainRoom.socket.bind('chat:add', function() {
	var beep = document.createElement('audio');
	beep.src = 
	beep.play();
});