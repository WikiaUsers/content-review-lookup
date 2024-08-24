/* Cabe�alho */
var chatTopic = 'Bem-vindo ao Chat da FNaF Wiki.<br /><a href="/wiki/Five_Nights_at_Freddy%27s_Wiki:Pol�tica_do_Chat" target="_blank" title="Pol�tica do Chat" style="position:relative;text-decoration:underline;">Pol�tica do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()



/* Configura��s do Private Message */
var PrivateMessageAlert = {
    beepSound: 'http://soundbible.com/grab.php?id=1645&type=mp3',
    message: 'Voc� recebeu uma mensagem de $1!',
    notifications: true,
    alertWhileFocused: true
};



/* Bot�o Options */ 
/* Aba de Emoticons */ 
/* Alerta de Mensagens Privadas */ 
/* ChatHacks */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});