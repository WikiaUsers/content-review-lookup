// **********
// Chat topic
// **********
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to the Call of Duty Wiki
 
var chatTopic = '<font color="#000000">Welcome to the Mas7ers residence. List of emotes can be found <a href="http://vidsfamilyhouse.wikia.com/wiki/MediaWiki:Emoticons">here</a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// **************
// END Chat topic
// **************