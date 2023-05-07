//Edit Chat Topic
var chatTopic = 'Welcome to the The Sandbox Chat Room. Please read the chat\'s rules [[Policies:Chat Policy]]. For more information about the chat see [[Help:Chat]]'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})

//Chat Topic
var chatTopic = 'Welcome to the The Sandbox Chat Room!<br /><a href="/wiki/Policies:Chat Policy" target="_blank" title="Policies:Chat Policy" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/Help:Chat" target="_blank" title="Help:Chat" style="position:relative;text-decoration:underline;">Information</a> • <a href="/wiki/The DragonVale Sandbox Wiki:Chat/Reports" target="_blank" title="Chat Reports" style="position:relative;text-decoration:underline;">Report a User</a> • <a href="/wiki/The DragonVale Sandbox Wiki:Chat/logs" target="_blank" title="The DragonVale Sandbox Wiki:Chat/logs" style="position:relative;text-decoration:underline;">Logs</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Creating /me command */
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me') {
			this.value = '* '+wgUserName;
		}
	}
}

/* Tab Insert */
importScript('User:Joeytje50/tabinsert.js', 'runescape')

/* Rate Limit */
importScript('User:Joeytje50/ratelimit.js', 'runescape')

/*Script that makes it easy to run functions when receiving messages*/
importScript('MediaWiki:Chat.js/newmessage.js')