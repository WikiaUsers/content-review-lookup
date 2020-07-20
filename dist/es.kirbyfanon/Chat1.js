// Chat.js
// Obviamente, hecho por Giovi ._.

importScriptPage('ChatOptions/code.js', 'dev');
importScript('MediaWiki:Chat.js/insertAtCaret.js');
importScript('MediaWiki:Chat.js/listaEmoticons.js');
importScriptPage('User:' + wgUserName + '/global.js', 'c');
 
$(function() {
    $('#ChatHeader').append($('ul.dropdown'));
    $("#Chat_1548 ul").after("<div class='inline-alert' id='BarraColorChat' style='display:none;'><span id='ColorRojo' style='color:red;'>Rojo</span> - <span id='ColorAmarillo' style='color:yellow;'>Amarillo</span> - <span id='ColorVerde' style='color:green;'>Verde</span> - <span id='ColorAzul' style='color:blue;'>Azul</span> - <span id='ColorNaranja' style='color:orange;'>Naranja</span> - <span id='ColorVioleta' style='color:purple;'>Violeta</span> - <span id='ColorRosado' style='color:pink;'>Rosado</span> - <span id='ColorMarron' style='color:brown;'>Marrón</span> - <span id='ColorCeleste' style='color:skyblue;'>Celeste</span> - <span id='ayuda'>[?]</span></div>");
});

$(function(){
    $('#barracolores').on('click', function(evento){
        evento.preventDefault();
        if($('#barracolores').html() == "Barra de colores [OFF]") {
            $('#BarraColorChat').fadeIn('fast');
            $('#barracolores').html('Barra de colores [ON]');
        }
        else {
            $('#BarraColorChat').fadeOut('slow');
            $('#barracolores').html('Barra de colores [OFF]');
        }
    });
    $("#BarraColorChat #ayuda").click(function() {
        alert("Wiki Kirby Fanon \n_________________________________________\n\nPara escribir con colores: \n\u2299 [[*rojo|Texto color rojo]]\n\u2299 [[*amarillo|Texto color amarillo]]\n\u2299 [[*verde|Texto color verde]]\n\u2299 [[*azul|Texto color azul]]\n\u2299 [[*naranja|Texto color naranja]]\n\u2299 [[*violeta|Texto color violeta]]\n\u2299 [[*rosa|Texto color rosa]]\n\u2299 [[*marron|Texto color marrón]]\n\u2299 [[*celeste|Texto color celeste]]");
    });
});
 
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