/*Som de notifica��o*/
$(function() {
        $('.som_notifica�ao a').append(' <span style="color:red;">[Desligado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.som_notifica�ao').click(function() {
        if($('.som_notifica�ao a').text() == "Som de notifica��o [Desligado]") {
            $('.som_notifica�ao a').html('Som de notifica��o <span style="color:lime;">[Inflamado]</span>');
        } else {
            $('.som_notifica�ao a').html('Som de notifica��o <span style="color:red;">[Desligado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.som_notifica�ao a').text() == "Som de notifica��o [Inflamado]") {
			$("#notificacion")[0].play();
		}
    });
/*Defina o estado ausente, fa�a-o reiniciar ao escrever e n�o ao mover o mouse ou ao mudar a janela.*/
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
	toggleAway.back = function() { //For�ar status de volta
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //For�ar status ausente
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}
/*Recarregue o bate-papo*/
function recargar()
{
  location.reload();
}