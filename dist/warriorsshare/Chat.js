/*Allow Chat Mods and admins to kick users using /kick <username>*/
if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
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
	createAlias('block', 13, function(toBan,e) {
		if (confirm('Are you really sure you want to block '+toBan+' permanently from the wiki, and kick them from this chat? Note: seperate the username and the block reason with a comma.')) {
			toBan = toBan.split(',');
			reason = toBan.slice(1).join(' ');
			$.post('warriorsshare.wikia.com/api.php?action=block&user='+toBan[0]+'&expiry=infinite&nocreate=true&noemail=true&reason='+encodeURIComponent(reason))
			mainRoom.kick({name: toBan[0]})
		}
	})
}