/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. 

/*** Descripci�n del chat ***/
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					chatDescInt.clearInterval();
				}
			}, 50);
		}
	});
}