// **********
// Chat topic
// **********
//importScriptURI("https://raw.github.com/sactage/wikia-js-snippets/dev/ChatOptions.js");
$.getScript('https://raw.github.com/sactage/wikia-js-snippets/chatoptions-cleaning/ChatOptions.js');
window.customFonts = ["Times New Roman", "Impact", "Ubuntu Mono"];
// Remember to escape single quotes in the topic using \' to prevent this from breaking.

// Credit to Runescape Wiki

var chatTopic = 'Welcome to the Call of Duty Wiki chat. Rules and more information can be found <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><br /><u>here</u></a>.FAQs <a href="/wiki/Project:Chat/FAQ" target="_blank" title="Chat FAQ"><u>here</u></a>. <a href="http://fire.sactage.com/chat.php" target="_blank" title="Stats"><u>Chat statistics</u></a>. Emotes list <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>here</u></a> <strong>DO NOT POST SPOILERS ABOUT <a href="/wiki/BOII">BOII</a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// **************
// END Chat topic
// **************