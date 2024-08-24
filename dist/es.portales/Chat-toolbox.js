// ChatTags
window.chatTagsDisable = ['s'];
importScriptPage('Mediawiki:ChatTags.js', 'pintorkagamine');
// Pegamos las canciones al chat
$("#reproductor-chat").appendTo(".Chat");
// Explicación para el ChatTags
function chatTags(){
    $.showCustomModal( 'Códigos para el texto', '<table class="ChatTags" width="550px" cellspacing="1" cellpadding="2"><tr><th style="background: #59aaec; font-size: 115%;">Etiqueta</th><th style="background: #59aaec; font-size: 115%;">Ejemplo de uso</th><th style="background: #59aaec; font-size: 115%;">Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td style="font-weight: bold;>Texto en negritas</td></tr><td>[bg COLOR]Texto con fondo[/bg]</td><td>[bg green]Texto con fondo[/bg]</td><td><span style="background: green;">Texto con fondo</span></td></tr><tr><td colspan="2">[big]Texto agrandado[/big]</td><td><big>Texto agrandado</big></td></tr><tr><td>[c COLOR]Texto de color[/c]</td><td>[c blue]Texto de color[/c]</td><td style="color: blue;">Texto de color</td></tr><tr><td>[f FUENTE]Texto en otra fuente[/f]</td><td>[f Century Gothic]Letra en Century Gothic[/f]</td><td style="font-family: Century Gothic;">Letra en Century Gothic</td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td style="font-style: italic;">Texto en cursiva</td></tr><tr><td>[img URL DE LA IMAGEN ]</td><td>[img https://images.wikia.nocookie.net/__cb41/vocaloid/es/images/8/89/Wiki-wordmark.png ]</td><td><img src="https://images.wikia.nocookie.net/__cb41/vocaloid/es/images/8/89/Wiki-wordmark.png" /></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td style="text-decoration: line-through;">Texto tachado</td></tr><tr><td>[sc CÓDIGO DE SOUNDCLOUD]</td><td>[sc 53690971]</td><td><iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/53690971&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe></td></tr><tr><td colspan="2">[small]Texto achicado[/small]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sp]Spoiler[/sp]</td><td><button id="spoil">Spoiler</button>&nbsp;<span id="spoil2" style="display: none">Spoiler</span></td></tr><tr><td colspan="2">[sub]Texto en subíndice[sub]</td><td><sub>Texto en subíndice</sub></td></tr><tr><td colspan="2">[sup]Texto en superíndice[/sup]</td><td><sup>Texto en superíndice</td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td style="text-decoration: underline;">Texto subrayado</td></tr><tr><td>[yt ID DEL VÍDEO]</td><td>[yt lCBO69BWP4s]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/lCBO69BWP4s?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr></table>', {
	    id: "chatTags",
	    width: 600,
            height: 430,
	    buttons: [
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                        var dialog3 = $('#chatTags');
	                        dialog3.closeModal();
		    }
	    }
		]
	});
}
// Reglas
function reglas() {
    $.showCustomModal( 'Normas de Vocaloid Wiki', '<ul><li>En Vocaloid Wiki no toleramos el vandalismo en nuestros artículos. El vandalismo incluye blanquear páginas, añadir palabras vulgares e incluso colocar imágenes inadecuadas.</li><li>No alojamos contenido fan-art en Vocaloid Wiki. Si tienes interés en el aspecto fanon de Vocaloid, visita <a href="/wiki/w:c:es.fanloid">Wiki Fanloid</a>.</li><li>No permitimos que se insulten a los usuarios, tanto en el chat como en los foros o muros de mensajes.</li><li>Evita hacer flood y/o spam en el chat. Entiéndase por flood escribir tres o más mensajes seguidos, y por spam cualquier mensaje basura.</li><li>Se prohiben los blogs basura, así como artículos que no se relacionen directamente a Vocaloid.</li></ul>', {
	    id: "reglas",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Reglas de Vocaloid Wiki",
		    handler: function () {
				window.open('/wiki/project:Políticas','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                         var dialog = $('#reglas');
	                         dialog.closeModal();
		    }
	    }
		]
	});
}
// Limpiar chat
function limpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('.Chat ul').append('<div class="inline-alert">Chat limpiado</div>');
	setTimeout(function(){
		$('.Chat ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
}