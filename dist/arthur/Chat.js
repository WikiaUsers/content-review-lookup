/*Allow Chat Mods and admins to kick users using /kick <username>*/
if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
$(function() {
	$('[name="message"]').keypress(function(e) {
		if (e.which == 13) {
			if (this.value.split(' ')[0] == '/kick') {
				e.preventDefault();
				var toKick = this.value.replace(/^\/kick /,'')
				if (!$('#WikiChatList [data-user="'+toKick+'"]').length) {
					confirm(toKick + ' is not in this chat. Still try to kick them?')?mainRoom.kick({name: toKick}):undefined;
				} else {
					mainRoom.kick({name: toKick})
				}
				this.value = '';
				return true;
			}
		}
	});
});
}

var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
chatOptionsLoaded = 1;
importScriptPage('MediaWiki:Chat.js/options.js');
importScriptPage('MediaWiki:ChatHacks.js'); 
}