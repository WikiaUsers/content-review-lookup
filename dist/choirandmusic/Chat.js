//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Choir and Music Wiki.<br /><a href="/wiki/Wiki_Rules" target="_blank" title="Wiki_Rules" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/Staff" target="_blank" title="Staff" style="position:relative;text-decoration:underline;">Admins</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()