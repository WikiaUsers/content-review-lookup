importScriptPage('ChatTags.js', 'es.regularshow');
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
function chatTags(){
    $.showCustomModal( 'Códigos para el texto', '<table class="ChatTags" width="550px" cellspacing="1" cellpadding="2"><tr><th style="background: #59aaec; font-size: 115%;">Etiqueta</th><th style="background: #59aaec; font-size: 115%;">Ejemplo de uso</th><th style="background: #59aaec; font-size: 115%;">Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td style="font-weight: bold;>Texto en negritas</td></tr><td>[bg COLOR]Texto con fondo[/bg]</td><td>[bg green]Texto con fondo[/bg]</td><td><span style="background: green;">Texto con fondo</span></td></tr><tr><td colspan="2">[big]Texto agrandado[/big]</td><td><big>Texto agrandado</big></td></tr><tr><td>[c COLOR]Texto de color[/c]</td><td>[c blue]Texto de color[/c]</td><td style="color: blue;">Texto de color</td></tr><tr><td>[f FUENTE]Texto en otra fuente[/f]</td><td>[f Century Gothic]Letra en Century Gothic[/f]</td><td style="font-family: Century Gothic;">Letra en Century Gothic</td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td style="font-style: italic;">Texto en cursiva</td></tr><tr><td>[img URL DE LA IMAGEN ]</td><td>[img https://images.wikia.nocookie.net/clarence-la/es/images/thumb/8/89/Wiki-wordmark.png/200px-Wiki-wordmark.png ]</td><td><img src="https://images.wikia.nocookie.net/clarence-la/es/images/thumb/8/89/Wiki-wordmark.png/200px-Wiki-wordmark.png" /></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td style="text-decoration: line-through;">Texto tachado</td></tr><tr><td>[sc CÓDIGO DE SOUNDCLOUD]</td><td>[sc 53690971]</td><td><iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/53690971&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe></td></tr><tr><td colspan="2">[small]Texto achicado[/small]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sp]Spoiler[/sp]</td><td><button id="spoil">Spoiler</button>&nbsp;<span id="spoil2" style="display: none">Spoiler</span></td></tr><tr><td colspan="2">[sub]Texto en subíndice[sub]</td><td><sub>Texto en subíndice</sub></td></tr><tr><td colspan="2">[sup]Texto en superíndice[/sup]</td><td><sup>Texto en superíndice</td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td style="text-decoration: underline;">Texto subrayado</td></tr><tr><td>[yt ID DEL VÍDEO]</td><td>[yt HKYT06DVsTg]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/HKYT06DVsTg?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr></table>', {
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
        $('.sonidoNotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidoNotificacion').click(function() {
        if($('.sonidoNotificacion a').text() == "Sonidos de notificación [OFF]") {
            $('.sonidoNotificacion a').html('Sonidos de notificación <span style="color:lime;">[ON]</span>');
        } else {
            $('.sonidoNotificacion a').html('Sonidos de notificación <span style="color:red;">[OFF]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidoNotificacion a').text() == "Sonidos de notificación [ON]") {
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