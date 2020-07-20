function timeStamp_NotificationIcon_js() {
   return "2014.05.22 12:45 (UTC-7)";
}
 
function addNotificationIcon() {
   var elem = $('div.notification-template').get(0);
 
   if (typeof elem === 'undefined')
      return;
 
   // Relocate it and make it appear 
   var btn = $('a.wikia-button.comments.secondary').get(0);
 
   if (typeof btn !== 'undefined') {
      btn.parentNode.insertBefore(elem, btn.nextSibling);
      elem.addClassName('notification-template-inline-alt');
   }
   else {
      btn = $('#WikiaMainContentContainer .wikia-menu-button').get(0);
      btn.parentNode.insertBefore(elem, btn.nextSibling);
      elem.addClassName('notification-template-inline-alt');
   }
}
 
addOnloadHook(addNotificationIcon);