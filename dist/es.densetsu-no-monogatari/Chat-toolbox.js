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
function recargar()
{
  location.reload();
}
function recargar()
{
  location.reload();
}
function ventanamodal(){
    $.showCustomModal( 'Título', 'Contenido de la ventana (Insertar HTML sin presionar ENTER)', {
	    id: "ventanaModal",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Botón 1",
		    handler: function () {
                                window.open('/wiki/','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                         var dialog = $('#ventanaModal');
	                         dialog.closeModal();
		    }
	    }
		]
	});
}
$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://vignette.wikia.nocookie.net/densetsu-no-monogatari/images/a/a7/Sonido_de_notificaci%C3%B3n.ogg/revision/latest?cb=20150606040115&path-prefix=es"></source></audio>');
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
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});