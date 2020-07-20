/*global jQuery, mediaWiki */
(function( $, mw ) {
	'use strict';

	var PrintDialog = {
		install: function () {
			$( '#t-print a' )
				.click( function ( e ) {
					PrintDialog.open();
					e.preventDefault();
				} )
				.text( 'Print page' );
		},

		open: function () {
			var response,
				$dialog,
				dlgButtons = {};
			dlgButtons.Print = function () {
				$.each( PrintDialog.questions, function ( i, v ) {
					response = $( '#PrintOption' + i ).val();
					if ( v.type === 'checkbox' ) {
						response = $( '#PrintOption' + i ).prop( 'checked' );
					}
					PrintDialog[v.returnvalue] = response;
				} );
				PrintDialog.changePrintCSS();
				PrintDialog.otherEnhancements();
				$(this).dialog( 'close' );
				window.print();
				if( !$.browser.opera ) {
					/* Reload the page to fix the overridden stylesheets */
					window.location = window.location;
				}
			};
			dlgButtons.Cancel = function () {
				$(this).dialog( 'close' );
			};
			$dialog = $( '<div></div>' )
				.html( '<div id="PrintDialogContainer"></div>' )
				.dialog( {
					width: 600,
					modal: true,
					title: 'Print this page',
					draggable: true,
					dialogClass: 'wikiEditor-toolbar-dialog',
					close: function () {
							$(this).dialog( 'destroy' );
							$(this).remove();
					},
					buttons: dlgButtons
				} );
			$.each( PrintDialog.questions, function ( i, v ) {
				 if( v.type === 'checkbox' &&
				 		( v.returnvalue !== 'enhanced' || mw.config.get( 'wgUserName' ) === 'TheDJ' ) )
				 {
					$( '#PrintDialogContainer' ).append( '<input type="checkbox" id="PrintOption' + i + '" ' + (v.checked ? 'checked' : '') + '>' + '<label for="PrintOption' + i + '">' + v.label + '</label><br>' );
				 }
			} );
		}, /* end open */

		changePrintCSS: function () {
			/* Here we:
				 - disable stylesheets that are print specific
				 - make screen specific stylesheets also enabled for print medium
				 - remove print specific stylerules
				 - make screen specific stylerules also enabled for print medium
			*/
			var printStyle = '';
			if( this.enhanced === undefined ) {
 				var i, j, k,
 					rule,
				 	hasPrint,
				 	hasScreen,
				 	rules,
					stylesheet,
					disabled,
				 	stylesheets = document.styleSheets;

				for( i = 0; i < stylesheets.length; i++ ) {
					stylesheet = stylesheets[i];
					disabled = false;
					if( !stylesheet.media ) {
						continue;
					}
					if( stylesheet.media.mediaText && stylesheet.media.mediaText.indexOf( 'print' ) !== -1 ) {
						if(stylesheet.media.mediaText.indexOf( 'screen' ) === -1 ) {
							stylesheet.disabled = true;
						}
					} else if( stylesheet.media.mediaText && stylesheet.media.mediaText.indexOf( 'screen' ) !== -1) {
						if( stylesheet.media.mediaText.indexOf( 'print' ) === -1 ) {
							try {
								stylesheet.media.appendMedium( 'print' );
							} catch( e ) {
								stylesheet.media.mediaText += ',print';
							}
						}
					}

					/* now test individual stylesheet rules */
					try {
						rules = stylesheet.cssRules || stylesheet.rules;
					} catch( e ) {
						/* Cross domain issue. */
						mw.log.warn( 'Not possible to correct stylesheet due to cross origin restrictions.' );
						continue;
					}
					stylesheet.compatdelete = stylesheet.deleteRule || stylesheet.removeRule;
					for( j = 0; rules && j < rules.length; j++ ) {
						rule = rules[j];
						hasPrint = false;
						hasScreen = false;
						if( rule.type === 4 && rule.media ) {
							for( k = 0; k < rule.media.length; k++ ) {
								if( rule.media[k] === 'print' ) {
									hasPrint = true;
								} else if (rule.media[k] === 'screen' ) {
									hasScreen = true;
								}
							}
						} else {
							continue;
						}
						if( hasPrint && !hasScreen ) {
							stylesheet.compatdelete( j );
							j--;
						} else if ( hasScreen && !hasPrint ) {
							stylesheet.media.appendMedium( 'print' );
						}
					}
				}
			}
			/* Add css to hide images */
			if( this.noimages ) {
				printStyle += 'img, .thumb {display:none;}\n';
			}
			/* Add css to hide references markers and the references lists */
			if( this.norefs ) {
				printStyle += '.mw-headline[id="References"], ol.references, .reference {display:none;}\n';
			}
			if( this.notoc ) {
				printStyle += '#toc, .toc {display:none;}\n';
			}
			if( this.nobackground ) {
				printStyle += '* {background:none !important;}\n';
			}
			if( this.blacktext ) {
				printStyle += '* {color:black !important;}\n';
			}

			if ( printStyle ) {
				$( 'head' ).append( '<style type="text/css" media="print">' + printStyle + '</style>' );
			}
		},

		/* Rewrite the "retrieved from" url to be readable */
		otherEnhancements: function () {
			var link = $( 'div.printfooter a' );
			link.text( decodeURI( link.text() ) );
		},

		questions: [
			{
				label: "Hide interface elements (You can only change this on Safari)",
				type: "checkbox",
				checked: true,
				returnvalue: 'enhanced'
			},
			{
				label: 'Hide images',
				type: 'checkbox',
				checked: false,
				returnvalue: 'noimages'
			},
			{
				label: 'Hide references',
				type: 'checkbox',
				checked: false,
				returnvalue: 'norefs'
			},
			{
				label: 'Hide Table of Contents',
				type: 'checkbox',
				checked: false,
				returnvalue: 'notoc'
			},
			{
				label: 'Remove backgrounds',
				type: 'checkbox',
				checked: false,
				returnvalue: 'nobackground'
			},
			{
				label: 'Force all text to black',
				type: 'checkbox',
				checked: true,
				returnvalue: 'blacktext'
			}
		]
	};

	if ( mw.config.get( 'wgNamespaceNumber' ) >= 0 ) {
		$( PrintDialog.install );
		var $stylesheets = $('link[rel="stylesheet"]');
		if ( mw.config.get( 'wgUserName' ) === 'TheDJ' && 'crossOrigin' in $stylesheets.get(0) ) {
			$stylesheets.each( function( index, Element ) {
				Element.crossOrigin = 'anonymous';				
			} );
		}
	}
} ) ( jQuery, mediaWiki );