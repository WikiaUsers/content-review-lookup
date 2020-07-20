// credits to Runescape Wiki
var chatTopic = 'Bienvenido al Especial:Chat del Wiki de Monster Hunter.<br /><a href="/wiki/Ayuda:Reglas del Chat" target="_blank" title="Ayuda:Reglas del chat" style="position:relative;text-decoration:underline;">Ayuda:Reglas del chat</a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons" style="position:relative;text-decoration:underline;">Emoticonos</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:140px;">'+chatTopic+'</div>')
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
	importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
}
// ****************
// END Chat options import
// ****************