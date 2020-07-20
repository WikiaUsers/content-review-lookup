function limpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('.Chat ul').append('<div class="inline-alert">Chat limpiado.</div>');
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
 
/* Sonidos de notificación */
$(function() {
        $('.sonidonotificacion a').append('[OFF]');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonido de notificación [OFF]") {
            $('.sonidonotificacion a').html('Sonido de notificación [ON]');
        } else {
            $('.sonidonotificacion a').html('Sonido de notificación [OFF]');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonido de notificación [ON]") {
			$("#notificacion")[0].play();
		}
    });
});