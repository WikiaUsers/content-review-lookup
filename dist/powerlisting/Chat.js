/* Imported Code */
 
importArticles({
	type: "script",
	articles: [
		"w:c:dev:MediaWiki:ChatOptions/code.js",
	]
});

/* Chat Header */

var chatTopic = '<font color="#FF0000">Welcome to the Power Hub! Please remember to be civil and polite to others, and make sure to read up on the <br/><a href="/wiki/powerlisting_Wiki:Da_Chat_Rules" target="_blank" title="User_blog:Imouto-tan/Da_Chat_Rules"><u>Chat Rules</u></a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons"><u>Emoticons</u></a> </font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()