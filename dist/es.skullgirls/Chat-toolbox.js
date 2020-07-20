/*Manual para usar ChatTags*/
function ChatTags(){
    $.showCustomModal( 'Manual de uso de ChatTags', '<a href="/wiki/w:c:dev:ChatTags">ChatTags</a> creado por el usuario <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br><b>AVISO</b>: Los códigos siempre deben ser cerrados, a excepción de "*bg", "yt", "sc" e "img".<br>El código de vídeo de YouTube es el que se muestra después de <code style="font-weight:bold; font-style:italic;">watch?v=</code> en la URL del vídeo. Por ejemplo, si el vídeo es <code style="font-weight:bold; font-style:italic;">http://www.youtube.com/watch?v=SnHGqW3KoA4</code>, solo insertarás <code style="font-weight:bold; font-style:italic;">SnHGqW3KoA4</code>.<br>Para obtener el código de música de SoundCloud, ve a la página de la música deseada de SoundCloud y luego haz clic en el botón "Share", a continuación, haz clic en la pestaña "Embed", luego encontrarás lo siguiente en el área de texto: .../tracks/XXXXXXXXX&amp;auto_play... en esta área, en lugar de las "X" aparecerán números que es el código que tienes que copiar para que el reproductor de SoundCloud aparezca correctamente en el Chat.<table border="1" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse; color:black; text-align:center;" width="100%" cellpadding="0"><tr style="background-color:#F2F2F2;"><th>Código</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[i]Texto en itálica[/i]</td><td><span style="font-style:italic;">Texto en itálica</span></td></tr><tr><td colspan="2">[b]Texto en negrita[/b]</td><td><span style="font-weight:bold;">Texto en negrita</span></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration:underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration:line-through;">Texto tachado</span></td></tr><tr><td colspan="2">[p]Texto preformateado[/p]</td><td><code>Texto preformateado</code></td></tr><tr><td>[f TipoDeLetraAquí]Texto con un tipo de letra específico[/f]</td><td>[f Comic Sans MS]Texto Comic Sans MS[/f]</td><td><span style="font-family:Comic Sans MS;">Texto Comic Sans MS</span></td></tr><tr><td colspan="2">[sup]Texto en Superíndice[/sup]</td><td><sup>Texto en Superíndice</sup></td></tr><tr><td colspan="2">[sub]Texto en Subíndice[/sub]</td><td><sub>Texto en Subíndice</sub></td></tr><tr><td colspan="2">[big]Texto Grande[/big]</td><td><span style="font-size:larger;">Texto Grande</span></td></tr><tr><td colspan="2">[small]Texto Achicado[/small]</td><td><small>Texto Achicado</small></td></tr><tr><td colspan="2">[sp]Texto Spoiler[/sp]</td><td><button id="spoil">Mostrar spoiler</button>&nbsp;<span id="spoil2" style="display:none;">Texto Spoiler</span></td></tr><tr><td>[c ColorAquí]Texto con color de letra personalizado[/c]</td><td>[c purple]Texto color morado[/c]</td><td><span style="color:purple;">Texto color morado</span></td></tr><tr><td>[sh ColorAquí]Texto con sombra de color personalizado[/sh]<td>[sh green]Texto con sombra verde[/sh]</td><td><span style="text-shadow:0 0 5px green;">Texto con sombra verde</span></td></tr><tr><td>[bd ColorAquí]Texto con borde de color personalizado[/bd]<td>[bd orange]Texto con borde naranja[/bd]</td><td><span style="border:2px solid orange;">Texto con borde naranja</span></td></tr><tr><td>[bg ColorAquí]Texto con fondo de color personalizado[/bg]</td><td>[bg red]Texto con fondo rojo[/bg]</td><td><span style="background:red; color:white;">Texto con fondo rojo</span></td></tr><tr><td>[*bg ColorAquí]Mensaje con fondo de color personalizado</td><td>[*bg blue]Mensaje con fondo azul</td><td style="background-color:blue; color:white;">Mensaje con fondo azul</td></tr><tr><td>[img URLDeImagenAquí]</td><td>[img https://images.wikia.nocookie.net/skullgirls-es/es/images/thumb/6/65/Skull_Heart_ID.png/60px-Skull_Heart_ID.png]</td><td><a href="https://images.wikia.nocookie.net/skullgirls-es/es/images/thumb/6/65/Skull_Heart_ID.png/60px-Skull_Heart_ID.png"><img src="https://images.wikia.nocookie.net/skullgirls-es/es/images/thumb/6/65/Skull_Heart_ID.png/60px-Skull_Heart_ID.png" style="max-height:200px; max-width:200px;"/></a></td></tr><tr><td>[yt CódigoDeVídeoDeYouTube]</td><td>[yt SnHGqW3KoA4]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/SnHGqW3KoA4?autohide=1&rel=0" frameborder="0" allowfullscreen/></td></tr><tr><td>[sc CódigoDeMúsicaDeSoundCloud]</td><td>[sc 157319543]</td><td><iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/157319543&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe></td></table>', {
	    id: "ChatTags",
	    width: 950,
            height: 1250,
	    buttons: [
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                        var dialog3 = $('#ChatTags');
	                        dialog3.closeModal();
		    }
	    }
		]
	});
}
/*Sonido de notificación*/
$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[Apagado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/skullgirls-es/es/images/e/ee/SkullgirlsWikiChatSonidoNotificacion.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonido de notificación [Apagado]") {
            $('.sonidonotificacion a').html('Sonido de notificación <span style="color:lime;">[Encendido]</span>');
        } else {
            $('.sonidonotificacion a').html('Sonido de notificación <span style="color:red;">[Apagado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonido de notificación [Encendido]") {
			$("#notificacion")[0].play();
		}
    });
/* Setear estado de ausencia, hacer que se reinicie al escribir y no al mover el mouse ni al cambiar la ventana.*/
    $(window).unbind('mousemove').unbind('focus');
});

NodeChatController.prototype.setAway = function (msg){
		if(!msg) {var msg = '';}
		$().log("Attempting to go away with message: " + msg);
		var setStatusCommand = new models.SetStatusCommand({
			statusState: STATUS_STATE_AWAY,
			statusMessage: msg
		});
		this.socket.send(setStatusCommand.xport());
	}

	function toggleAway(msg) {
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == true) {
			mainRoom.setBack();
		}
		else {
			mainRoom.setAway(msg);
		}
	}
	toggleAway.back = function() { //Force back status
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Force away status
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}
/*Recargar chat*/
function recargar()
{
  location.reload();
}