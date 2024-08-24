/*Manual para usar ChatTags*/
function ChatTags(){
    $.showCustomModal( 'Manual de uso de ChatTags', '<a href="/wiki/w:c:dev:ChatTags">ChatTags</a> creado por el usuario <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br><b>AVISO</b>: Los c�digos siempre deben ser cerrados, a excepci�n de "*bg", "yt", "sc" e "img".<br>El c�digo de v�deo de YouTube es el que se muestra despu�s de <code style="font-weight:bold; font-style:italic;">watch?v=</code> en la URL del v�deo. Por ejemplo, si el v�deo es <code style="font-weight:bold; font-style:italic;">http://www.youtube.com/watch?v=SnHGqW3KoA4</code>, solo insertar�s <code style="font-weight:bold; font-style:italic;">SnHGqW3KoA4</code>.<br>Para obtener el c�digo de m�sica de SoundCloud, ve a la p�gina de la m�sica deseada de SoundCloud y luego haz clic en el bot�n "Share", a continuaci�n, haz clic en la pesta�a "Embed", luego encontrar�s lo siguiente en el �rea de texto: .../tracks/XXXXXXXXX&amp;auto_play... en esta �rea, en lugar de las "X" aparecer�n n�meros que es el c�digo que tienes que copiar para que el reproductor de SoundCloud aparezca correctamente en el Chat.<table border="1" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse; color:black; text-align:center;" width="100%" cellpadding="0"><tr style="background-color:#F2F2F2;"><th>C�digo</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[i]Texto en it�lica[/i]</td><td><span style="font-style:italic;">Texto en it�lica</span></td></tr><tr><td colspan="2">[b]Texto en negrita[/b]</td><td><span style="font-weight:bold;">Texto en negrita</span></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration:underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration:line-through;">Texto tachado</span></td></tr><tr><td colspan="2">[p]Texto preformateado[/p]</td><td><code>Texto preformateado</code></td></tr><tr><td>[f TipoDeLetraAqu�]Texto con un tipo de letra espec�fico[/f]</td><td>[f Comic Sans MS]Texto Comic Sans MS[/f]</td><td><span style="font-family:Comic Sans MS;">Texto Comic Sans MS</span></td></tr><tr><td colspan="2">[sup]Texto en Super�ndice[/sup]</td><td><sup>Texto en Super�ndice</sup></td></tr><tr><td colspan="2">[sub]Texto en Sub�ndice[/sub]</td><td><sub>Texto en Sub�ndice</sub></td></tr><tr><td colspan="2">[big]Texto Grande[/big]</td><td><span style="font-size:larger;">Texto Grande</span></td></tr><tr><td colspan="2">[small]Texto Achicado[/small]</td><td><small>Texto Achicado</small></td></tr><tr><td colspan="2">[sp]Texto Spoiler[/sp]</td><td><button id="spoil">Mostrar spoiler</button>&nbsp;<span id="spoil2" style="display:none;">Texto Spoiler</span></td></tr><tr><td>[c ColorAqu�]Texto con color de letra personalizado[/c]</td><td>[c purple]Texto color morado[/c]</td><td><span style="color:purple;">Texto color morado</span></td></tr><tr><td>[sh ColorAqu�]Texto con sombra de color personalizado[/sh]<td>[sh green]Texto con sombra verde[/sh]</td><td><span style="text-shadow:0 0 5px green;">Texto con sombra verde</span></td></tr><tr><td>[bd ColorAqu�]Texto con borde de color personalizado[/bd]<td>[bd orange]Texto con borde naranja[/bd]</td><td><span style="border:2px solid orange;">Texto con borde naranja</span></td></tr><tr><td>[bg ColorAqu�]Texto con fondo de color personalizado[/bg]</td><td>[bg red]Texto con fondo rojo[/bg]</td><td><span style="background:red; color:white;">Texto con fondo rojo</span></td></tr><tr><td>[*bg ColorAqu�]Mensaje con fondo de color personalizado</td><td>[*bg blue]Mensaje con fondo azul</td><td style="background-color:blue; color:white;">Mensaje con fondo azul</td></tr><tr><td>[img URLDeImagenAqu�]</td><td>[img https://images.wikia.nocookie.net/skullgirls-es/es/images/thumb/6/65/Skull_Heart_ID.png/60px-Skull_Heart_ID.png]</td><td><a href="https://images.wikia.nocookie.net/skullgirls-es/es/images/thumb/6/65/Skull_Heart_ID.png/60px-Skull_Heart_ID.png"><img src="https://images.wikia.nocookie.net/skullgirls-es/es/images/thumb/6/65/Skull_Heart_ID.png/60px-Skull_Heart_ID.png" style="max-height:200px; max-width:200px;"/></a></td></tr><tr><td>[yt C�digoDeV�deoDeYouTube]</td><td>[yt SnHGqW3KoA4]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/SnHGqW3KoA4?autohide=1&rel=0" frameborder="0" allowfullscreen/></td></tr><tr><td>[sc C�digoDeM�sicaDeSoundCloud]</td><td>[sc 157319543]</td><td><iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/157319543&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe></td></table>', {
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
/*Sonido de notificaci�n*/
$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[Apagado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/skullgirls-es/es/images/e/ee/SkullgirlsWikiChatSonidoNotificacion.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonido de notificaci�n [Apagado]") {
            $('.sonidonotificacion a').html('Sonido de notificaci�n <span style="color:lime;">[Encendido]</span>');
        } else {
            $('.sonidonotificacion a').html('Sonido de notificaci�n <span style="color:red;">[Apagado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonido de notificaci�n [Encendido]") {
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