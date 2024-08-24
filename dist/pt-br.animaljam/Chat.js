importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importScriptPage('ChatImages/code.js', 'dev');

/* Cabe�alho */
var chatTopic = 'Bem-vindo(a) <br /><a href="/wiki/Animal_Jam_Wiki:Pol�tica_do_Chat" target="_blank" title="Animal Jam Wiki:Pol�tica do Chat" style="position:relative;text-decoration:underline;">Pol�tica do Chat</a>'
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:whitesmoke;font-weight:bold;line-height:1.6;margin-left:210px;">'+chatTopic+'</div>')
        .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Configura��s do Private Message - Cr�ditos a Five Nights at Freddy's Wiki */
var PrivateMessageAlert = {
    beepSound: 'http://soundbible.com/grab.php?id=1645&type=mp3',
    message: 'Voc� recebeu uma mensagem privada de $1!',
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