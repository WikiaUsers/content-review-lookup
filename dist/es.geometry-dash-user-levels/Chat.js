importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:ChatSendButton.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:FaviconNotifier/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:IsTyping/code.js'
    ]
});

importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev');
importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev')
importScriptPage('MediaWiki:ChatNotifications/code.js' , 'dev');
var chatags = { images: true, videos: true };

var PrivateMessageAlert = {
    beepSound: 'http://soundbible.com/grab.php?id=1645&type=mp3',
//  beepSound: ['http://soundbible.com/grab.php?id=1645&type=mp3', 'http://soundbible.com/grab.php?id=1815&type=mp3'],
    message: '$1 te envió un mensaje!',
    notifications: true,
    alertWhileFocused: true
};

importArticles({
    type: "script",
    articles: [
        // Other scripts...
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        // ...
    ]
});
 
 importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:NewMessageCount.js'
    ]
});
 
$(document).ready(function() {
    var regexp = new Array();
        regexp[0] = new RegExp("special:(chat|logout)", "gi");
 
 
    $('[name="message"]').keypress(function (e) {
        if (e.which == 13) {
            for (var i = 0; i < regexp.length; i++) {
                this.value = this.value.replace(regexp[i], "");
            }
        }
    });
});
 
  NodeChatDiscussion.prototype.randomJoin = function (chat) { 
    if(mainRoom.isInitialized && chat.attributes.name != wgUserName && chat.attributes.isInlineAlert) {
      if (chat.attributes.text.indexOf("has joined") != -1) {
         var joiningUser = chat.attributes.text.substr(0, chat.attributes.text.indexOf(" ha entrado al chat"));
 
         joinMessages = new Array(""+joiningUser+" entró a Grilby's");
 
         $("#entry-"+chat.cid).text(joinMessages[Math.floor((Math.random()*joinMessages.length))]);
      }
      if (chat.attributes.text.indexOf("ha salido del chat") != -1) {
         var partingUser = chat.attributes.text.substr(0, chat.attributes.text.indexOf(" ha salido del chat"));
 
         partingMenssages = new Array(""+partingUser+" se fue de Grilby's");
 
         $("#entry-"+chat.cid).text(partMessages[Math.floor((Math.random()*partMessages.length))]);
      }
    }
  }
  mainRoom.model.chats.bind('add', $.proxy(mainRoom.viewDiscussion.randomJoin, mainRoom.viewDiscussion));