// Przenieś link do strony dyskusji w widoczne miejsce
require( [
	'jquery',
	'wikia.window'
], function( $, window ) {
	var $talk = $( '#ca-talk' );
	
	if ( !$talk.exists() || window.ShowTalkBtnLoaded ) return;
	window.ShowTalkBtnLoaded = true;

	$talk
		.insertAfter( '.page-header__contribution-buttons .wds-button-group' )
		.addClass( 'wds-button wds-is-secondary' );
} );