importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
    ]
});

importScriptPage('ChatTags/code.js', 'dev');


 


// Custom inline alerts
function inlineAlert(msg) {
  mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
  $('[name="message"]').val('').removeAttr('disabled').focus();  
}

// KockaEmoticons help text change
window.kockaEmoticons = {
    help: 'Choose an emoticon by clicking on it. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list</a>.'
};
 
// Function for message input
$('[name="message"]').keypress(function(e) {
  if (e.which == 13) {
 
    var message = this.value;
 
    // Stop posting of whitespace
    if (!message.trim()) {
      e.preventDefault();
      $('[name="message"]').val('').removeAttr('disabled').focus();  
    }
 
    //Prevent other wiki chats being linked in main chat
    if (message.match(/Special:Chat/i) && mainRoom.active === true) {
      e.preventDefault();
      inlineAlert('You cannot post other wiki chats in the main chat.');
    }
 
  }
});

//Add it´s typping message
importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});

 

 
//Estados del chat
window.ChatStatus = {
	statuses: {
		afk: "Escribiendo Fanfics",
		dev: "Programando",
		homo: "Ocupado",
		edit: "Editando",
		food: "Comiendo",
		cake: "Tomando un bocadillo",
		tv: "Viendo TV",
		game: "Jugando",
		code: "Viendo vídeos",
		google: "Escuchando música",
		book: "Leyendo",
		Writing:"Estudiando (?)",
	},
	debug: false
};
 
//Ajustes de la Alerta de MP
var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/freddy-fazbears-pizza/images/5/57/Cool_Notification_2-608847.ogg/revision/latest?cb=20161013204746&path-prefix=es',
    message: `$1" te ha enviado un MP!"`,
    notifications: true,
    alertWhileFocused: true
};
 
// ImportArticles (Importador de Scripts)
importArticles({
    type: 'script',
    articles: [
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:ChatButtonsCollectionDeluxe.js',
    ]
});
 
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev'); chatAnnouncementsAll = true;

///Notificaciones del chat

importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:TitleNotifications.js'
]});