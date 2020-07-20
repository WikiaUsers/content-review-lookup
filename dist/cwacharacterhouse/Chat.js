/* Tab Insert */

importScriptPage('User:Joeytje50/tabinsert.js', 'runescape');

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = ''



$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#FFFFFF;font-weight:bold;line-height:1.6;margin-left:200px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})