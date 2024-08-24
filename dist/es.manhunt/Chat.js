//Tags de imagen y de YouTube
window.chatTagsEnable = ['img', 'yt'];
 
importScriptPage('ChatTags/code.js', 'dev');
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js', 
        'u:dev:ChatTags/code.js',
        'u:dev:NewMessageCount.js',
        ]
 });
 
var chatags = { images: true, videos: true };
 
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
         var joiningUser = chat.attributes.text.substr(0, chat.attributes.text.indexOf(" ha ingresado al chat"));
 
         joinMessages = new Array(""+joiningUser+" ingresó a la masacre.");
 
         $("#entry-"+chat.cid).text(joinMessages[Math.floor((Math.random()*joinMessages.length))]);
      }
      if (chat.attributes.text.indexOf("ha salido del chat") != -1) {
         var partingUser = chat.attributes.text.substr(0, chat.attributes.text.indexOf(" ha salido del chat"));
 
         partingMenssages = new Array(""+partingUser+" se fue de la masacre");
 
         $("#entry-"+chat.cid).text(partMessages[Math.floor((Math.random()*partMessages.length))]);
      }
    }
  }
  mainRoom.model.chats.bind('add', $.proxy(mainRoom.viewDiscussion.randomJoin, mainRoom.viewDiscussion));