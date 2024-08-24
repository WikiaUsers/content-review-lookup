importScriptPage('MediaWiki:Chat.js/insertAtCaret.js');
importScriptPage('MediaWiki:Chat.js/listaEmoticons.js');
importScriptPage('ChatTags/code.js', 'dev');
 
/* Reglas del chat */
function ReglasChat() {
    $.showCustomModal( 'Normas del chat', '<ul class="Normas-chat"><li>No "inundar" (flood) el chat con mensajes que no tengan sentido alguno ni copiar y pegar textos arbitrariamente. Está permitido el uso de mayúsculas en el chat siempre y cuando no se exagere en su uso.</li><li>No hacer spam, es decir, no publicar enlaces a otras páginas web desconocidas de manera continua y arbitraria. Se permite la publicación de dichos enlaces siempre y cuando no sea de una manera excesiva como se mencionó anteriormente.</li><li>No revelar datos personales de otros usuarios, tales como contraseñas, direcciones, teléfonos, números de tarjetas de crédito, etc.</li><li>No utilizar palabras obscenas de manera excesiva, sabemos que es un chat y cada quien puede expresar lo que le apetezca, pero siempre debemos de tener un limite, se vería bastante feo ver el chat inundado con palabras vulgares. Si esa clase de palabras van dirigidas hacia algún usuario, el emisor quedará expulsado del chat por el tiempo que los moderadores consideren apropiado.</li>',
        {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Políticas",
		    handler: function () {
				window.open('/wiki/Wiki Paraiso de Steph... Y Peggy:Políticas','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                         var dialog = $('#normasChat');
	                         dialog.closeModal();
		    }
	    }
		]
	});
}
/* Limpiar Chat */
function LimpiarChat() {
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
 
/* Lista de emoticones */
function ListaEmoticones(){
    $.showCustomModal( 'Listado de emoticonos', '<div id="listadeemoticones"><img src="http://images3.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
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
 
/* Cancelar mensaje */
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});
 
function ChatTags(){
    $.showCustomModal( 'Códigos de formato', '<a target="_blank" href="/wiki/w:c:dev:ChatTags">ChatTags</a> creado por el usuario <a target="_blank" href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br /><b>AVISO</b>: Los códigos siempre deben ser cerrados. <table border="1" bordercolor="#A3A3A3" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse;" width="100%" cellpadding="3" cellspacing="3"><tr style="background:#F2F2F2"><th>Código</th><th>Resultado</th></tr><tr><td>[b]Texto en negrita[/b]</td><td><span style="font-weight:bold;">Texto en negrita</span></td></tr><tr><td>[i]Texto en itálica[/b]</td><td><span style="font-style:italic;">Texto en itálica</span></td></tr><tr><td>[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[u]Texto subrayado[/u]</td><td><span style="text-decoration:underline;">Texto subrayado</span></td></tr><tr><td>[c blue]Texto color azul[/c]</td><td><span style="color:blue;">Texto color azul</span></td></tr><tr><td>[f Comic Sans MS]Texto Comic Sans MS[/f]</td><td><span style="font-family:\'Comic Sans MS\'">Texto Comic Sans MS</span></td></tr><tr><td>[bg red]Texto con fondo rojo[/bg]</td><td><span style="background:red;">Texto con fondo rojo</span></td></tr><tr><td>[p]Texto preformateado[/p]</td><td><code>Texto preformateado</code></td></tr><tr><td>[sup]Superíndice[/sup]</td><td><sup>Superíndice</sup></td></tr><tr><td>[sub]Subíndice[/sub]</td><td><sub>Subíndice</sub></td></tr></table>', {
	    id: "ChatTags",
	    width: 600,
            height: 490,
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
 
$(function() {
// Sonidos de notificación
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="http://images.wikia.com/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
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
// Setear estado de ausencia, hacer que se reinicie al escribir y no al mover el mouse ni al cambiar la ventana.
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
	toggleAway.back = function() { //Force back status
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Force away status
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}