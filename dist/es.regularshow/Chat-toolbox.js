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
// Reglas del chat
function reglas() {
    $.showCustomModal( 'Normas del chat', '<h3>Reglas del chat</h3><ul><li>El chat utilizará el método de <span style="font-style: italic;">kicks</span>. Al cometer una falta a las normas del chat, se dará un <span style="font-style: italic;">kick</span> después de haber ignorado una advertencia dada por la administración; a los tres kicks consecutivos se baneará al usuario, eliminándolo por un tiempo determinado. Cabe destacar que muchas de estas reglas se activan cuando haya en el chat algún usuario fuera del <span style="font-style: italic;">círculo de confianza</span></li><li>El límite de flood (repetición de mensajes, emoticones o carácteres/símbolos) es de 30 letras o 8 mensajes (los emoticones automáticamente solo se repetirán 5 veces por mensaje) y 10 imágenes con BBCode.</li><li>El límite de spam es de un link único por mensaje. La repetición o el flood del link será causa de kick. También está prohibido escribir o floodear mensajes sin sentido (ejemplo: asdfgeinvinebnrie).</li><li>Procura escribir de una manera que sea entendible hacia los otros usuarios presentes. Lo más recomendable es escribir adecuadamente y con uso de una buena ortografía.</li><li>Procura no abusar de los códigos de "ChatTags" (ejemplo: el mismo video de Youtube repetido 40 veces).</li><li>Procura no tener actitudes abusivas o provocativas a otros usuarios. Procura no usar las groserías como medio de insulto a otro/s usuario/s.</li><li>Procura no usar emoticonos modistas incómodos como ._. o .-. . No es sancionable pero es molesto en ciertos puntos para algunos.</li><li>Está prohibido entrar al chat con varias <span style="font-style: italic;">cuentas títeres</span>.</li><li>El cuestionamiento intencional y agresivo por parte de un usuario de otra comunidad, luego de mostrarse el reglamento, será expulsado.</li><li>Queda estrictamente prohibido las peleas por discusión de problemas de otras comunidades en el chat público. Si no se trasladan a mensaje privado, ambos usuarios serán baneados.</li><li>Queda estrictamente prohibido cualquier tipo de invasión hostil. A la primera acción fuera del reglamento, el grupo entero será baneado. Se notificará el baneo en un hilo especial en el que se dicten las causas y motivos del mismo.</li><li>Queda estrictamente prohibido pasar imágenes y/o vídeos con contenido <span style="font-style: italic;">pornográfico</span>; en este caso se baneará sin advertencia alguna.<h3>Normas de la WikiActividad</h3><ul><li>Las ediciones basura no son permitidas; entiéndase por <span style="font-style: italic;">edición basura</span> como editar muchas veces un artículo en un mismo plazo de tiempo solo para aumentar el propio contador de ediciones.</li><li>Las peleas traídas de otras comunidades están totalmente prohibidas, advirtiéndose a ambos usuarios sobre esto.</li><li>El cuestionamiento atacante, ofensivo o agresivo de las reglas de la comunidad será sancionada con bloqueo de 1 a 2 años.</li><li>Si un usuario edita únicamente para ganar logros, será bloqueado después de dos advertencias a través de su muro.</li><li>El nombre de los artículos debe estar en español de Latinoamérica, procurando una redirección desde el nombre usado en España. Evita traducir tu mismo el artículo; si no se ha emitido en Latinoamérica o España, usa el nombre en inglés (original).</li><li>Al realizar vandalismo (ediciones que hacen ver mal los artículos, por ejemplo), el usuario puede ser bloqueado inmediatamente sin previo aviso.</li><li>No debe abusarse del sistema de creación de cuentas de Wikia; si se poseen demasiadas cuentas sin justificación, se aplicará la debida sanción.</li><li><span style="font-weight: bold;">Cualquier duda sobre las reglas, puedes preguntarle a los burócratas presentes.</span>', {
	    id: "reglas",
	    width: 600,
	    height: 430,
	    buttons: [
		{
			id: "cancel",
		    message: "Reglas de Un Show Más Wiki",
		    handler: function () {
				window.open('/wiki/project:Reglas','_blank');
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
    $.showCustomModal( 'Formatos para texto', '<table class="chatTags" width="100%" cellspacing="2" cellpadding="2" style="text-align: center;"><tr><th colspan="3" style="font-size: 180%;"><a href="/wiki/w:c:dev:ChatTags">Etiquetas del chat</a> por <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a></td></tr><tr><th>Código a insertar</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td><span style="font-weight: bold;">Texto en negritas</span></td></tr><tr><td>[bg="COLOR"]Texto con fondo[/bg]</td><td>[bg="red"]Texto con fondo rojo[/bg]</td><td><span style="background: red;">Texto con fondo rojo</span></td></tr><tr><td colspan="2">[big]Texto agrandecido[/big]</td><td><big>Texto agrandecido</big></td></tr><tr><td>[c="COLOR"]Texto de color[/c]</td><td>[c="green"]Texto verde[/c]</td><td><span style="color: green;">Texto verde</span></td></tr><tr><td>[font="LETRA FUENTE"]Texto con otra letra fuente[/font]</td><td>[font="Segoe Print"]Texto en Segoe Print[/f]</td><td><span style="font-family: Segoe Print;">Texto en Segoe Print</span></td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td><span style="font-style: italic;">Texto en cursiva</span></td></tr><tr><td>[img="URL DE LA IMAGEN"]</td><td>[img="images4.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png"]</td><td><img src="https://images.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png" style="max-height: 200px; max-width: 200px;"></td></tr><tr><td colspan="2">[code]Texto desformateado[/code]</td><td><code>Texto desformateado</code></td></tr><tr><td colspan="2">[small]Texto achicado[/small]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sub]Texto en subíndice[/sub]</td><td><sub>Texto en subíndice</sub></td></tr><tr><td colspan="2">[sup]Texto en superíndice[/sup]</td><td><sup>Texto en superíndice</sup></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration: underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[yt="CÓDIGO DE VÍDEO"]</td><td>[yt="dQw4w9WgXcQ"]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/dQw4w9WgXcQ?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr><tr><td colspan="3"><ul><li>Recuerda siempre cerrar las etiquetas que deben cerrarse.</li><li>El código del vídeo es el que hay después de <span style="font-style: italic;">v=</span> en la URL. Por ejemplo: si el vídeo es <code><nowiki>https://www.youtube.com/watch?v=oB2-vnxy8U8&t=6m22s</nowiki></code>, solo insertarás <span style="font-weight: bold; font-style: italic;">oB2-vnxy8U8</span></li><li>Al insertar una imagen, debes borrar los http:// y no debe aparecer nada después del formato de imagen (jpg, png, gif, etc.), o la imagen no aparecerá.</li><li>Las imágenes de Facebook no se permiten por defecto; y las de Wikia se deben transformar los links "static" y "vignette" a uno que contenga "images". Ejemplo: de el link <code><nowiki>https://vignette.wikia.nocookie.net/regularshow/images/6/6a/Gordoinvisible.gif/revision/latest?cb=20160116012413&path-prefix=es</nowiki></code> tendrá que quedar esto: <code><nowiki>images1.wikia.nocookie.net/regularshow/es/images/6/6a/Gordoinvisible.gif</nowiki></code></ul></td></tr></table>', {
	    id: "chatTags",
	    width: 700,
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
/* Sonido de notificación */
$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[Apagado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
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
/* Setear estado de ausencia, hacer que se reinicie al escribir y no al mover el mouse ni al cambiar la ventana. */
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