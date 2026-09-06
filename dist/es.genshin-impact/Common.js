/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
/* Plantilla:Extra Effect — posicionamiento del globo */
$( function () {
	if ( !$( 'body' ).hasClass( 'skin-fandomdesktop' ) ) {
		return;
	}

	var GAP = 10, EDGE = 8, $activa = null;

	function colocar( wrapper ) {
		var $b = $( wrapper ).children( '.mw-collapsible-content.giw-extra-effect' );
		if ( !$b.length ) { return; }

		$b.removeClass( 'giw-ee-below giw-ee-scroll' ).css( 'max-height', '' );

		var r = wrapper.getBoundingClientRect(),
			bw = $b.outerWidth(),
			bh = $b.outerHeight(),
			arriba = r.top - GAP - EDGE,
			abajo = window.innerHeight - r.bottom - GAP - EDGE,
			top, esAbajo = false;

		if ( bh <= arriba ) {
			top = r.top - bh - GAP;
		} else if ( bh <= abajo ) {
			top = r.bottom + GAP;
			esAbajo = true;
		} else if ( arriba >= abajo ) {
			$b.css( 'max-height', arriba + 'px' ).addClass( 'giw-ee-scroll' );
			top = r.top - $b.outerHeight() - GAP;
		} else {
			$b.css( 'max-height', abajo + 'px' ).addClass( 'giw-ee-scroll' );
			top = r.bottom + GAP;
			esAbajo = true;
		}

		var centro = r.left + r.width / 2,
			left = Math.max( EDGE, Math.min( centro - bw / 2, window.innerWidth - bw - EDGE ) );

		$b.toggleClass( 'giw-ee-below', esAbajo ).css( {
			left: left + 'px',
			top: top + 'px',
			'--ee-arrow': ( centro - left ) + 'px'
		} );
	}

	$( document ).on( 'mouseenter focusin', '.giw-extra-effect-wrapper', function () {
		$activa = this;
		colocar( this );
	} );

	$( document ).on( 'mouseleave focusout', '.giw-extra-effect-wrapper', function () {
		if ( $activa === this ) { $activa = null; }
	} );

	$( window ).on( 'scroll resize', function () {
		if ( $activa ) { colocar( $activa ); }
	} );
} );