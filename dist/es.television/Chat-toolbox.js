importScriptPage('MediaWiki:ChatTags.js', 'pintorkagamine');
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
// Reglas del chat
function reglasChat() {
    $.showCustomModal( 'Normas del chat', '<ul><li>Se prohiben las ofensas hacia otros usuarios.</li><li>No debes hacer <a href="/wiki/Ayuda:Flood">flood</a> o <a href="/wiki/Ayuda:Spam">spam</a> dentro del chat de la comunidad.</li><li>No abuses de las mayúsculas, te endemos perfectamente si escribes normal.</li><li>No pases enlaces a otros sitios si no son de confianza. Se permiten enlaces a otras comunidades, páginas de facebook, twitter o sitios que son <i>conocidos</i>.</li><li>Evita molestar a otros usuarios, esto únicamente puede llevarte a un baneo.</li><li>Los administradores y moderadores del chat no son responsables de lo que se hable por mensaje privado, y evitan no sancionar a un usuario por algo hecho en éste medio. Si alguien te molesta, siempre puedes bloquear sus mensajes privados.</li><li>No abuses con las etiquetas del chat, especialmente los <i>tags</i> para agrandar texto o insertar imágenes y vídeos. </li><li>Escribe de una manera que todos puedan entender. No te pedimos una escritura perfecta, únicamente pedimos que los mensajes sean entendibles.</li><li>No escribas un mismo mensaje en varias líneas. Si tienes que decir algo, dilo en un mensaje, no lo dividas en más.</li><li>Recomendamos no revelar datos personales, principalmente por tu propia seguridad. Esto incluye contraseñas, teléfonos, direcciones, etcétera.</li><li>Debes evitar temas racistas, religiosos, políticos y sexuales.</li><li>El <i>rol</i> está permitido, sin embargo, procura no incomodar a otros usuarios.</li><li>No ignores las advertencias que te den los miembros de la administración. Tras dos advertencias (expulsiones), se te baneará del chat durante un tiempo.</li></ul>', {
	    id: "reglasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Cerrar",
		    handler: function () {
				$('#reglasChat').closeModal();;
		    }
		},
		{
			defaultButton: true,
			message: "Reglas de Wikivisión",
			handler: function () {
				window.open('/wiki/Wikivisión:Políticas','_blank');
		    }
	    }
		]
	});
}
// Etiquetas del chat
function chatTags(){
    $.showCustomModal( 'Formatos para texto', '<table class="chatTags" width="100%" cellspacing="2" cellpadding="2" style="text-align: center;"><tr><th colspan="3" style="font-size: 180%;"><a href="/wiki/w:c:dev:ChatTags">Etiquetas del chat</a> por <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a></td></tr><tr><th>Código a insertar</th><th>Ejemplo</th><th>Resultado</th></tr><tr><tr><td rowspan="2">[*bg]</td><td>Color o URL de imagen</td><td rowspan="2" style="background: red;">mensaje</td></tr><tr><td>[*bg red] mensaje</td></tr><tr><td rowspan="2">[b][/b]</td><td>texto en negritas</td><td rowspan="2" style="font-weight: bold;">mensaje</td></tr><tr><td>[b]mensaje[/b]</td></tr><tr><td rowspan="2">[bg][/bg]</td><td>texto con fondo</td><td rowspan="2"><span style="background: blue;">mensaje</span></td></tr><tr><td>[bg blue]mensaje[/bg]</td></tr><tr><td rowspan="2">[big][/big]</td><td>texto agrandado</td><td rowspan="2" style="font-size: larger;">mensaje</td></tr><tr><td>[big]mensaje[/big]</td></tr><tr><td rowspan="2">[c][/c]</td><td>texto de un color</td><td rowspan="2" style="color: green;">mensaje</td></tr><tr><td>[c green]mensaje[/c]</td></tr><tr><td rowspan="2">[f][/f]</td><td>texto en otra letra fuente</td><td rowspan="2" style="font-family: Verdana;">mensaje</td></tr><tr><td>[f Verdana]mensaje[/f]</td></tr><tr><td rowspan="2">[i][/i]</td><td>texto en cursiva</td><td rowspan="2" style="font-style: italic;">mensaje</td></tr><tr><td>[i]mensaje[/i]</td></tr><tr><td rowspan="2">[img]</td><td>insertar una imagen</td><td rowspan="2"><img src="https://images.wikia.nocookie.net/__cb22/television/es/images/8/89/Wiki-wordmark.png" /></td></tr><tr><td>[img https://images.wikia.nocookie.net/__cb22/television/es/images/8/89/Wiki-wordmark.png ]</td></tr><tr><td rowspan="2">[s][/s]</td><td>texto tachado</td><td rowspan="2" style="text-decoration: line-through;">mensaje</td></tr><tr><td>[s]mensaje[/s]</td></tr><tr><td rowspan="2">[sc]</td><td>insertar archivo de Soundcloud</td><td rowspan="2"></td></tr><tr><td>[sc ID del archivo]</td></tr><tr><td rowspan="2">[small][/small]</td><td>texto achicado</td><td rowspan="2"><small>mensaje</small></td></tr><tr><td>[small]mensaje[/small]</td></tr><tr><td rowspan="2">[sp][/sp]</td><td>texto de spoiler <i>desplegable</i></td><td rowspan="2"><button id="spoil">Spoiler</button>&nbsp;<span id="spoil2" style="display: none">mensaje</span></td></tr><tr><td>[sp]mensaje[/sp]</td></tr><tr><td rowspan="2">[sub][/sub]</td><td>texto en subíndice</td><td rowspan="2"><sub>mensaje</sub></td></tr><tr><td>[sub]mensaje[/sub]</td></tr><tr><td rowspan="2">[sup][/sup]</td><td>texto en superíndice</td><td rowspan="2"><sup>mensaje</sup></td></tr><tr><td>[sup]mensaje[/sup]</td></tr><tr><td rowspan="2">[u][/u]</td><td>texto subrayado</td><td rowspan="2" style="text-decoration: underline;">mensaje</td></tr><tr><td>[u]mensaje[/u]</td></tr><tr><td rowspan="2">[yt]</td><td>insertar vídeo de YouTube</td><td rowspan="2"></td></tr><tr><td>[yt ID del vídeo]</td></tr><tr><th colspan="3" style="font-size: 85%;">¡No te olvides siempre de cerrar las etiquetas!</th></tr></table>', {
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
$(function() {
// Sonidos de notificación
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonidos de notificación [OFF]") {
            $('.sonidonotificacion a').html('Sonidos de notificación <span style="color:lime;">[ON]</span>');
        } else {
            $('.sonidonotificacion a').html('Sonidos de notificación <span style="color:red;">[OFF]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonidos de notificación [ON]") {
			$("#notificacion")[0].play();
		}
    });
// Estado de ausencia
    $(window).unbind('mousemove').unbind('focus');
// Agregar sombra
    $('<div class="sombra"></div>').insertBefore('#Chat_21');
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
	toggleAway.back = function() { //Forzar el retiro del estado
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Forzar que aparezca el estado
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}
importScriptPage('User:' + wgUserName + '/chat.js');
importStylesheet('User:' + wgUserName + '/chat.css');