// ******
// Header
// ******
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to Runescape Wiki
 
var chatTopic = '<a href="/wiki/Re:Monster Wiki:Chat" target="_blank" title="Project:Chat"><br /><u>Chat Rules</u></a> - <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>Emotes</u></a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:right; position:absolute; width:60%; z-index:0; font-size: 12px; color:lightcoral; font-weight:bold; line-height:1.6; margin-left:60px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// **********
// END Header
// **********

importScript('MediaWiki:ChatHacks.js');