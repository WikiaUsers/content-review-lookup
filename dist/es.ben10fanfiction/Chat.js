// Importación de Script
importArticles( {
    type: 'script',
    articles: [
    'u:dev:MediaWiki:ChatStatus/code.js',
    'u:dev:AjaxEmoticons/code.js',
    'u:dev:ChatAnnouncements/code.js',
    'u:dev:ChatDelay/code.js',
    'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
    'u:dev:ChatOptions/code.js',
    'u:dev:MediaWiki:GiveChatMod/code.js', 
    'u:dev:MediaWiki:CustomChatPings/code.js', 
    'u:dev:MediaWiki:PrivateMessageAlert/code.js',
    'u:dev:MediaWiki:IsTyping.js',
    'u:dev:MediaWiki:FaviconNotifier/code.js',
    'u:dev:MediaWiki:CustomModIcons.js',
    'u:dev:MediaWiki:FixAdminKick/code.js',
    'u:dev:ChatSendButton.js',
    'u:dev:MediaWiki:WordFilter/code.js',
    'u:dev:NewMessageCount.js'
    ]
});

// Estados
 
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

// Título del chat
 
document.title = "Chat - Ben 10 Fan Fiction Wiki";
 
// Textarea
var inn = document.querySelector('.Write [name="message"]');
  // Add placeholder
  inn.placeholder = '¿En qué estás pensando?';

//Filtro de Palabras Malsonantes

window.WordFilter = $.extend(window.WordFilter, {
    alert: 'Has insertado una palabra malsonante, ¿seguro que quieres enviar este mensaje?',
    badWords: ['puto', 'pvto', 'pvt0', 'mierda', 'puta', 'pvta', 'pvt4', 'maldito', 'maldita', 'perra', 'm4ldito', 'm4ldita', 'm4ldit4', 'm43rda', 'boludo', 'cagado', 'cagao', 'culicagado', 'culicagao', 'chupapenes', 'conchetumadre', 'conchetumare', 'pelotudo', 'pendejo', 'polla', 'coño', 'pajuo', 'ladilla', 'joputa', 'jueputa', 'hijueputa', 'chupapijas']
});