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
    $.showCustomModal( 'Normas del chat', '<h3>Reglas del chat</h3><ul><li>El chat utilizar� el m�todo de <span style="font-style: italic;">kicks</span>. Al cometer una falta a las normas del chat, se dar� un <span style="font-style: italic;">kick</span> despu�s de haber ignorado una advertencia dada por la administraci�n; a los tres kicks consecutivos se banear� al usuario, elimin�ndolo por un tiempo determinado. Cabe destacar que muchas de estas reglas se activan cuando haya en el chat alg�n usuario fuera del <span style="font-style: italic;">c�rculo de confianza</span></li><li>El l�mite de flood (repetici�n de mensajes, emoticones o car�cteres/s�mbolos) es de 30 letras o 8 mensajes (los emoticones autom�ticamente solo se repetir�n 5 veces por mensaje) y 10 im�genes con BBCode.</li><li>El l�mite de spam es de un link �nico por mensaje. La repetici�n o el flood del link ser� causa de kick. Tambi�n est� prohibido escribir o floodear mensajes sin sentido (ejemplo: asdfgeinvinebnrie).</li><li>Procura escribir de una manera que sea entendible hacia los otros usuarios presentes. Lo m�s recomendable es escribir adecuadamente y con uso de una buena ortograf�a.</li><li>Procura no abusar de los c�digos de "ChatTags" (ejemplo: el mismo video de Youtube repetido 40 veces).</li><li>Procura no tener actitudes abusivas o provocativas a otros usuarios. Procura no usar las groser�as como medio de insulto a otro/s usuario/s.</li><li>Procura no usar emoticonos modistas inc�modos como ._. o .-. . No es sancionable pero es molesto en ciertos puntos para algunos.</li><li>Est� prohibido entrar al chat con varias <span style="font-style: italic;">cuentas t�teres</span>.</li><li>El cuestionamiento intencional y agresivo por parte de un usuario de otra comunidad, luego de mostrarse el reglamento, ser� expulsado.</li><li>Queda estrictamente prohibido las peleas por discusi�n de problemas de otras comunidades en el chat p�blico. Si no se trasladan a mensaje privado, ambos usuarios ser�n baneados.</li><li>Queda estrictamente prohibido cualquier tipo de invasi�n hostil. A la primera acci�n fuera del reglamento, el grupo entero ser� baneado. Se notificar� el baneo en un hilo especial en el que se dicten las causas y motivos del mismo.</li><li>Queda estrictamente prohibido pasar im�genes y/o v�deos con contenido <span style="font-style: italic;">pornogr�fico</span>; en este caso se banear� sin advertencia alguna.<h3>Normas de la WikiActividad</h3><ul><li>Las ediciones basura no son permitidas; enti�ndase por <span style="font-style: italic;">edici�n basura</span> como editar muchas veces un art�culo en un mismo plazo de tiempo solo para aumentar el propio contador de ediciones.</li><li>Las peleas tra�das de otras comunidades est�n totalmente prohibidas, advirti�ndose a ambos usuarios sobre esto.</li><li>El cuestionamiento atacante, ofensivo o agresivo de las reglas de la comunidad ser� sancionada con bloqueo de 1 a 2 a�os.</li><li>Si un usuario edita �nicamente para ganar logros, ser� bloqueado despu�s de dos advertencias a trav�s de su muro.</li><li>El nombre de los art�culos debe estar en espa�ol de Latinoam�rica, procurando una redirecci�n desde el nombre usado en Espa�a. Evita traducir tu mismo el art�culo; si no se ha emitido en Latinoam�rica o Espa�a, usa el nombre en ingl�s (original).</li><li>Al realizar vandalismo (ediciones que hacen ver mal los art�culos, por ejemplo), el usuario puede ser bloqueado inmediatamente sin previo aviso.</li><li>No debe abusarse del sistema de creaci�n de cuentas de Wikia; si se poseen demasiadas cuentas sin justificaci�n, se aplicar� la debida sanci�n.</li><li><span style="font-weight: bold;">Cualquier duda sobre las reglas, puedes preguntarle a los bur�cratas presentes.</span>', {
	    id: "reglas",
	    width: 600,
	    height: 430,
	    buttons: [
		{
			id: "cancel",
		    message: "Reglas de Un Show M�s Wiki",
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
    $.showCustomModal( 'Formatos para texto', '<table class="chatTags" width="100%" cellspacing="2" cellpadding="2" style="text-align: center;"><tr><th colspan="3" style="font-size: 180%;"><a href="/wiki/w:c:dev:ChatTags">Etiquetas del chat</a> por <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a></td></tr><tr><th>C�digo a insertar</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td><span style="font-weight: bold;">Texto en negritas</span></td></tr><tr><td>[bg="COLOR"]Texto con fondo[/bg]</td><td>[bg="red"]Texto con fondo rojo[/bg]</td><td><span style="background: red;">Texto con fondo rojo</span></td></tr><tr><td colspan="2">[big]Texto agrandecido[/big]</td><td><big>Texto agrandecido</big></td></tr><tr><td>[c="COLOR"]Texto de color[/c]</td><td>[c="green"]Texto verde[/c]</td><td><span style="color: green;">Texto verde</span></td></tr><tr><td>[font="LETRA FUENTE"]Texto con otra letra fuente[/font]</td><td>[font="Segoe Print"]Texto en Segoe Print[/f]</td><td><span style="font-family: Segoe Print;">Texto en Segoe Print</span></td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td><span style="font-style: italic;">Texto en cursiva</span></td></tr><tr><td>[img="URL DE LA IMAGEN"]</td><td>[img="images4.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png"]</td><td><img src="https://images.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png" style="max-height: 200px; max-width: 200px;"></td></tr><tr><td colspan="2">[code]Texto desformateado[/code]</td><td><code>Texto desformateado</code></td></tr><tr><td colspan="2">[small]Texto achicado[/small]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sub]Texto en sub�ndice[/sub]</td><td><sub>Texto en sub�ndice</sub></td></tr><tr><td colspan="2">[sup]Texto en super�ndice[/sup]</td><td><sup>Texto en super�ndice</sup></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration: underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[yt="C�DIGO DE V�DEO"]</td><td>[yt="dQw4w9WgXcQ"]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/dQw4w9WgXcQ?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr><tr><td colspan="3"><ul><li>Recuerda siempre cerrar las etiquetas que deben cerrarse.</li><li>El c�digo del v�deo es el que hay despu�s de <span style="font-style: italic;">v=</span> en la URL. Por ejemplo: si el v�deo es <code><nowiki>https://www.youtube.com/watch?v=oB2-vnxy8U8&t=6m22s</nowiki></code>, solo insertar�s <span style="font-weight: bold; font-style: italic;">oB2-vnxy8U8</span></li><li>Al insertar una imagen, debes borrar los http:// y no debe aparecer nada despu�s del formato de imagen (jpg, png, gif, etc.), o la imagen no aparecer�.</li><li>Las im�genes de Facebook no se permiten por defecto; y las de Wikia se deben transformar los links "static" y "vignette" a uno que contenga "images". Ejemplo: de el link <code><nowiki>https://vignette.wikia.nocookie.net/regularshow/images/6/6a/Gordoinvisible.gif/revision/latest?cb=20160116012413&path-prefix=es</nowiki></code> tendr� que quedar esto: <code><nowiki>images1.wikia.nocookie.net/regularshow/es/images/6/6a/Gordoinvisible.gif</nowiki></code></ul></td></tr></table>', {
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
/* Sonido de notificaci�n */
$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[Apagado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
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