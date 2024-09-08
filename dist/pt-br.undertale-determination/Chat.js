/* Cabeçalho do Chat */
var chatTopic = 'Você está logado na UnderNet!<br /><a href="/wiki/Undertale_Wiki:Política_do_Chat" target="_blank" title="Undertale Wiki:Política do Chat" style="position:relative;text-decoration:underline;">Política do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* O código a seguir é creditado ao usuário BlackZetsu */
/* Censura no Chat */
importArticles(  
    { type: 'script', 
    articles: [ "u:blackzetsu:WordFilter/code.js" ] 
    } );

/* Tags no Chat */
/* A primeira linha se refere ao código de visualização de imagens e vídeos no Chat; porém, é COMPLETAMENTE SEPARADA da segunda. A primeira não funciona sem a segunda, mas a segunda funciona PERFEITAMENTE sem a primeira */
var chatags = { images: true, videos: true };
importScriptPage("ChatTags/code.js", "dev");

/* Opções no Chat */
importScriptPage('ChatOptions/code.js', 'dev');