function limpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('.Chat ul').append('<div class="inline-alert">Chat cleaned up</div>');
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
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Notification sound [OFF]") {
            $('.sonidonotificacion a').html('Notification sound <span style="color:lime;">[ON]</span>');
        } else {
            $('.sonidonotificacion a').html('Notification sound <span style="color:red;">[OFF]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Notification sound [ON]") {
			$("#notificacion")[0].play();
		}
    });
});