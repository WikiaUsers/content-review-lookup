importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importScriptPage('ChatImages/code.js', 'dev');

/* Cabeçalho */
var chatTopic = 'Bem-vindo(a) <br /><a href="/wiki/Animal_Jam_Wiki:Política_do_Chat" target="_blank" title="Animal Jam Wiki:Política do Chat" style="position:relative;text-decoration:underline;">Política do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Configuraçõs do Private Message - Créditos a Five Nights at Freddy's Wiki */
var PrivateMessageAlert = {
    beepSound: 'http://soundbible.com/grab.php?id=1645&type=mp3',
    message: 'Você recebeu uma mensagem privada de $1!',
    notifications: true,
    alertWhileFocused: true
};

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js',
        // ...
    ]
} );