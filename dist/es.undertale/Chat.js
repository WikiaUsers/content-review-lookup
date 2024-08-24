/***Sonidito del MP***/ 
var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/historiasdetugusto/images/4/4e/Msn.ogg/revision/latest?cb=20170316203021&path-prefix=es',
    message: '$1 envió un mensaje!',
    notifications: true,
    alertWhileFocused: true
};
/***********************/
/************!mods!*************/
window.ModPing = "https://vignette.wikia.nocookie.net/undertale/images/b/b0/%21mods.ogg/revision/latest?cb=20170407122001&path-prefix=es";
/*************************/
var chatags = { images: true, videos: true };
// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '¡Bienvenido al chat de Wiki Undertale!. Lee las <a href="Wikia_Undertale:Reglas" target="_blank">Reglas</a><br> para evitar problemas. Si ves a un usuario haciendo vandalismo, por favor, repórtalo a los <a href="Wikia_Undertale:MARB%27s" target="_blank">MARBs</a><br>.';
 
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:White;font-weight:bold;font-family:Candara;line-height:1.6;text-align:center;">' + chatTopic + '</div>')
        .find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
/*Importes*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:ChatOptions/code.js', 
        'u:dev:ChatTags/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:ChatButtonsCollection.js',
        'u:dev:MediaWiki:!mods/code.js'
        ]
});