// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
// Make the purge tab work as it used to without a confirmation page by
// sending it using POST
'use strict';
$( function() {
	var el = $('#ca-purge a');
	if ($('body').hasClass('skin-fandomdesktop')) {
		el = $('#ca-purge');
	}
	el.on( 'click', function( e ) {
		var $form = $( '<form>' ).attr( {
			method: 'POST',
			action: this.href,
		} ).appendTo( document.body );
		
		$form.submit();
		
		e.preventDefault();
	} );
} );