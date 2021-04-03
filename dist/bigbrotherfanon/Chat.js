// **********
// Chat topic
// **********
 
// Remember to escape single quotes in the topic using \' to prevent this from breaking.
 
// Credit to Call Of Duty Wiki
 
var chatTopic = 'Welcome to the Big Brother Fanon Wiki chat. Rules and more information can be found <a href="/wiki/Big Brother Fanon Wiki:Chat Policy" target="_blank" title="Project:Chat"><br /><u>here</u></a>.FAQs <a href="/wiki/Big Brother Fanon Wiki:User handbook" target="_blank" title="Handbook"><u>here</u></a>. <a href="http://Big Brother Fanon Wiki:Fanon Policy" target="_blank" title="Fanon"><u>Fanon policy</u></a>. Emotes list <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emotes"><u>here</u></a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// **************
// END Chat topic
// **************


// Change the document title for the chat page
 
document.title = "Big Brother Fanon Wiki Chat! ";

})