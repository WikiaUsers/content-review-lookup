// USAR LOS C�DIGOS BAJO TU PROPIO RIESGO.
// -------------------------------------------------------------------
 
importScriptPage('MediaWiki:Chat.js/insertAtCaret.js','es.ben10');
importScriptPage('MediaWiki:Chat.js/listaEmoticons.js','es.ben10');
 
// "Pegar" el men� desplegable al ChatHeader
// Al apretar "ESC" borrar lo que se encuentra en el textarea
$(function() {
	$("ul.dropdown").appendTo("#ChatHeader");
	$('textarea[name="message"]').bind('keypress', function(e) {
	    if(e.keyCode==27){
	        $(this).val('');
	    }
	});
    $("#Chat_22 ul").after("<div class='inline-alert' id='BarraColorChat' style='display:none;'><span id='ColorRojo' style='color:red;'>Rojo</span> - <span id='ColorAmarillo' style='color:yellow;'>Amarillo</span> - <span id='ColorVerde' style='color:green;'>Verde</span> - <span id='ColorAzul' style='color:blue;'>Azul</span> - <span id='ColorNaranja' style='color:orange;'>Naranja</span> - <span id='ColorVioleta' style='color:purple;'>Violeta</span> - <span id='ColorRosado' style='color:pink;'>Rosado</span> - <span id='ColorMarron' style='color:brown;'>Marr�n</span> - <span id='ColorCeleste' style='color:skyblue;'>Celeste</span> - <span id='ayuda'>[?]</span></div>");
});
 
// Bot�n "LIMPIAR CHAT"
$("#LimpiarChat").click(function() {
	$('#Chat_22 ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('#Chat_22 ul').append('<div class="inline-alert">Chat limpiado</div>');
	setTimeout(function(){
		$('#Chat_22 ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
});
 
function ReglasChat(){
    $.showCustomModal( 'Normas del chat', '<h3 style="font-weight:bold;">Reglas Generales</h3><ul><li>Se proh�ben insultos entre usuarios o p�ginas.</li><li>No se permite pornograf�a (tanto escrita como gr�fica, y tampoco "censurada").</li><li>No se tolerar� el [[Ayuda:Spam|Spam]] (tanto interno como externo) ni el [[Ayuda:Flood|Flood]].</li><li>Editar art�culos de otros sin tener autorizaci�n previa. Los cambios menores est�n permitidos.</li><li>La firma de usuario no debe superar los 100px de ancho y 50px de alto.</li><li>La comisar�a y la adopci�n de series deben tomarse en serio: su abuso est� prohibido.</li><li>El uso del foro de [[Foro:Noticias de la Wiki|noticias]] est� restringido solo para administradores.</li><li>El uso de may�sculas est� permitido, siempre y cuando <b>no haya una exageraci�n</b> en su uso.</li></ul><h3 style="font-weight:bold;">Chat</h3><ul><li>No "inundar" (<a href="/wiki/Ayuda:Flood" title="Ayuda:Flood">Flood</a>) el chat con mensajes basura ni copiar y pegar un texto largo en el chat.</li><li>No hacer <a href="/wiki/Ayuda:Spam" title="Ayuda:Spam">Spam</a>, es decir, publicar enlaces a otras p�ginas web desconocidas sin antes pedir confirmaci�n a un administrador para su env�o.</li><li>No revelar datos personales tales como contrase�as, direcciones, tel�fonos, n�meros de tarjetas de cr�dito, etc.</li><li>Hablar con may�sculas es sin�nimo de gritar; por lo tanto, no abuses de las may�sculas.</li><li>Molestar a los usuarios del Chat continuamente puede ser considerado raz�n para un baneo.</li>', {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Reglas de Ben 10 Fanon Wiki",
		    handler: function () {
				listadoReglas();
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
				cerrarDialog();
		    }
	    }
		]
	});
}
 
function listadoReglas() {
         window.open('/wiki/Ben_10_fanon_Wiki:Reglas','_blank');
}
 
function cerrarDialog() {
	var dialog = $('#normasChat');
	dialog.closeModal();
}
 
// ColorChat
function colorChat() {
    $("#BarraColorChat").fadeToggle(500);
    $("#BarraColorChat #ayuda").click(function() {
        alert("Comunidad Ben 10 Fanon Wiki - donde las creaciones no son de este mundo...\n______________________________________\n\nPara escribir con colores: \n\u2299 [[*rojo|Texto color rojo]]\n\u2299 [[*amarillo|Texto color amarillo]]\n\u2299 [[*verde|Texto color verde]]\n\u2299 [[*azul|Texto color azul]]\n\u2299 [[*naranja|Texto color naranja]]\n\u2299 [[*violeta|Texto color violeta]]\n\u2299 [[*rosa|Texto color rosa]]\n\u2299 [[*marron|Texto color marr�n]]\n\u2299 [[*celeste|Texto color celeste]]");
    });
}
/* Sonidos de notificaci�n
$(function() {
	$('#notifSound').text('Sonidos de notificaci�n');
	$('#ChatHeader').append('<audio preload="auto"><source src="http://images.wikia.com/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
	$("#notifSound").click(function() {
		window.alert("Sonidos activados correctamente");
		$('#Chat_22 ul').bind('DOMNodeInserted', function(event) {
			$("audio")[0].play();
		});
		$('#notifSound').text('Desactivar sonidos de notificaci�n');
		$('#notifSound').attr('id','desnotifSound');
		$('#desnotifSound').attr('href','/wiki/Especial:Chat');
	});
});
*/
// Listado de emoticones
function ListaEmoticones(){
    $.showCustomModal( 'Listado de emoticones', '<div id="listadeemoticones"><img src="http://images3.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
	    id: "listaEmoticones",
	    width: 600,
            height: 400,
	    buttons: [
		{
			id: "cancel",
		    message: "Avanzado",
		    handler: function () {
				mediawikiEmoticons();
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
				cerrarDialogDos();
		    }
	    }
		]
	});
}
 
function mediawikiEmoticons() {
         window.open('/wiki/MediaWiki:Emoticons','_blank');
}
 
function cerrarDialogDos() {
	var dialog = $('#listaEmoticones');
	dialog.closeModal();
}