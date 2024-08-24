// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

$( function() {
	$( '.mw-rollback-link > a' ).after( $( '<span>' ).addClass( 'edit-rollback' ).prop( 'title', 'Editar resumen de reversión' ) );
	$( '#mw-content-text' ).on( 'click', '.edit-rollback', function() {
		var $rollback = $( '#rollback-summary' );
		
		if ( $( this ).parent().is( $rollback.parent() ) ) {
			$rollback.toggle();
		} else {
			$rollback.remove();
			
			var name = decodeURIComponent( $( this ).prev().prop( 'href' ).match( /&from=(.+)&token/ )[1].replace( /\+/g, ' ' ) );
			$rollback = $( '<div id="rollback-summary">' ).append(
				$( '<input type="text">' ).addClass( 'mw-ui-input rollback-text' ).prop( { maxlength: 250, spellcheck: true } ).val(
					'Revertidos los cambios de [[Special:Contribs/' + name + '|' + name + ']] ([[User talk:' + name + '|disc.]])'
				),
				$( '<input type="button">' ).addClass( 'mw-ui-button mw-ui-constructive rollback-submit-button' ).val( 'Revertir' )
			).insertAfter( this );
		}
		
		// Esto coloca el cursor al final del texto
		var $text = $rollback.find( '.rollback-text' );
		var summary = $text.val();
		$text.focus().val( '' ).val( summary );
	} );
	
	$( '#mw-content-text' ).on( 'click', '.rollback-submit-button', function() {
		var $link = $( this ).closest( '.mw-rollback-link' );
		window.location = $link.find( 'a' ).prop( 'href' ) + '&summary=' + encodeURIComponent( $link.find( '.rollback-text' ).val() );
	} );
	
	// Permite que se envíe la reversión presionando Intro mientras se enfoca en el campo de entrada
	$( '#mw-content-text' ).on( 'keypress', '.rollback-text', function( e ) {
		if ( e.which !== 13 ) {
			return;
		}
		e.preventDefault();
		$( '.rollback-submit-button' ).click();
	} );
	
	// Cerrar reversión si se hace clic en cualquier otro lugar
	$( window ).click( function( e ) {
		if ( !$( e.target ).is( '#rollback-summary, .edit-rollback' ) && !$( '#rollback-summary' ).has( e.target ).length ) {
			$( '#rollback-summary' ).hide();
		}
	} );
} );