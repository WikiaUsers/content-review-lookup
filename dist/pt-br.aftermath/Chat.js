//Cabe�alho do chat. Lembre-se de escapar simples cita��es no cabe�alho usando \' para evitar que isso quebre.
var chatTopic = ' OC Wiki Br~~!<br /><a href="/wiki/OC Wiki BR: Pol�tica do Chat" target="_blank" title="OC Wiki BR: Pol�tica do Chat" style="position:relative;text-decoration:underline;">Pol�tica do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Censura no chat, cr�ditos para BlackZetsu, aquele lindo. */ 
importArticles(  
    { type: 'script', 
    articles: [ "u:blackzetsu:WordFilter/code.js" ] 
    } );

importScriptPage("ChatTags/code.js", "dev");
importScriptPage('ChatOptions/code.js', 'dev');