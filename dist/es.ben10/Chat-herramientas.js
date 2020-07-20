importScriptPage('MediaWiki:Chat.js/insertAtCaret.js');
importScriptPage('MediaWiki:Chat.js/listaEmoticons.js');

/* Reglas del chat */
function ReglasChat() {
    $.showCustomModal( 'Normas del chat', '<h3>Reglas Generales</h3><ul><li>No se toleran los insultos entre usuarios o páginas.</li><li>Las ediciones realizadas en Ben 10 Wiki se toman como buena fe siempre que no se demuestre lo contrario. No se toleran las ediciones vandálicas o abusivas.</li><li>No se permiten en páginas o imágenes cosas como pornografía, hentai, satanismo, etc.</li><li>No está permitido el spam ni tampoco el flood.</li><li>No se permite abusar de ediciones y categorías sólo para ganar logros.</li><li>En caso de pasar un archivo descargable, obligatoriamente se debe adjuntar un enlace hacia virustotal.com en donde se muestra que el archivo no contiene virus ni ningún tipo de software espía.</li></ul><h3>Chat</h3><ul><li>No revelar datos personales tales como contraseñas, direcciones, teléfonos, números de tarjetas de crédito, etc.</li><li>Está permitido hablar en mayúsculas siempre y cuando no se exagere, ya que el abuso de estas se considera flood.</li><li>Molestar a los usuarios del chat continuamente puede ser considerado razón para un baneo.</li>', {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Reglas de Ben 10 Wiki",
		    handler: function () {
				window.open('/wiki/Ben_10_Wiki:Normas_de_la_comunidad','_blank');
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

/* Cancelar mensaje */
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});

/* Barra de colores */
$(document).ready(function(){
    $('.barracolorchat a').append(' <span style="color:red;">[OFF]</span>');
    $(".Chat ul").after("<div class='inline-alert' style='display:none;' id='BarraColorChat'><span class='rojo' style='color:red;'>Rojo</span> - <span class='amarillo' style='color:yellow;'>Amarillo</span> - <span class='verde' style='color:green;'>Verde</span> - <span class='azul' style='color:blue;'>Azul</span> - <span class='naranja' style='color:orange;'>Naranja</span> - <span class='violeta' style='color:purple;'>Violeta</span> - <span class='rosado' style='color:pink;'>Rosado</span> - <span class='marron' style='color:brown;'>Marrón</span> - <span class='celeste' style='color:skyblue;'>Celeste</span></div>");
    $('.barracolorchat a').click(function(){
        if($('.barracolorchat').text() == "Barra de colores [OFF]") {
            $('#BarraColorChat').fadeIn();
            $('.barracolorchat a').html('Barra de colores <span style="color:lime;">[ON]</span>');
        } else {
            $('#BarraColorChat').fadeOut();
            $('.barracolorchat a').html('Barra de colores <span style="color:red;">[OFF]</span>');
        }
    });
    $('#BarraColorChat span').click(function(){
         var color = $(this).attr('class');
         var alerta=prompt("Inserte texto color " + color,"Soy un texto mágico " + color);
         var contenido = $('textarea').val();
         var codigo = " [[*" + color + "|" + alerta + "]] ";
         if (alerta!=null) {
              $('textarea').val(contenido + codigo);
         }
    });
});

/* Sonidos de notificación */
$(function() {
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
});