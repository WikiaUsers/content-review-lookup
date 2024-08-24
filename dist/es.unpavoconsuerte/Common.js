/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. 

/*** Descripción del chat ***/
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