// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF">Welcome to The Coca-Cola Wiki Chat, Be nice, be civil, and HAVE FUN!</font>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// END Chat topic

// Chat options 
// Written by Callofduty4 and Madnessfan34537
importScriptPage('MediaWiki:Chat.js/options.js','cod');

// END Chat options