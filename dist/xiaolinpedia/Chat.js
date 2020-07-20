//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Xiaolinpedia Temple!<br/><a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>Rules</u></a> • <a href="/wiki/Project:Chat/FAQ" target="_blank" title="Chat FAQ"><u>FAQs</u></a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>Emotes</u></a> • <a href="/wiki/Fanon:Main" target="_blank" title="Fanon"><u>Fanon</u></a> • <a href="/wiki/Report:Main" target="_blank" title="Report"><u>Report a user</u></a>'
 
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

/* Rate Limit */
importScriptPage('User:Joeytje50/ratelimit.js', 'runescape');

/*Adding Quick Chat thing per discussion in Chat*/
importScriptPage('User:Joeytje50/qc.js', 'runescape');

/*Mark admins*/
setInterval(function() {
	$('#Rail .User.chat-mod:not(.admin) .username').each(function() {
		if (!this.innerHTML.match(/Yuzura|Abce2/)) {
                    if (this.innerHTML.indexOf("SpanishBot") == -1){
			$(this).parent().addClass('admin');
                    }else{
                        $(this).parent().addClass('bot');
                    }
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
importScriptPage('MediaWiki:Chat.js/options.js');
importScriptPage('MediaWiki:ChatEditRestriction.js');
}

importScriptPage('ChatTags/code.js', 'dev');