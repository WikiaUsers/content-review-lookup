// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF">Welcome to the RWBY Wiki Chat! Enjoy our new chat background for the "Summer of Yang" theme!<br/><a href="/wiki/RWBY_Wiki:Chat_Policies" target="_blank" title="RWBY Wiki:Chat Policies"><u>Chat Policies</u></a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons"><u>Emoticons</u></a> • <a href="/wiki/RWBY_Wiki:User_Rights_Nominations" target="_blank" title="RWBY_Wiki:User_Rights_Nominations"><u>Nominations</u></a></font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('ChatOptions/code.js','dev');
}