importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev');
/* Chat Skins - Credit for the original ChatSkin code and /fall goes to Seaside98 and /winter to Nxtstep101 */
importScriptPage('MediaWiki:ChatSkins.js','klintran');

/* postMessage function - an API for developers. Allows accounts to easily send automated messages via JavaScript.*/
function postMessage(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:text}).xport());
  }
}
 
/* adminHide function - an API for developers. Allows for hiding bots in chat.*/
function adminHide(text,image) {
  $('.inline-alert:contains('+AndroidBot+'),#WikiChatList li[data-user='+AndroidBot+']').remove();
  $('div.chat-whos-here > img[src='+image+']').remove();
}
//****** You would need to call this every time a user joined chat. It is possible that the chat list refreshes periodically, so that could mess you up too. ~Sea
 
/* inlineAlert function - an API for developers. Allows to for sending an inline alert in chat. */
function inlineAlert(text) {
  if(wgCanonicalSpecialPageName == 'Chat') {
    mainRoom.model.chats.add(new models.InlineAlert( {text:(text)} ));
  }
}