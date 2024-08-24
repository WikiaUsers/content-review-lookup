;( function(window, $, mw) {
	'use strict';
	
	$( '.mw-rollback-link > a' ).after( $( '<span>' ).addClass( 'edit-rollback' ).prop( 'title', 'Zurücksetzen-Zusammenfassung bearbeiten' ) );
	$( '#mw-content-text' ).on( 'click', '.edit-rollback', function() {
		var $rollback = $( '#rollback-summary' );
		
		if ( $( this ).parent().is( $rollback.parent() ) ) {
			$rollback.toggle();
		} else {
			$rollback.remove();
			
			var name = decodeURIComponent( $( this ).prev().prop( 'href' ).match( /&from=(.+)&token/ )[1].replace( /\+/g, ' ' ) );
			$rollback = $( '<div id="rollback-summary">' ).append(
				$( '<input type="text">' ).addClass( 'mw-ui-input rollback-text' ).prop( { maxlength: 250, spellcheck: true } ).val(
					'Letzte Bearbeitungen von [[Spezial:Beiträge/' + name + '|' + name + ']] ([[Benutzer Diskussion:' + name + '|Diskussion]]) zurückgesetzt.'
				),
				$( '<input type="button">' ).addClass( 'mw-ui-button mw-ui-constructive rollback-submit-button' ).val( 'Zurücksetzen' )
			).insertAfter( this );
		}
		
		// This puts the cursor at the end of the text
		var $text = $rollback.find( '.rollback-text' );
		var summary = $text.val();
		$text.focus().val( '' ).val( summary );
	} );
	
	$( '#mw-content-text' ).on( 'click', '.rollback-submit-button', function() {
		var $link = $( this ).closest( '.mw-rollback-link' );
		window.location = $link.find( 'a' ).prop( 'href' ) + '&summary=' + encodeURIComponent( $link.find( '.rollback-text' ).val() );
	} );
	
	// Allow rollback to be submitted by pressing enter while focused on the input field
	$( '#mw-content-text' ).on( 'keypress', '.rollback-text', function( e ) {
		if ( e.which !== 13 ) {
			return;
		}
		e.preventDefault();
		$( '.rollback-submit-button' ).click();
	} );
	
	// Close rollback if clicked anywhere else
	$( window ).click( function( e ) {
		if ( !$( e.target ).is( '#rollback-summary, .edit-rollback' ) && !$( '#rollback-summary' ).has( e.target ).length ) {
			$( '#rollback-summary' ).hide();
		}
	} );
})(window, window.jQuery, window.mediaWiki);