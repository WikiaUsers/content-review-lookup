/* Importado desde [[:en:MediaWiki:Gadget-refTooltip.js]] */
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

$( function() {
	var i18n = {
		cancelButton: 'Cancelar',
		doneButton: 'Guardar',
		enableLabel: 'Activar vista previa de referencia',
		optionsButtonTitle: 'Cambiar las opciones de vista previa de referencia',
		referencesSectionName: 'Referencias',
		saveFailedStorageFull: "¿Está lleno el almacenamiento local de su navegador?",
		saveFailedTitle: 'Error al guardar las opciones'
	};
	
	var $win = $( window );
	var $body = $( '#content' );
	var $content = $( '#mw-content-text' );
	var $tooltip = $();
	var $tooltipText = $();
	var tooltipRect, tooltipInnerWidth, tooltipOffset, $anchor, anchorRect;
	var showTimer, hideTimer;
	var loggedIn = !!mw.config.get( 'wgUserId' );
	var options = {
		enabled: true
	};
	if ( !loggedIn ) {
		try {
			options = JSON.parse( localStorage.refTooltip );
		} catch ( e ) {}
	}
	
	var createTooltip = function( $anchor, content, showOptions ) {
		// Deshacerse de cualquier toolti`p existente
		$tooltip.remove();
		
		// Crear el tooltip
		$tooltip = $( '<div>' ).addClass( 'ref-tooltip' ).data( {
			anchor: $anchor,
			fresh: true,
		} ).on( 'mouseenter mouseleave', function( e ) {
			// Devolución de llamada a las funciones hover de la referencia cuando se pasa el ratón por encima del tooltip
			$anchor[e.type]();
		} );
		
		$tooltipText = $( '<div>' ).addClass( 'ref-tooltip-text' )
			.append( content ).appendTo( $tooltip );
		if ( showOptions ) {
			$tooltipText.prepend(
				$( '<button>' ).addClass( 'pixel-image ref-tooltip-options-button' )
					.attr( 'title', i18n.optionsButtonTitle )
			);
		}
		$( '<div>' ).addClass( 'ref-tooltip-arrow' ).appendTo( $tooltip );
		$tooltip.appendTo( 'body' );
		// Ajustar el ancho al tamaño del contenido
		$tooltipText.width( $tooltipText.width() + 1 );
		
		setPos( true );
		
		// Los datos evitan que los tooltips se cierren inmediatamente si se abren mediante un clic
		setTimeout( function() {
			$tooltip.removeData( 'fresh' );
		}, 0 );
	};
	var removeTooltip = function() {
		$tooltip.trigger( 'refTooltip-close' );
		
		$tooltip.remove();
		$tooltip = $();
	};
	var getRefText = function( $ref ) {
		var refId = $ref.find( 'a' ).attr( 'href' ).split( '#' )[1];
		var $refText = $( document.getElementById( refId ) ).clone();
		$refText.find( '.mw-cite-backlink' ).remove();
		
		return $refText.html();
	};
	var setPos = function( initial ) {
		if ( !$tooltip.length ) {
			return;
		}
		
		if ( initial ) {
			tooltipRect = $tooltipText[0].getBoundingClientRect();
			tooltipInnerWidth = $tooltipText.width();
			tooltipOffset = {
				top: parseFloat( $tooltipText.css( 'margin-top' ) ),
				left: parseFloat( $tooltipText.css( 'margin-left' ) )
			};
			$anchor = $tooltip.data( 'anchor' );
			anchorRect = $anchor[0].getBoundingClientRect();
		} else {
			$tooltip.removeClass( 'ref-tooltip-flipped' );
			$tooltipText.css( 'margin-left', '' );
		}
		
		// Colocar el tooltip
		var tooltipPos = {
			top: $win.scrollTop(),
			left: $win.scrollLeft()
		};
		if ( anchorRect.top + tooltipOffset.top < tooltipRect.height ) {
			$tooltip.addClass( 'ref-tooltip-flipped' );
			tooltipPos.top += anchorRect.bottom;
		} else {
			tooltipPos.top += anchorRect.top - tooltipRect.height;
		}
		tooltipPos.left += anchorRect.left + anchorRect.width / 2;
		
		// Evitar que se salga de la página
		var contentPadding = parseFloat( $body.css( 'padding-right' ) );
		var contentBoundary = $body[0].getBoundingClientRect().right - contentPadding / 2;
		var overlap = anchorRect.left + tooltipOffset.left + tooltipRect.width - contentBoundary;
		if ( overlap > 0 ) {
			$tooltipText.css(
				'margin-left',
				Math.max( tooltipOffset.left - overlap, -tooltipInnerWidth )
			);
		}
		$tooltip.css( tooltipPos );
	};
	var bindRefHandlers = function() {
		$content.on( {
			'mouseenter.refTooltip': function() {
				var $this = $( this );
				
				clearTimeout( hideTimer );
				
				// Tooltip actual, no hacer nada
				if ( $tooltip.length && (
					$this.is( $tooltip.data( 'anchor' ) ) || $.contains( $tooltip[0], this )
				) ) {
					return;
				}
				
				// Crear el tooltip si el tiempo de espera tiene éxito
				showTimer = setTimeout( function() {
					createTooltip( $this, getRefText( $this ), true );
				}, 200 );
			},
			'mouseleave.refTooltip': function() {
				clearTimeout( showTimer );
				
				// Eliminar el tooltip si el tiempo de espera tiene éxito
				hideTimer = setTimeout( function() {
					removeTooltip();
				}, 300 );
			}
		}, '.reference' );
	};
	
	// Cuando se hace clic en cualquier lugar que no sea el tooltip o el ancla, se elimina inmediatamente
	$( window ).on( 'click.refTooltip', function( e ) {
		if ( $tooltip.length && !$tooltip.data( 'fresh' ) && !$.contains( $tooltip[0], e.target ) ) {
			clearTimeout( showTimer );
			removeTooltip();
		}
	} );
	
	$( document.getElementById( mw.util.escapeIdForAttribute( i18n.referencesSectionName ) ) ).before(
		$( '<button>' ).addClass( 'pixel-image ref-tooltip-options-button' )
			.attr( 'title', i18n.optionsButtonTitle )
	);
	$( 'body' ).on( 'click.refTooltip', '.ref-tooltip-options-button', function( e ) {
		// Solo cierra el tooltip si ya está abierto
		if ( $tooltip.length && $tooltip.data( 'anchor' ).is( e.target ) ) {
			return;
		}
		
		// Desactivar los manejadores de referencias mientras las opciones están abiertas
		$content.off( 'mouseenter.refTooltip mouseleave.refTooltip' );
		$tooltip.on( 'refTooltip-close', function() {
			if ( options.enabled ) {
				bindRefHandlers();
			}
		} );
		
		var $anchor = $( this );
		
		$anchor.addClass( 'ref-tooltip-loading' );
		
		// Reemplazar el tooltip actual si se hace clic en el botón de opciones dentro de un tooltip
		if ( $tooltip.length && $.contains( $tooltip[0], $anchor[0] ) ) {
			$anchor = $tooltip.data( 'anchor' );
		}
		
		mw.loader.using( [ 'mediawiki.api', 'mediawiki.ui.button', 'mediawiki.ui.checkbox' ], function() {
			$anchor.removeClass( 'ref-tooltip-loading' );
			
			var $optionsText = $( '<div>' ).addClass( 'ref-tooltip-options' ).append(
				$( '<div>' ).addClass( 'mw-ui-checkbox' ).append(
					$( '<input>' ).attr( {
						type: 'checkbox',
						id: 'ref-tooltip-options-enabled',
						checked: options.enabled
					} ),
					$( '<label>' ).attr( 'for', 'ref-tooltip-options-enabled' ).text( i18n.enableLabel )
				),
				$( '<div>' ).addClass( 'ref-tooltip-actions' ).append(
					$( '<button>' ).addClass( 'mw-ui-button mw-ui-quiet' ).text( i18n.cancelButton )
						.on( 'click.refTooltip', function() {
							removeTooltip();
						} ),
					$( '<button>' ).addClass( 'mw-ui-button mw-ui-progressive' ).text( i18n.doneButton )
						.on( 'click.refTooltip', function() {
							options.enabled = $( '#ref-tooltip-options-enabled' ).prop( 'checked' );
							var saveOptions = $.Deferred();
							if ( loggedIn ) {
								saveOptions = new mw.Api().postWithToken( 'csrf', {
									action: 'options',
									optionname: 'gadget-refTooltip',
									optionvalue: options.enabled ? undefined : 0
								} );
							} else {
								try {
									localStorage.refTooltip = JSON.stringify( options );
									saveOptions.resolve();
								} catch ( e ) {
									saveOptions.reject( 'storage' );
								}
							}
							
							saveOptions.then( function() {
								removeTooltip();
							}, function( code, error ) {
								mw.notify(
									code === 'storage' ? i18n.saveFailedStorageFull : error,
									{ title: i18n.saveFailedTitle }
								);
							} );
						} )
				)
			);
			
			createTooltip( $anchor, $optionsText, false );
			$tooltip.on( 'refTooltip-close', function() {
				if ( options.enabled ) {
					bindRefHandlers();
				}
			} );
		} );
	} );
	
	// Por último, activar vistas previas de referencia
	if ( options.enabled ) {
		bindRefHandlers();
	}
} );