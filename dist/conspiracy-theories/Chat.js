importScriptPage('User:Monchoman45/ChatHacks.js','c');
importScriptPage('MessageBlocker/code.js', 'dev');
importScriptPage('User:Madnessfan34537/multikick.js','cod');
importScriptPage('MediaWiki:Chat.js/searchbar.js','cod');
importScriptPage('User:Joeytje50/tabinsert.js', 'runescape');
importScriptPage('MediaWiki:Wikia.js/clock.js', 'conspiracy-theories');

/* Creating /me command */
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me' || this.value == '/ME') {
			this.value = '* '+wgUserName;
		}
	}
}
window.onload=show2
 
var chatTopic = '<span style="color:White"><a href="/wiki/You" target="_blank" title="We know who you are" style="color:lightgray"><span style="color:lightgray"><u>You</u></span></a> have entered the <a href="/wiki/Lies" target="_blank" title="This wiki is a lie" style="color:lightgray"><span style="color:lightgray"><u>lies</u></span></a> of chat. Enjoy your stay!<br/>Be sure to read and follow the <a href="/wiki/Project:Chat" target="_blank" title="Chat Policy"><span style="color:lightgray"><u>rules</u></span></a>.</span>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()