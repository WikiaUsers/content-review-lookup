//**********
//Chat Topic
//**********
// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Warrior Cats Roleplay Wiki chat. Rules and more information can be found <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>here</u></a>'; 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

//**********
// END Chat topic
//**********
 
// ************
// Chat options import
// ************
 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// ****************