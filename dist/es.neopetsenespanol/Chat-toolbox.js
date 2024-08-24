function LimpiarElChat() {
    $('.Chat ul li').fadeOut(200,function(){
        $(this).remove();
    });
    $('.Chat ul').append('<div class="inline-alert">Mensajes eliminados</div>');
    setTimeout(function(){
        $('.Chat ul div').fadeOut(500,function(){
            $(this).remove();
        });
    }, 5000);
}
function RecargarChat()
{
    location.reload();
}
/* Sonido de notificaciones */
$(function() {
    $('.sonidonotificacion a').append(' <span style="color:red;">[apagado]</span>')
    $('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonidos de notificación [apagado]") {
             $('.sonidonotificacion a').html('Sonidos de notificación <span style="color:lime;">[encendido]</span>');
        } else {
            $('.sonidonotificacion a').html('Sonidos de notificación <span style="color:red;">[apagado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonidos de notificación [encendido]") {
            $("#notificacion")[0].play();
        }
    });
});