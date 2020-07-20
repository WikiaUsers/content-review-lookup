$('.show_L2').click(function () {
	for ( var hide_L2 = 0; hide_L2 < 11; hide_L2++ ) {
		$('.div_L2_' + hide_L2 ).hide();
	}
	$('.div_L2_' + ( $(this).attr('id') ) ).show();
});