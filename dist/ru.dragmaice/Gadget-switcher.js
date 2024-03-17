'use strict';
$( function () {
	$.each( document.querySelectorAll( '.switcher-container' ), function ( i, container ) {
		if ( i == 0 ) { mw.loader.using(['mediawiki.util'], function(){mw.util.addCSS('.switcher-container label input{margin-right:0.5em}')}) }
		var selected, $radio;
		var switchers = []
		var radioName = 'switcher-' + i;
		$.each( container.children, function ( j, switcher ) {
			var label = switcher.querySelector( '.switcher-label' );
			if ( !label || !label.childNodes.length ) {
				return;
			}
			switchers.push( switcher );
			$radio = $( '<input>' ).prop({ type: 'radio', name: radioName }).on( 'click', function () {
				$( selected ).hide();
				$( switcher ).show();
				selected = switcher;
			} );
			if ( !selected ) {
				// Mark the first one as selected
				selected = switcher;
				$radio.prop( 'checked', true );
			} else if ( label.getAttribute( 'data-switcher-default' ) !== null ) {
				// Custom default
				$radio.click();
			} else {
				// Hide non-default
				$( switcher ).hide();
			}
			$( '<label style="display:block"></label>' ).append( $radio, label.childNodes ).appendTo( container );
			$( label ).remove();
		} );
		if ( switchers.length > 1 ) {
			$( '<label style="display:block">Show all</label>' ).prepend(
				$( '<input>' ).prop({ type: 'radio', name: radioName }).on( 'click', function () {
					$( switchers ).show();
					selected = switchers;
				} )
			).appendTo( container );
		}
		if ( switchers.length === 1 ) {
			$radio.remove();
		}
	} );
} );