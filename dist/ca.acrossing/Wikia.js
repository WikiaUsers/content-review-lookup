/*Botones elevadores - by ShermanTheMythran*/
$('.WikiaHeader').append('<span id="button-hub" style="position: fixed; top: 0; left: 60%; margin-top: -7px; transition: margin .5s; -moz-transition: margin .5s; -webkit-transition: margin .5s; -o-transition: margin .5s;"><span class="button" id="scroll-top" title="Subir" style="border-radius: 0 0 0 100% / 0 0 0 10px; -moz-border-radius: 0 0 0 100% / 0 0 0 10px; -webkit-border-radius: 0 0 0 100% / 0 0 0 10px;">▲</span>' + '<span class="button" id="toggle-ads" title="Ocultar anuncios" style="border-radius: 0px; -moz-border-radius:0px; -webkit-border-radius:0px;">●</span>' + '<span class="button" id="hide-rail" title="Ocultar Panel de la Derecha" style="border-radius:0px; -moz-border-radius:0px; -webkit-border-radius:0px;"">►</span>' + '<span class="button" id="scroll-bottom" title="Bajar" style="border-radius: 0 0 100% 0 / 0 0 10px 0; -moz-border-radius: 0 0 100% 0 / 0 0 10px 0; -webkit-border-radius: 0 0 100% 0 / 0 0 10px 0;">▼</span>');
 
$('#scroll-top, .scroll-top').click(function() { $('html, body').animate({scrollTop:0}, 'slow') });
 
$('#scroll-bottom, .scroll-bottom').click(function() { $('html, body').animate({scrollTop:$(document).height()}, 'slow') });

$('#toggle-ads').toggle(function() {
	$('#toggle-ads').attr('title','Mostrar anuncios');
	$('.wikia-ad, .SelfServeUrl, .home-top-right-ads').hide('slow'); },
	function() {
		$('#toggle-ads').attr('title','Ocultar anuncios');
		$('.wikia-ad, .SelfServeUrl, .home-top-right-ads').show('slow');
	}
);

$('#hide-rail').toggle(function() {
	$('#hide-rail').css({'transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-webkit-transform':'rotateY(180deg)','-ms-transform':'scaleX(-1)','-o-transform':'scaleX(-1)'});
	$('#hide-rail').attr('title', 'Show rail');
	$('.WikiaRail').hide('slow');
	$('.WikiaMainContent').animate({width:'1010'}, 'slow'); },
	function() {
		$('#hide-rail').css({'transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','-ms-transform':'scaleX(1)','-o-transform':'scaleX(1)'});
		$('#hide-rail').attr('title', 'Hide rail');
		$('.WikiaRail').show('slow');
		$('.WikiaMainContent').animate({width:'670'}, 'slow');
	}
);