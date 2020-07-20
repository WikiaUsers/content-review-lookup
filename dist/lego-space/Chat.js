var chatTopic = 'Welcome to the LEGO Space Wiki chat! Please remember to follow our <a href="/wiki/LEGO_Space_Wiki:Chat_rules" target="_blank" title="Chat Rules">Chat Rules</a>.<br/>Most importantly, keep it nice and have fun! <img src="https://images.wikia.nocookie.net/lego/images/4/48/HappyEmote.gif" />'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+ chatTopic +'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// Creating /me command
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me' || this.value == '/ME') {
			this.value = '* '+wgUserName;
		}
	}
}