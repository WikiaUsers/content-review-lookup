// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#000000">Welcome to the Equestria Girls Wiki Chat! Users are invited to take part in the discussion concerning chat <a href="/wiki/Forum:Chat_discussion" target="_blank">here.</a></font>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#BC44C9; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

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