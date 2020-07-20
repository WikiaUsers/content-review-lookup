// IMPORTANDO SCRIPT:
importArticles({
  type: "script",
  articles: [
    // Ajack Emoticons
    'u:dev:AjaxEmoticons/code.js',
    // Notificar a los mods usando !mods
    'u:dev:MediaWiki:!mods/code.js',
    // Botón de enviar
    'u:dev:ChatSendButton.js',
    // Contador de mensajes
    'u:dev:NewMessageCount.js',
    // Alerta del MP
    'u:dev:MediaWiki:PrivateMessageAlert/code.js',
    // Estados del usuario
    'u:dev:MediaWiki:ChatStatus/es/code.js',
    // Ignorar
    'u:dev:MediaWiki:ChatIgnoreUser/es/code.js',
    // ChatPing
    'u:dev:MediaWiki:CustomChatPings/code.js',
    // Anuncios "/announce {acción}"
    'u:dev:ChatAnnouncements/code.js',
    // Chat-Tags
    'MediaWiki:Chat.js/ChatTags.js',
    // Menu de navegación (Dropdown)
    'MediaWiki:Chat.js/Dropdown.js'
  ]
});
 
// Título del chat
 
document.title = "¡Chat Otaku! - Manganime Fanon Wiki";
 
// Otros
 
var chatags = {
  images: true,
  videos: true
};
chatAnnouncementsAll = true;
 
// ESTADOS
 
window.ChatStatus = {
  statuses: {
    homo: "Ocupado",
    edit: "Editando",
    food: "Comiendo",
    afk: "Escuchando música",
    tv: "Viendo anime/vídeos",
    game: "Jugando",
    cake: "Observando",
    book: "Leyendo",
    google: "Dibujando",
    code: "Programando",
    notsoos: "No molestar",
    ufo: "AFK/Error 404 Not Found",
  },
  debug: false
};
 
// Alerta del MP - Sonido
 
var PrivateMessageAlert = {
  beepSound: 'https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg',
  message: '$1 envió un mensaje',
  notifications: true,
  alertWhileFocused: true
};
 
// Modulo (Lista de Conectados) - Mostrar/Ocultar (Undertale Wiki Ingles)
 
$('<p class="private" style="display:block" id="collapseUsersMain">Miembros [<a href="#" id="collapseUsersLink">mostrar/ocultar</a>]</p>').insertAfter($("#Rail .public.wordmark").last());
$('#collapseUsersLink').click(function() {
  $("#WikiChatList").slideToggle();
});