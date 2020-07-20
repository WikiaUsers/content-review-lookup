// Anuncios a los wikis de DS
var chatTopic = '<a target="_blank" href="http://es.wanderoveryonder.wikia.com/"><img src="https://images.wikia.nocookie.net/wanderoveryonder/es/images/1/14/ChatAds.png"></img></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

//Importamos el CSS
importStylesheet('MediaWiki:DSad.css');