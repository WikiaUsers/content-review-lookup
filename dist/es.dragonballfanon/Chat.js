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
    // Kickeo a miembros administrativos
    'u:dev:MediaWiki:FixAdminKick/code.js',
    // "Está escribiendo"
    'u:dev:MediaWiki:IsTyping.js'
  ]
});

importArticles({
    type: 'script',
    articles: [
        
    ]
});

// Título del chat

document.title = "Chat Z - Dragon Ball Fanon Wiki";

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
    ufo: "AFK",
  },
  debug: false
};

// Alerta del MP - Sonido

var PrivateMessageAlert = {
  beepSound: 'https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg',
  message: 'Te han enviado un mensaje',
  notifications: true,
  alertWhileFocused: true
};

// Modulo (Lista de Conectados) - Mostrar/Ocultar (Undertale Wiki Ingles)

$('<p class="private" style="display:block" id="collapseUsersMain">Miembros [<a href="#" id="collapseUsersLink">mostrar/ocultar</a>]</p>').insertAfter($("#Rail .public.wordmark").last());
$('#collapseUsersLink').click(function() {
  $("#WikiChatList").slideToggle();
});

// Crear un contador de mensajes y usuarios.
$('.Rail #collapseUsersMain').before('<div class="count"><div id="contador-mensaje"><span class="messages-icon"></span><span class="messages"></span></div>     <div id="contador-usuarios"><span class="users-icon"></span><span class="users"></span></div></div>');

setInterval(function() {
  // Contador de mensajes
  $('.messages').html($('.Chat li .message').length);

  // Contador de usuarios
  $('.users').html($('.WikiChatList li.User:not(.ui-sortable-placeholder)').length);
}, 1);

// Lista de usuarios
$('.WikiChatList').wrap('<div id="WikiChat" />');
$('.PrivateChatList').wrap('<div id="PrivateChat" />');

mw.loader.using('jquery.ui.sortable', function() {
  $('.WikiChatList').sortable({
    revert: true,
    containment: '#WikiChat',
    handle: 'img',
    axis: 'y',
    cursor: 'ns-resize',
    start: function(e, ui) {
      ui.placeholder.height(ui.item.height());
    }
  });

  $('.PrivateChatList').sortable({
    revert: true,
    containment: '#PrivateChat',
    handle: 'img',
    axis: 'y',
    cursor: 'ns-resize',
    start: function(e, ui) {
      ui.placeholder.height(ui.item.height());
    }
  });
});

// Textarea
var inn = document.querySelector('.Write [name="message"]');
  // Add placeholder
  inn.placeholder = '¿En qué estás pensando?';