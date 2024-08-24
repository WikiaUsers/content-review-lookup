/* Cabe�alho do Chat */
var chatTopic = 'Voc� est� logado na UnderNet!<br /><a href="/wiki/Undertale_Wiki:Pol�tica_do_Chat" target="_blank" title="Undertale Wiki:Pol�tica do Chat" style="position:relative;text-decoration:underline;">Pol�tica do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* O c�digo a seguir � creditado ao usu�rio BlackZetsu */
/* Censura no Chat */
importArticles(  
    { type: 'script', 
    articles: [ "u:blackzetsu:WordFilter/code.js" ] 
    } );

/* Tags no Chat */
/* A primeira linha se refere ao c�digo de visualiza��o de imagens e v�deos no Chat; por�m, � COMPLETAMENTE SEPARADA da segunda. A primeira n�o funciona sem a segunda, mas a segunda funciona PERFEITAMENTE sem a primeira */
var chatags = { images: true, videos: true };
importScriptPage("ChatTags/code.js", "dev");

/* Op��es no Chat */
importScriptPage('ChatOptions/code.js', 'dev');