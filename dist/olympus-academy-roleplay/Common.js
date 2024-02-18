// IRClogin div
$(function() {
   var nick;
 
   if ($('#IRClogin').length) {
      if (typeof wgUserName === 'undefined')
         nick = 'wgusername' + Math.floor(Math.random() * 100);
      else
         nick = wgUserName.replace(/ /g, "_");
 
      $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=DARPW&prompt=true" width="660" height="400" style="border:0;"></iframe>');
   }
});
 
// LOCK OLD BLOG POSTS
window.LockOldBlogs = {
   expiryDays: 90,
   expiryMessage: "This blog is an archive, so there's no need to comment.",
   nonexpiryCategory: "Blog Does Not Expire",
};
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
var ajaxRefresh = 20000;
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
function disableOldForumEdit() {
   if (typeof(enableOldForumEdit) !== 'undefined' && enableOldForumEdit)
      return;
 
   if (!document.getElementById('old-forum-warning'))
      return;
 
   if (skin === 'oasis') {
      $('#WikiaPageHeader .wikia-menu-button li a:first').html('Archived').removeAttr('href');
      $('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
         return;
   }
 
   if (!document.getElementById('ca-edit'))
      return;
 
   var editLink = null;
 
   if (skin === 'monaco')
      editLink = document.getElementById('ca-edit');
   else if (skin === 'monobook')
      editLink = document.getElementById('ca-edit').firstChild;
   else
      return;
 
   editLink.removeAttribute('href', 0);
   editLink.removeAttribute('title', 0);
   editLink.style.color = 'gray';
   editLink.innerHTML = 'Archived';
 
   $('span.editsection-upper').remove();
}
 
if (wgNamespaceNumber === 110)
   addOnloadHook(disableOldForumEdit);
 
// Replaces {{USERNAME}} with the name of the user browsing the page.
// Requires copying Template:USERNAME.
function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' &&
       disableUsernameReplace || wgUserName === null)
       return;
    $("span.insertusername").html(wgUserName);
}
 
addOnloadHook(UserNameReplace);
 
// USERTAGS
UserTagsJS.modules.mwGroups = [
   'bureaucrat',
   'sysop',
   'rollback',
   'bot',
];
UserTagsJS.modules.metafilter = {
   'sysop':         ['bot'], // Remove "Admin" tag from bots
   'autoconfirmed': ['user'],
   'chatmoderator': ['rollback'],
};
 
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
   permissions: [
      'rollback',
      'sysop',
      'bureaucrat',
   ]
};
 
// All imported scripts should be added here. 
window.importedArticles = [
   'u:dev:RevealAnonIP/code.js',
   'MediaWiki:Time.js',
   'u:dev:AjaxRC/code.js',
   'u:dev:LockOldBlogs/code.js',
   'u:dev:AjaxBatchDelete/code.js',
   'u:dev:AjaxRC/code.js',
   'u:dev:ShowHide/code.js',
   'u:dev:UserTags/code.js',
   'u:dev:SnowStorm.js',
];
 
importArticles({
   type:     'script',
   articles: importedArticles
});
 
console.log('Site-wide JavaScript in MediaWiki:Common.js will load the ' +
   'following JavaScript files:\n   ' + importedArticles.join('\n   '));