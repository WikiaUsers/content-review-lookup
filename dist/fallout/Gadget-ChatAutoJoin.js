// <nowiki>
/* Script for automatically opening Special:Chat once per browser session
 * Version 0.1
 * Script by User:Porter21 (http://fallout.wikia.com)
 */

function autoJoinChat() {
   if (document.cookie.indexOf("ranChatAutoJoin=true") == -1) {
      autoOpenedChat = openChatWindow();
      document.cookie = 'ranChatAutoJoin=true; path=/';
   }
}

jQuery(function($) {
   if (skin == 'oasis' || skin == 'wikia') {
      autoJoinChat();
   }
});

// </nowiki>