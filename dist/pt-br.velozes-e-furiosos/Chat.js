/* Todos os códigos bases foram cedidos pela Five Nights at Freddy's Wiki */

/* Cabeçalho */
var chatTopic = 'Bem-vindo ao chat da Velozes e Furiosos Wiki!<br /><a href="/wiki/Velozes_e_Furiosos_Wiki:Regras_do_Chat" target="_blank" title="Velozes e Furiosos Wiki:Regras do Chat" style="position:relative;text-decoration:underline;">Regras do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()



/* Configuraçõs do Private Message */
var PrivateMessageAlert = {
    beepSound: 'http://soundbible.com/grab.php?id=1645&type=mp3',
    message: 'Você recebeu uma mensagem de $1!',
    notifications: true,
    alertWhileFocused: true
};



/* Coleções de Botões de Chat */
/* Aba Options */ 
/* Alerta de Mensagens Privadas */ 
/* Aba de Emoticons */ 
/* ChatHacks */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatButtonsCollection.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});