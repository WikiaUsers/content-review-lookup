// See [[mw:Reference Tooltips]]
// Source https://en.wikipedia.org/wiki/MediaWiki:Gadget-ReferenceTooltips.js

$( function () {
	var settings, settingsString, $footer, enabled, delay, isTouchscreen, settingsMenu;

	if ( window.pg ) {
		return;
	}

	function toggleRT( enable ) {
		mw.loader.using( 'jquery.cookie', function () {
			$.cookie( 'RTsettings', ( enable ? '1' : '0' ) + '|' + settings[ 1 ] + '|' + settings[ 2 ], { path: '/', expires: 90 } );
			location.reload();
		} );
	}

	// Make sure we are in article, project, or help namespace
	if ( $.inArray( mw.config.get( 'wgCanonicalNamespace' ), [ '', 'Project', 'Help', 'Draft' ] ) !== -1 ) {
		mw.messages.set( {
			'RT-enable': 'Enable Reference Tooltips',
			'RT-disable': 'Disable Reference Tooltips',
			'RT-disablenote': 'Once disabled, Reference Tooltips can be re-enabled using a link in the footer of the page.',
			'RT-delay': 'Delay before the tooltip appears (in milliseconds): ',
			'RT-activationmethod': 'Tooltip is activated by:',
			'RT-hovering': 'hovering',
			'RT-clicking': 'clicking',
			'RT-options': 'Reference Tooltips options',
			'RT-options-save': 'Save settings',
			'RT-settings': 'Tooltip settings'
		} );
		settingsString = document.cookie.split( 'RTsettings=' )[ 1 ];
		if ( settingsString ) {
			settings = settingsString.split( ';' )[ 0 ].split( '%7C' );
			enabled = !!+settings[ 0 ];
			delay = +settings[ 1 ];
			isTouchscreen = !!+settings[ 2 ];
		} else {
			enabled = true;
			delay = 200;
			isTouchscreen = 'ontouchstart' in document.documentElement;
		}
		if ( !enabled ) {
			$footer = $( '#footer-places, #f-list' );
			if ( $footer.length === 0 ) {
				$footer = $( '#footer li' ).parent();
			}
			$footer.append( $( '<li>' ).append(
				$( '<a>' )
					.text( mw.message( 'RT-enable' ) )
					.attr( 'href', '' )
					.on( 'click', function ( e ) {
						e.preventDefault();
						toggleRT( true );
					} )
			) );
			return;
		}

		$( '.reference' ).each( function () {
			var tooltipNode, hideTimer, showTimer, checkFlip = false;
			function findRef( h ) {
				h = h.firstChild; h = h && h.getAttribute && h.getAttribute( 'href' ); h = h && h.split( '#' ); h = h && h[ 1 ];
				h = h && document.getElementById( h );
				h = h && h.nodeName === 'LI' && h;
				return h;
			}
			function hide( refLink ) {
				if ( tooltipNode && tooltipNode.parentNode === document.body ) {
					hideTimer = setTimeout( function () {
						$( tooltipNode ).animate( { opacity: 0 }, 100, function () { document.body.removeChild( tooltipNode ); } );
					}, isTouchscreen ? 16 : 100 );
				} else {
					$( findRef( refLink ) ).removeClass( 'RTTarget' );
				}
			}
			function show() {
				if ( !tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11 ) {
					document.body.appendChild( tooltipNode );
					checkFlip = true;
				}
				$( tooltipNode ).stop().animate( { opacity: 1 }, 100 );
				clearTimeout( hideTimer );
			}
			function openSettingsMenu() {
				if ( settingsMenu ) {
					settingsMenu.dialog( 'open' );
				} else {
					settingsMenu = $( '<form>' )
						.append(
							$( '<button>' )
								.css( 'width', '100%' )
								.text( mw.msg( 'RT-disable', mw.user ) )
								.button()
								.on( 'click', function ( e ) {
									e.preventDefault();
									toggleRT( false );
								} ),
							$( '<br>' ),
							$( '<small>' ).text( mw.msg( 'RT-disablenote' ) ),
							$( '<hr>' ),
							$( '<label>' ).text( mw.msg( 'RT-delay' ) ).append( $( '<input>' ).attr( {
								type: 'number',
								value: delay,
								step: 50,
								min: 0,
								max: 5000
							} ) ),
							$( '<br>' ),
							$( '<span>' ).text( mw.msg( 'RT-activationmethod', mw.user ) ),
							$( '<label>' ).append(
								$( '<input>' ).attr( {
									type: 'radio',
									name: 'RTActivate',
									checked: !isTouchscreen ? 'checked' : undefined,
									disabled: 'ontouchstart' in document.documentElement ? 'disabled' : undefined
								} ),
								mw.msg( 'RT-hovering', mw.user )
							),
							$( '<label>' ).append(
								$( '<input>' ).attr( {
									type: 'radio',
									name: 'RTActivate',
									checked: isTouchscreen ? 'checked' : undefined
								} ),
								mw.msg( 'RT-clicking', mw.user )
							)
						)
						.submit( function ( e ) { e.preventDefault(); } )
						.dialog( {
							modal: true,
							width: 500,
							title: mw.msg( 'RT-options' ),
							buttons: [ {
								text: mw.msg( 'RT-options-save', mw.user ),
								click: function () {
									var inputs = this.getElementsByTagName( 'input' ),
										newDelay = +inputs[ 0 ].value;
									$.cookie( 'RTsettings',
										'1|' +
										( newDelay > -1 && newDelay < 5001 ? newDelay : delay ) +
										'|' +
										// hover/click
										( inputs[ 1 ].checked ? '0' : '1' ),
										{ path: '/', expires: 90 }
									);
									location.reload();
								}
							} ]
						} );
				}
			}
			function onStartEvent( e ) {
				var onBodyClick, self = this;
				if ( window.pg ) {
					return;
				}
				if ( isTouchscreen ) {
					e.preventDefault();
					if ( !( tooltipNode && tooltipNode.parentNode === document.body ) ) {
						onBodyClick = function ( e ) {
							e = e || event;
							e = e.target || e.srcElement;
							for ( ; e && !$( e ).hasClass( 'referencetooltip' ); ) { e = e.parentNode; }
							if ( !e ) {
								clearTimeout( showTimer );
								hide( self );
								$( document.body ).off( 'click touchstart', onBodyClick );
							}
						};
						setTimeout( function () {
							$( document.body ).on( 'click touchstart', onBodyClick );
						} );
					}
				}
				if ( hideTimer ) { clearTimeout( hideTimer ); }
				if ( showTimer ) { clearTimeout( showTimer ); }
				showTimer = setTimeout( function () {
					var windowTop, hOffsetTop, c, o, oH,
						h = findRef( self );
					if ( !h ) { return; }
					windowTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
					hOffsetTop = $( h ).offset().top;
					if ( !isTouchscreen && windowTop < hOffsetTop && windowTop + $( window ).height() > hOffsetTop + h.offsetHeight ) {
						$( h ).addClass( 'RTTarget' );
						return;
					}
					if ( !tooltipNode ) {
						tooltipNode = document.createElement( 'ul' );
						tooltipNode.className = 'referencetooltip';
						c = tooltipNode.appendChild( $( h ).clone( true )[ 0 ] );
						try {
							if ( c.firstChild.nodeName !== 'A' ) {
								while ( c.childNodes[ 1 ].nodeName === 'A' && c.childNodes[ 1 ].getAttribute( 'href' ).indexOf( '#cite_ref-' ) !== -1 ) {
									do { c.removeChild( c.childNodes[ 1 ] ); } while ( c.childNodes[ 1 ].nodeValue === ' ' );
								}
							}
						} catch ( err ) { mw.log( err ); }
						c.removeChild( c.firstChild );
						$( tooltipNode.firstChild.insertBefore( document.createElement( 'span' ), tooltipNode.firstChild.firstChild ) ).addClass( 'RTsettings' )
							.attr( 'title', mw.msg( 'RT-settings' ) )
							.on( 'click', function () {
								mw.loader.using( [ 'jquery.cookie', 'jquery.ui.dialog' ], openSettingsMenu );
							} );
						tooltipNode.appendChild( document.createElement( 'li' ) );
						if ( !isTouchscreen ) {
							$( tooltipNode ).on( 'mouseenter', show ).on( 'mouseleave', hide );
						}
					}
					show();
					o = $( self ).offset();
					oH = tooltipNode.offsetHeight;
					$( tooltipNode ).css( { top: o.top - oH, left: o.left - 7 } );
					if ( tooltipNode.offsetHeight > oH ) { // is it squished against the right side of the page?
						$( tooltipNode ).css( { left: 'auto', right: 0 } );
						tooltipNode.lastChild.style.marginLeft = ( o.left - tooltipNode.offsetLeft ) + 'px';
					}
					if ( checkFlip ) {
						if ( o.top < tooltipNode.offsetHeight + ( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 ) ) { // is part of it above the top of the screen?
							$( tooltipNode ).addClass( 'RTflipped' ).css( { top: o.top + 12 } );
						} else if ( tooltipNode.className === 'referencetooltip RTflipped' ) { // cancel previous
							$( tooltipNode ).removeClass( 'RTflipped' );
						}
						checkFlip = false;
					}
				}, isTouchscreen ? 0 : delay );
			}
			function onEndEvent() {
				clearTimeout( showTimer ); hide( this );
			}
			$( this ).on( isTouchscreen ? { click: onStartEvent } : { mouseenter: onStartEvent, mouseleave: onEndEvent } );
		} );
	}
} );