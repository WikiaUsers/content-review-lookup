
/* postMessage function - an API for chat developers. Allows accounts to easily send automated messages via JavaScript.*/
function postMessage(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:text}).xport());
  }
}
 
/* sendMessage function - Same function as postMessage, but compatible with PMs - Written by Drew1200. */
function sendMessage(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    $('#Write textarea').val(text);
    var e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $("#Write textarea").trigger(e);
  }
}
 
/* botHide function - an API for chat developers. Allows for hiding bots in chat.*/
function botHide(text,image) {
  $('.inline-alert:contains('+text+'),#WikiChatList li[data-user='+text+']').remove();
  $('div.chat-whos-here > img[src='+image+']').remove();
}
//****** You would need to call this every time a user joined chat. It is possible that the chat list refreshes periodically, so that could mess you up too. ~Sea
 
/* inlineAlert function - an API for chat developers. Allows to for sending an inline alert in chat. */
function inlineAlert(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    mainRoom.model.chats.add(new models.InlineAlert( {text:(text)} ));
  }
}