// Please use the import articles, keep this clean.
importArticles({
	type: 'script',
	articles: [
		'u:dev:ChatDelay/code.js',
		'u:dev:ChatOptions/code.js',
		'u:kocka:MediaWiki:Emoticons.js',
	]
});
 
// Chat topic
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to Runescape Wiki
 
var chatTopic = 'Chat Rules/FAQs: <a href="/wiki/Project:Chat_Rules/FAQs" target="_blank" title="Project:Chat Rules/FAQs"><u>here</u></a>.';
 
$(function() {
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:Left; position:absolute; width:60%; z-index:0; font-size: 13px; color:whitesmoke; font-weight:bold; line-height:1.6; margin-left:0px;">'+chatTopic+'</div>')
    .find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// END Chat topic