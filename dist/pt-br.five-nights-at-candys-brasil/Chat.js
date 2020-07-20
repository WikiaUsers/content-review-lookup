//tem um nomezinho aqui né? \' para evitar que isso quebre.
var chatTopic = '<a href="/wiki/Regras" target="_blank" title="Five Nights at Candy\'s Wiki Brasil:Regras" style="position:relative;text-decoration:underline;">Regras</a><br /><a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons" style="position:relative;text-decoration:underline;">Emoticons</a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 

importScriptPage("ChatTags/code.js", "dev");
 
importScriptPage('ChatOptions/code.js', 'dev');
 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
var chatags = { images: true, videos: true };