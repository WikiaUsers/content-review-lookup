//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the ChatterNet. All users are instructed to read the  <a href="/wiki/Halo_Hub:Chat" target="_blank" title="Halo Hub:Chat"><u>Chatter Protocol Authority</u></a> before using.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// END Chat topic

// Chat options 
// Written by Callofduty4 and Madnessfan34537
importScriptPage('MediaWiki:Chat.js/options.js','cod');
 
// END Chat options