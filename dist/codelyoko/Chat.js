/*
var chatTopic = '<font color="#FFFFFF"><br />  <a href="/Code_Lyoko_Wiki:Staff" target="_blank" title="Admins"><u>Admins</u></a> | <a href="http://codelyoko.wikia.com/wiki/Code_Lyoko_Wiki:Rules#Chat_Rules" target="_blank" title="Chat Policy"><u>Chat Policy</u></a></font>'
 
$(function() {
 $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#FF0000; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
 .find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// END Chat Topic
 
// ************
// Chat options import
// ************
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
 chatOptionsLoaded = 1;
 importScript('MediaWiki:Chat.js/options.js');
}
 
// ****************
// END Chat options import
// ****************
document.title = "◤ CL Chatroom ◢";
//END
*/ 
/*Allow Chat Mods and admins to kick users using /kick <username>*/
/*if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
 createAlias('kick', 13, function(toKick,e) {
  if ($('#WikiChatList [data-user="'+toKick+'"]').length) {
   mainRoom.kick({name: toKick})
  } else {
   if (confirm(toKick + ' is not in this chat. Still try to kick him?')) mainRoom.kick({name: toKick});
  }
  e.target.value = '';
 });
}
if (wgUserGroups.indexOf('sysop')!=-1) {
 createAlias('ban', 13, function(toBan,e) {
  if (confirm('Are you really sure you want to block '+toBan+' permanently from the wiki, and kick them from this chat? Note: seperate the username and the block reason with a comma.')) {
   toBan = toBan.split(',');
   reason = toBan.slice(1).join(' ');
   $.post('runescape.wikia.com/api.php?action=block&user='+toBan[0]+'&expiry=infinite&nocreate=true&noemail=true&reason='+encodeURIComponent(reason))
   mainRoom.kick({name: toBan[0]})
  }
 })
}
// END Kick/Ban

*/