var chatTopic = 'Please follow the <a href="/wiki/Writing_and_Roleplaying_Guild_Wiki:Policies_Overview/Chat" target="_blank" title="Chat_Rules">Chat Policies</a> so<br />that we all have a great time!<br>We would also like to ask that you check our <a href="/wiki/IRC" target="_blank" title="IRC_Channel">IRC channel</a> for other wiki members.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:90%;z-index:1;font-size:12px;line-height:1.6;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()