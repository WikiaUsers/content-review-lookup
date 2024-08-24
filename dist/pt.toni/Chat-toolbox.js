/*Som de notificação*/
$(function() {
        $('.som_notificaçao a').append(' <span style="color:red;">[Desligado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.som_notificaçao').click(function() {
        if($('.som_notificaçao a').text() == "Som de notificação [Desligado]") {
            $('.som_notificaçao a').html('Som de notificação <span style="color:lime;">[Inflamado]</span>');
        } else {
            $('.som_notificaçao a').html('Som de notificação <span style="color:red;">[Desligado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.som_notificaçao a').text() == "Som de notificação [Inflamado]") {
			$("#notificacion")[0].play();
		}
    });
/*Defina o estado ausente, faça-o reiniciar ao escrever e não ao mover o mouse ou ao mudar a janela.*/
    $(window).unbind('mousemove').unbind('focus');
});
	function toggleAway(msg) {
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == true) {
			mainRoom.setBack();
		}
		else {
			mainRoom.setAway(msg);
		}
	}
	toggleAway.back = function() { //Forçar status de volta
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Forçar status ausente
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}
/*Recarregue o bate-papo*/
function recargar()
{
  location.reload();
}