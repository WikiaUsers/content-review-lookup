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

$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});