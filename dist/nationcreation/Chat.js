var chatTopic = 'Welcome to the Nation Creation Wiki chat!'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
window.aliases = {};
function createAlias(alias, on, run) {
	window.aliases[alias] = function(e) {
		if (typeof on == 'number') on += '';
		if (typeof on == 'string') on = on.split(/[,\|]/);
		var val = this.value;
		if (on.indexOf(e.which+'')!=-1 && val.toLowerCase().search(new RegExp('/'+alias.toLowerCase()+'\\b')) == 0) {
			val = val.substr(alias.length+(val.charAt(alias.length+1)==' '?2:1));
			if (typeof run == 'string') this.value = run + ' ' + val;
			else if (typeof run == 'function') run(val, e);
			if (e.which!=13) e.preventDefault();
		}
	}
	$('[name="message"]').keypress(window.aliases[alias]);
}
 
/*Script that makes it easy to run functions when receiving messages*/
importScript('MediaWiki:Chat.js/newmessage.js');
importScript('MediaWiki:Chat.js/load.js');
 
/*Mark admins*/
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/N7 Elite|Atheist723|Casting Fishes\^\^|Hallowland|Hofmic|Flaysian|Touhou FTW|Rift Cyra/)) {
			$(this).parent().addClass('admin');
		}
	});
}, 1000)
 
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
			$.post('runescape.wikia.com/api.php?action=block&user='+toBan[0]+'&expiry=infinite&nocreate=true&noemail=true&reason='+encodeURIComponent(reason))
			mainRoom.kick({name: toBan[0]})
		}
	})
}