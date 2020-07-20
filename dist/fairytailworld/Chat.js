//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Fiore!'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Creating /me command */
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me' || this.value == '/ME') {
			this.value = '* '+wgUserName;
		}
	}
}

/* Tab Insert */
importScriptPage('User:Joeytje50/tabinsert.js', 'runescape');


/*Adding Quick Chat thing per discussion in Chat*/
importScriptPage('User:Joeytje50/qc.js', 'runescape');

/*Mark admins*/
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/Abce2|Renardy|FusionXHelios5980|Titi and Co|Synchro37|Kululu12/)) { 
			$(this).parent().addClass('admin');
		}
	});
}, 1000)

/*Allow Chat Mods and admins to kick users using /kick <username>*/
if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
$(function() {
	$('[name="message"]').keypress(function(e) {
		if (e.which == 13) {
			if (this.value.split(' ')[0] == '/kick') {
				e.preventDefault();
				var toKick = this.value.replace(/^\/kick /,'')
				if (!$('#WikiChatList [data-user="'+toKick+'"]').length) {
					confirm(toKick + ' is not in this chat. Still try to kick him?')?mainRoom.kick({name: toKick}):undefined;
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
importScriptPage('MediaWiki:Chat.js/options.js','beyblade');
}