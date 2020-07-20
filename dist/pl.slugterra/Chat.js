
/* Kod wzięty z "My Little Wonderland Wiki" oraz "Jak Wytresować Smoka Wiki" */
/* Opracowany przez PinkieStyle */
 
//MLW WIKI
/* Import chat'u */
importScriptPage('ChatOptions/pl/code.js', 'dev');
 
//JWS WIKI
/* Odnośniki */
var chatTopic = '<a href="http://pl.slugterra.wikia.com/wiki/Pomoc:Chat" target="_blank" title="Pomoc:Chat" style="position:relative;text-decoration:none;">Pomoc</a> <a href="http://pl.slugterra.wikia.com/wiki/MediaWiki:Emoticons" target="_blank" title="Wszyskie emotikony" style="position:relative;text-decoration:none;">Lista emotikon</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:left;position:absolute;width:60%;z-index:0;font-size: 13px;color:#0074D8;font-weight:bold;line-height:1.6;margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()