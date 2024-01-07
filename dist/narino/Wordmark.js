// Anuncios a los wikis de DS
// Créditos a la wiki oficial de Galaxia Wander
// Interwiki: [[w:c:es.woy]]
var chatTopic = '<a target="_blank" href="http://es.gti.wikia.com/"><img src="https://images.wikia.nocookie.net/__cb20140210162421/plantillas/es/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"></img></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()