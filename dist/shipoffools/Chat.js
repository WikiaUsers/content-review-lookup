// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFFFFF"> </font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537

importArticles({
	type: "script",
	articles: [
		"w:c:dev:MediaWiki:ChatOptions/code.js",
	]
});