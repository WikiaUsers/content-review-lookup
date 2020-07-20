var chatTopic = 'Welcome to the RuneScape Wiki chat.<br /><a href="/wiki/RuneScape:Chat" target="_blank" title="RuneScape:Chat" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/RuneScape:Chat/Help" target="_blank" title="RuneScape:Chat/Help" style="position:relative;text-decoration:underline;">Information</a> • <a href="/wiki/RuneScape:Chat/Logs" target="_blank" title="RuneScape:Chat/Logs" style="position:relative;text-decoration:underline;">Logs</a>'
 
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