/*------------------------ Слайдэр на jqueryUI -------------------------------*/
// by User:Tierrie
var slideTime = 15000; // Час паказу слайда (+1-3 секунды, каб слайдары не рабілі гэта адначасова)
mw.loader.using( ['oojs-ui-windows'], function() {
	$(document).ready(function() {
		$(".portal_slider").each(function(index, portal_slider) {
			$(portal_slider).tabs({ fx: {opacity:'toggle', duration:100} } );
			$("[class^=portal_sliderlink]").click(function() {
				$(portal_slider).tabs('select', this.className.replace("portal_sliderlink_", ""));
				return false;
			});
			$(portal_slider).find('#portal_next').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				return false;
			});
			$(portal_slider).find('#portal_prev').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') === 0) ? ($(portal_slider).tabs('length')-1) : $(portal_slider).tabs('option', 'selected') - 1 );
				return false;
			});
			var timerId = setTimeout(function tick() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				timerId = setTimeout(tick, slideTime + Math.floor(Math.random() * 3000));
			}, slideTime + Math.floor(Math.random() * 3000));
		});
	});
});