//Chat documentation of what NOT to do.

importScriptPage('ChatOptions/code.js', 'dev');

$(document).ready(function() {
    var regexp = new Array();
        regexp[0] = new RegExp("special:(chat|logout)", "gi");
        regexp[1] = new RegExp("crap", "gi");
        regexp[2] = new RegExp("shit", "gi");
        regexp[3] = new RegExp("ninny", "gi");
        regexp[4] = new RegExp("bullshit", "gi");
        regexp[5] = new RegExp("fuck", "gi");
        regexp[6] = new RegExp("asshole", "gi");
        regexp[7] = new RegExp("ass", "gi");
        regexp[8] = new RegExp("son of a gun", "gi");
        regexp[9] = new RegExp("bitch", "gi");
        regexp[10] = new RegExp("arse", "gi");
        regexp[11] = new RegExp("fucking", "gi");
        regexp[12] = new RegExp("fatass", "gi");


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
         var joiningUser = chat.attributes.text.substr(0, chat.attributes.text.indexOf(" has joined"));

         joinMessages = new Array("Uh oh, "+joiningUser+" is here", "Let's give "+joiningUser+" a big warm welcome");

         $("#entry-"+chat.cid).text(joinMessages[Math.floor((Math.random()*joinMessages.length))]);
      }
      if (chat.attributes.text.indexOf("has left") != -1) {
         var partingUser = chat.attributes.text.substr(0, chat.attributes.text.indexOf(" has left"));

         partMessages = new Array("+partingUser +" has been burnt to a crisp while fighting the Wither.", ""+partingUser +" fell into a hole!");

         $("#entry-"+chat.cid).text(partMessages[Math.floor((Math.random()*partMessages.length))]);
      }
    }
  }
  mainRoom.model.chats.bind('add', $.proxy(mainRoom.viewDiscussion.randomJoin, mainRoom.viewDiscussion));