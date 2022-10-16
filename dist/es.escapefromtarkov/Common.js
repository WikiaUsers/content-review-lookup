/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
/* Quest toggle; author: RheingoldRiver */
$.when( mw.loader.using( 'mediawiki.util' ), $.ready ).then( function () { 
	$dealerList = $('.dealer-toggle');
	
	if (! $dealerList.length) {
		return;
	}
	
	function togglecontent(dealer, display) {
		$('.' + dealer + '-content').each(function() {
			$(this).css('display',display);
		});
	}

	function setDealer(index, element) {
	$dealerList.each(function() {
		$(this).removeClass('current-dealer');
		togglecontent($(this).attr('data-dealer'), 'none');
		});
		$(element).addClass('current-dealer');
		togglecontent($(element).attr('data-dealer'),'');
		$.cookie("lastDealer", index, { expires: 3, path: window.location.pathname });
	}
	
	$dealerList.each(function(index) {
		$(this).click(function() {
			setDealer(index, this);
		});
		if (parseInt($.cookie("lastDealer")) === index  || (index === 0 && ! parseInt($.cookie("lastDealer")))) {
			setDealer(index, this);
		}
		else {
			togglecontent($(this).attr('data-dealer'), 'none');
		}
	});
});