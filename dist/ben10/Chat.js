// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Ben 10 Planet chat. Rules, requirements and more information can be found <a href="/wiki/Ben 10 Planet:Chat Policy" target="_blank" title="Ben 10 Planet:Chat Policy"><u>here</u></a>. FAQs <a href="/wiki/Ben 10 Planet:Chat Policy/FAQ" target="_blank" title="Chat Guidelines"><u>here</u></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color: #008B00">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

importScriptPage('MediaWiki:ChatEditRestriction.js');
}

importScriptPage('ChatOptions/code.js', 'dev');