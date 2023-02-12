/* <nowiki> */

/**
 * Script for adding "changes since last visit" link to "you have new messages" notification
 * Version 0.2
 * Script by User:Porter21 (http://www.falloutwiki.com)
 */

window.messagingImprovements = function () {
   var changesLabel = 'changes since last visit';
   var userMessageLink = $('.usermessage > a:last');

   // When visiting own talk page, save ID of current revision
   if (mw.config.get('wgNamespaceNumber') == 3 && mw.config.get('wgTitle') == mw.config.get('wgUserName')) {
      $.cookie('va-last-talk-rev', mw.config.get('wgCurRevisionId'), {'expires': 365, 'path': '/'});
   }

   // If "you have new messages" is displayed, add "changes since last visit" link
   if (userMessageLink.length) {
      var userMessageOldID = $.cookie('va-last-talk-rev');

      if (userMessageOldID) {
         userMessageLink.after(' | <a title="' + userMessageLink.attr('title') + '" href="' + userMessageLink.attr('href') + '&oldid=' + userMessageOldID + '">' + changesLabel + '</a>');
      }
   }
}

jQuery(function($) {
   messagingImprovements();
});

/* <nowiki> */