//Cabe�alho do chat. Cr�ditos � Universo Ben 10. Lembre-se de escapar simples cita��es no cabe�alho usando \' para evitar que isso quebre.
var chatTopic = '<a href="/wiki/Sonic_Boom_Wiki_BR:Regras_do_Chat" target="_blank" title="Sonic Boom Wiki BR:Regras do Chat" style="position:relative;text-decoration:underline;">Regras</a><br /><a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons" style="position:relative;text-decoration:underline;">Emoticons</a>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
/* C�digos do Chat */
importArticles( {
    type: 'script',
    articles: [
        "u:blackzetsu:WordFilter/code.js",
        "MediaWiki:Chat.js/Usu�rios.js",
        "MediaWiki:Chat.js/ChatTags.js",
        "Usu�rio:BlackZetsu/Comandos_do_Chat.js",
        "MediaWiki:Chat.js/ChatOptions.js"
    ]
} );
 
/* chattags */
importScriptPage('ChatTags/code.js', 'dev');