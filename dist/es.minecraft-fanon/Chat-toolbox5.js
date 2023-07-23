// Reload chat

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

/* Notification sounds */
$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Notification sounds [OFF]") {
            $('.sonidonotificacion a').html('Notification sounds <span style="color:lime;">[ON]</span>');
        } else {
            $('.sonidonotificacion a').html('Notification sounds <span style="color:red;">[OFF]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Notification sounds [ON]") {
			$("#notificacion")[0].play();
		}
    });
});