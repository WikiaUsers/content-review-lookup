


/*Courtesy of the [[runescape:MediaWiki:Chat.js|Runescape Wiki]]*/
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the HQ. <br>Please make sure to read the rules before chatting.' 
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00FF00;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
/* Creating /me command */ 
document.getElementsByName('message')[0].onkeypress = function(e) {
if (e.which == 32) {
if (this.value == '/me')
{ this.value = '* '+wgUserName; 
}
}
}
 
/*Tab Insert*/
importScriptPage('User:Joeytje50/tabinsert.js','runescape')