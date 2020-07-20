//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Please read our <a href="/wiki/DragonVale_Wiki:DragonVale_Chat_Guidelines_and_Policies" target="_blank" title="Chat Policies">Chat Policies</a> Thank you.<br /> Need help with combos? <a href="http://www.2084.org/dragonvale/breeding-sandbox" target="_blank" title="Breeding Sandbox">Breeding Sandbox</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:90%;z-index:0;font-size:12px;line-height:1.6;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()