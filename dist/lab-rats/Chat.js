importScriptPage('ChatOptions/code.js', 'dev');
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

var chatTopic = 'Welcome to the Lab Rats Wiki chat!<br /> <a href="http://lab-rats.wikia.com/wiki/Chat_Guidelines">Rules</a> • <a href="http://lab-rats.wikia.com/wiki/Thread:93680">ChatTags Guide</a> • <a href="http://lab-rats.wikia.com/wiki/MediaWiki:Emoticons">Emoticons</a> • <a href="http://lab-rats.wikia.com/wiki/Help:Chat">Chat Information</a>' 
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()