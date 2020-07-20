$.getScript("https://raw.github.com/sactage/wikia-js-snippets/master/ChatOptions.js"); importScript('MediaWiki:Chat.js/options.js');

var chatTopic = 'Welcome to the M:AA Fanfic chat.<br /><a href="/wiki/Marvel Avengers Alliance Fanfic Universe Wiki:Chat Rules" target="_blank" title="Marvel Avengers Alliance Fanfic Universe Wiki:Chat Rules" style="position:relative;text-decoration:underline;">Chatroom Rules</a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons" style="position:relative;text-decoration:underline;">Emoticons</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:140px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()