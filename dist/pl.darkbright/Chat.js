importScriptPage('User:Wedkarski/chatpack.js', 'wedkarski');
//Topic z FNaF wiki
var chatTopic = 'Lista emotek <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotki">tutaj</a><br> Regulamin <a href="/wiki/Project:Regulamin" target="_blank" title="Regulamin">tutaj</a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:Right; position:absolute; width:60%; z-index:0; font-size: 13px; color:whitesmoke; font-weight:bold; line-height:1.6; margin-left:80px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();