/* Any JavaScript here will be loaded for all users on every page load. */
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
	
	$dealerList.each(function() {
		$(this).click(function() {
			$dealerList.each(function() {
				$(this).removeClass('current-dealer');
				togglecontent($(this).attr('data-dealer'), 'none');
			});
			$(this).addClass('current-dealer');
			togglecontent($(this).attr('data-dealer'),'');
		});
	});
});