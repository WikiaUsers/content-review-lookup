importScriptPage('MediaWiki:Chat.js/insertAtCaret.js', 'es.ben10');
importScriptPage('ChatTags/code.js', 'dev');
 
function obtenerEmoticons(){
var $chat = $('#listadeemoticones');
var $ul = $('<ul>', {'id': 'listaEmoticones'});
 
        $.ajax({
            'dataType': 'text',
                'data': {
                'title': 'MediaWiki:Emoticons',
                    'action': 'raw',
                    'ctype': 'text/plain'
            },
                'url': wgScript,
                'success': function (data) {
 
var removeReg = /\*+\s+/g;
var lines = data
  .replace(removeReg, '')
  .split('\n');
console.log(lines);
 
for (var i = 0; i < lines.length; i += 2) {
  $ul.append($('<li>')
             .append($('<img>', {src: lines[i]})).attr('data-atajo',lines[i+1])
      .append($('<span>', {text: lines[i+1]}))
    );
}
 
$chat.append($ul);
    $("#listaEmoticones li").click(function() {
        $("textarea[name='message']").insertAtCaret(" " + $(this).attr('data-atajo') + " ", "");
    });
 
                }
        });
}
 
function ListaEmoticones(){
    $.showCustomModal( 'Listado de emoticones', '<div id="listadeemoticones"><img src="https://images.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
	    id: "listaEmoticones",
	    width: 600,
            height: 400,
	    buttons: [
		{
			id: "cancel",
		    message: "Avanzado",
		    handler: function () {
				window.open('/wiki/MediaWiki:Emoticons','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                        var dialog = $('#listaEmoticones');
	                        dialog.closeModal();
		    }
	    }
		]
	});
}
 
// Limpiar el chat
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
 
// Recargar chat
function recargar()
{
  location.reload();
}
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});
// Nuestro Reglamento
function reglas() {
    $.showCustomModal( 'Normas del chat', '<h3>Reglas generales</h3><ul><li>No insultar a ningún usuario, el respeto es algo muy importante en esta comunidad.</li><li>NO modifiques cualquier pagina de usuario.</li><li>Si tienes alguna duda puedes comentar en la pagina respectiva a esa duda o bien publicarlo en el Muro de algún Mod, Admin, Burocrata o cualquier Usuario Activo, explicando tu duda.</li><li>No hagas Spam (Si un Admin lo hace NO le sigas la corriente).</li><li>Trata de escribir con buena ortografía.</li><li>No coloques Gore (Imagenes de sangre explicita).</li><li>Si te conectas al Chat presentate (o di cualquier cosa), en resumen no estes escondido. (Esta falta es leve y tras los avisos solo acatará un bloqueo corto en el chat).</li><li>No Hagas Spam ni flood.</li><li>Se pueden usar mayusculas pero no abusar.</li><li>No enlazar vínculos de otros Chats.</li><li>', {
	    id: "reglas",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Protocolo",
		    handler: function () {
				window.open('/wiki/Protocolo','_blank');
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
// Etiquetas del chat
function chatTags(){
    $.showCustomModal( 'Formatos para texto', '<table class="chatTags" width="100%" cellspacing="2" cellpadding="2" style="text-align: center;"><tr><th colspan="3" style="font-size: 180%;"><a href="/wiki/w:c:dev:ChatTags">Etiquetas del chat</a> por <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a></td></tr><tr><th>Código a insertar</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td><span style="font-weight: bold;">Texto en negritas</span></td></tr><tr><td>[bg COLOR]Texto con fondo[/bg]</td><td>[bg red]Texto con fondo rojo[/bg]</td><td><span style="background: red;">Texto con fondo rojo</span></td></tr><tr><td colspan="2">[big]Texto agrandecido[/big]</td><td><big>Texto agrandecido</big></td></tr><tr><td>[c COLOR]Texto de color[/c]</td><td>[c green]Texto verde[/c]</td><td><span style="color: green;">Texto verde</span></td></tr><tr><td>[f LETRA FUENTE]Texto con otra letra fuente[/f]</td><td>[f Gloria Hallelujah]Texto en Gloria Hallelujah[/f]</td><td><span style="font-family: Gloria Hallelujah;">Texto en Gloria Hallelujah</span></td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td><span style="font-style: italic;">Texto en cursiva</span></td></tr><tr><td>[img URL DE LA IMAGEN]</td><td>[img https://images.wikia.nocookie.net/__cb275/regularshow/es/images/8/89/Wiki-wordmark.png ]</td><td><img src="https://images.wikia.nocookie.net/__cb275/regularshow/es/images/8/89/Wiki-wordmark.png" style="max-height: 200px; max-width: 200px;"></td></tr><tr><td colspan="2">[p]Texto desformateado[/p]</td><td><code>Texto desformateado</code></td></tr><tr><td colspan="2">[s]Texto achicado[/s]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sp]Texto con spoilers[/sp]</td><td><button id="spoil">Show spoiler</button>&nbsp;<span id="spoil2" style="display: none">Texto con spoilers</span></td></tr><tr><td colspan="2">[sub]Texto en subíndice[/sub]</td><td><sub>Texto en subíndice</sub></td></tr><tr><td colspan="2">[sup]Texto en superíndice[/sup]</td><td><sup>Texto en superíndice</sup></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration: underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[yt CÓDIGO DE VÍDEO]</td><td>[yt 9Ut4Y6rBeQo]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/9Ut4Y6rBeQo?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr><tr><td colspan="3"><ul><li>Recuerda siempre cerrar las etiquetas que deben cerrarse.</li><li>El código del vídeo es el que hay después de <span style="font-style: italic;">v=</span> en la URL. Por ejemplo, si el vídeo es <code><nowiki>http://www.youtube.com/watch?v=9Ut4Y6rBeQo</nowiki></code>, solo insertarás <span style="font-weight: bold; font-style: italic;">9Ut4Y6rBeQo</span></li><li>Al insertar una imagen, debes dejar un espacio entre la URL y el último corchete, o la imagen no aparecerá.</ul></td></tr></table>', {
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
// Sonidito de notificación
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
// AFK
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