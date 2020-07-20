

Note: After saving, you have to bypass your browser's cache to see the changes.

    Internet Explorer: hold down the Ctrl key and click the Refresh or Reload button, or press Ctrl+F5.
    Firefox: hold down the Shift key while clicking Reload; alternatively press Ctrl+F5 or Ctrl+Shift+R.
    Opera users have to clear their caches through Tools→Preferences.
    Konqueror and Safari users can just click the Reload button.
    Chrome: press Ctrl+Shift+R, or Ctrl+F5 or Shift+F5. 

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the RuneScape Wiki chat.<br /><a href="/wiki/RuneScape:Chat" target="_blank" title="RuneScape:Chat" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/RuneScape:Chat/Help" target="_blank" title="RuneScape:Chat/Help" style="position:relative;text-decoration:underline;">Information</a> • <a href="/wiki/RuneScape:Chat/Logs" target="_blank" title="RuneScape:Chat/Logs" style="position:relative;text-decoration:underline;">Logs</a> • <a href="http://sactage.com/rsw.php" target="_blank" title="Sactage\'s statistics" style="position:relative;text-decoration:underline;">Stats</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
function createAlias(alias, on, run) {
	$('[name="message"]').keypress(function(e) {
		if (typeof on == 'number') on += '';
		if (typeof on == 'string') on = on.split(/[,\|]/);
		var val = this.value;
		if (on.indexOf(e.which+'')!=-1 && val.toLowerCase().search(new RegExp('/'+alias.toLowerCase()+'\\b')) == 0) {
			val = val.substr(alias.length+(val.charAt(alias.length+1)==' '?2:1));
			if (typeof run == 'string') this.value = run + ' ' + val;
			else if (typeof run == 'function') run(val, e);
			if (e.which!=13) e.preventDefault();
		}
	});
}
 
/* Tab Insert */
importScript('User:Joeytje50/tabinsert.js');
 
/* Rate Limit */
importScript('User:Joeytje50/ratelimit.js');
 
/*Adding Quick Chat thing per discussion in Chat*/
importScript('User:Joeytje50/qc.js');
 
/*Script that makes it easy to run functions when receiving messages*/
importScript('MediaWiki:Chat.js/newmessage.js');
 
/*Mark admins*/
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/N7 Elite|Atheist723|Casting Fishes\^\^|Hallowland|Hofmic|Haidro|Flaysian|Touhou FTW|Rift Cyra/)) {
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