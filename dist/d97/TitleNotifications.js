// Title notifications -- credit to Rose (Incongruence)
 
old = document.title;
unread = 0;
var beep = new Audio('https://vignette.wikia.nocookie.net/d97/images/6/66/Beep.ogg/revision/latest?cb=20170320195135');
 
if(typeof titleNotificationLoaded === 'undefined'){
mainRoom.model.chats.bind("afteradd", function() {
  titleNotificationLoaded = true;
  messageContents = JLAPI.mostRecentMessage.message();
  if(!document.hasFocus() && messageContents.indexOf("!ChatGame") == -1){
     //beep.play();
     unread++;
     document.title = "(" + unread + ") " + old;
  }
});
}
 
window.onfocus = function() {
  document.title = old;
  unread = 0;
};