// Title notifications -- credit to Rose (Incongruence)
 
old = document.title;
unread = 0;
 
if(typeof titleNotificationLoaded === 'undefined'){
mainRoom.model.chats.bind("afteradd", function() {
  titleNotificationLoaded = true;
  messageContents = JLAPI.mostRecentMessage.message();
  if(!document.hasFocus() && messageContents.indexOf("!ChatGame") == -1){
     unread++;
     document.title = "(" + unread + ") " + old;
  }
});
}
 
window.onfocus = function() {
  document.title = old;
  unread = 0;
};