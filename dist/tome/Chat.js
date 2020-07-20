// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF">Welcome to the <small><strike>White Castle Diner</strike></small> RWBY Wiki Chat<br/><a href="/wiki/RWBY_Wiki:Chat_Policies" target="_blank" title="RWBY Wiki:Chat Policies"><u>Chat Policies</u></a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons"><u>Emoticons</u></a> • <a href="/wiki/Thread:83092" target="_blank" title="Thread:83092"><u>Nomination News</u></a></font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}