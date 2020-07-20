/* Imported Code */
 
importArticles({
	type: "script",
	articles: [
		"w:c:dev:ChatOptions/code.js",
	]
});
 
/* Chat Header */
 
var chatTopic = '<font color="#FFFFFF">Welcome! Remember to follow our <a href="wiki/Chat_Rules" target="_blank" title="Chat Rules"><u>Chat Rules</u></a>!
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()