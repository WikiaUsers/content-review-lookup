/* Imported Code */
 
importArticles({
	type: "script",
	articles: [
		"w:c:dev:ChatOptions/code.js",
	]
});

/* Chat Header */

var chatTopic = '<p style="color:#FFFFFF">Welcome! Remember to follow our <a href="/wiki/RWBY_Wiki:Spoiler_Policy" target="_blank" title="RWBY Wiki:Spoiler Policy"><u>Spoiler Policies</u></a> and wait for the Registered Users’ release.<br/><a href="/wiki/RWBY_Wiki:Chat_Policies" target="_blank" title="RWBY Wiki:Chat Policies"><u>Chat Policies</u></a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons"><u>Emoticons</u></a> • <a href="/wiki/RWBY_Wiki:User_Rights_Nominations" target="_blank" title="RWBY_Wiki:User_Rights_Nominations"><u>Nominations</u></a></p>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()