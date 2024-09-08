/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Portada */
/** Animación hover NavButton **/
jQuery(document).ready(function($) {	
	$(".NavButton").mouseleave(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		item.animate({ top: topAttr }, {queue:false, duration:300});
	}).mouseenter(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		var curTop = item.css('top');
		typeof topAttr === "undefined" ? item.attr('data-top', curTop) : "";
		item.animate({ top: '0px' }, {queue:false, duration:300});
	});
	$(window).resize(function() {
		$(".NavButton #imove").removeAttr('style');
		$(".NavButton #imove").removeAttr('data-top');
	});
});