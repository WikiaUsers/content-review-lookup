/* 
 * Pływająca ramka Facebooka
 * Autor nieznany, poprawił Railfail536 dla Gothicpedii
 */
$(function() {
	// Ładuj tylko raz
	if (window.FloatingFBLoaded) return;
	window.FloatingFBLoaded = true;
 
	// Funkcja
	$(document).ready(function() {
 
		// Dodaj ramkę do strony
		$('body').append(
			$('<div>', {
				id: 'FacebookWnd'
			}).append(
 
				// Zawartość
				$('<iframe>', {
					src: '//facebook.com/plugins/page.php?href=https://facebook.com/Yandere-Simulator-Wikia-582044482198166/&tabs=timeline&width=240&height=360&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=true&appId',
					width: 240,
					height: 360,
					scrolling: 'no',
					frameborder: 0,
					allowTransparency: true,
					allow: 'encrypted-media'
				})
			)
		);
 
		// Funkcja odpowiedzialna za animację
		function toggleFacebookWnd() {
			if (parseInt($('#FacebookWnd').css('right')) !== 0) $('#FacebookWnd').animate({
				right: '0px'
			}, 700);
			else $('#FacebookWnd').animate({
				right: '-240px'
			}, 700);
		}
 
		// Wywoływacz
		$('#FacebookWnd').click(function() {
			toggleFacebookWnd();
		});
 
	});
});