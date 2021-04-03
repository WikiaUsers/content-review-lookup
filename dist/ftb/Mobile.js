/** <pre>
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 *
 * To see which scripts this has loaded, see `ftb.loaded` (from your js console)
 */
 
 /*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
	eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
	latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
	onevar:false, plusplus:false, quotmark:single, undef:true, unused:true,
	strict:true, trailing:true, multistr:true
*/

;( function ( $, mw, ftb ) {

	'use strict';

	/**
	 * Versioning handler
	 */
	ftb.version = '1.1';

	/**
	 * Cache mw.config values
	 *
	 * These are used in conditionals for checking various mediawiki settings
	 * For a full list of available variables see <http://www.mediawiki.org/wiki/Manual:Interface/JavaScript#mw.config>
	 */
	var conf = mw.config.get( [
		'wgAction',
		'wgCanonicalSpecialPageName',
		'wgNamespaceNumber',
		'wgTitle',
		'wgUserName'
	] );

	/**
	 * Settings of each script run/imported
	 *
	 * This is where each script on the wiki is imported
	 * To import a new script see the example just below
	 *
	 * When adding new scripts, please keep them in alphabetical order
	 */
	var includes = {
		/*
		example: {
			// {function|boolean} Conditional to pass for exec to run
			// Can be something that evaluates to a boolean if required
			// If it should always load, set to true
			conditional: true,

			// {function} Function to run
			exec: function () {
				console.log( 'loaded' );
			}
		}
		*/

		/**
		 * Lazy loading
		 *
		 * @author Unknown
		 */
		lazy: {
			conditional: $( '.load-page' ).length,
			exec: function () {
				$( '.load-page-button > a' ).click( function( e ) {
					e.preventDefault();
					var button = $( this ).parent(),
						body = button.closest( '.load-page' );
					$(this).html('Loading');
					new mw.Api().get( {
						action: 'parse',
						prop: 'text',
						page: body.data( 'page' )
					} ).done( function ( data ) {
						console.log( 'Loaded data!' );
						body.html( data.parse.text['*'] );
						mw.hook( 'wikipage.content' ).fire( body );
					} ).fail( function () {
						console.log( 'Failed to load data!' );
					} );
					console.log( 'Firing request to load data!' );
				} );
			}
		},

		/**
		 * Grid tank container handler
		 *
		 * @author Unknown
		 */
		gridTank: {
			conditional: $( '.gridTankContainer' ).length,
			exec: function () {
				$( '.gridTankContainer' ).each( function() {
					var max = $( this ).data( 'tank-max' ) || 10000;
					$( this ).children( '.tankLiquidImageContainer.minetip' ).children( '.tankLiquidImage' ).each( function() {
						$( this ).css( {
							backgroundImage: 'url(' + $( this ).children( 'img' ).hide().attr( 'src' ) + ')',
							backgroundRepeat: 'repeat',
							backgroundPosition: 'bottom',
							height: ($( this ).data( 'tank-usage' ) || 5000) / max * 100 + '%'
						} );
					} );
				} );
			}
		},

		/**
		 * Element animator
		 *
		 * @author Unknown
		 */
		animated: {
			conditional: $( '.animated' ).length,
			exec: function () {
				// Remove from animated class if only one child
				$( '.animated' ).each( function() {
					if ( $( this ).children( 'span, div' ).length === 1 ) {
						$( this ).removeClass( 'animated' );
					}
				});
				// Add the active class to all of the first child of .animated
				$( '.animated > span:first-child, .animated > div:first-child' ).addClass( 'active' );
				if ( $( '.animated' ).length ) {
					setInterval( function() {
						$( '.animated' ).each( function() {
							var current = $( this ).children( '.active' ).removeClass( 'active' ), next;
							if ( $( this ).hasClass( 'random' ) ) {
								next = $( this ).children().eq( Math.floor(Math.random() * $( this ).children().length) );
							} else if ( current.next().length ) {
								next = current.next();
							} else {
								next = $( this ).children().eq( 0 );
							}
							next.addClass( 'active' );
						} );
					}, 2000 );
				}
			}
		},

		/**
		 * Crafting grid handler
		 *
		 * @author Unknown
		 */
		craftingGrid: {
			conditional: $( '.CraftingGrid' ).length,
			exec: function () {
				$( '.CraftingGrid' ).each( function() {
					var maxFrames = 0;
					$( this ).children( '.CraftingGridCell' ).each( function() {
						var frames = $( this ).children( 'span:not(.ignore), div.GridTank:not(.ignore)' ).length;
						if ( frames > maxFrames) {
							maxFrames = frames;
						}
						// Initialize cell states
						$( this ).children( 'span:first-child:not(.ignore), div.GridTank:first-child:not(.ignore)' ).addClass( 'ActiveSlide' );
					});
					if ( maxFrames <= 1 ) {
						return;
					}
					// Create crafting grid controls
					$( this ).append( '<div class=\'CraftingGridControls\' style=\'position:absolute; bottom:0; width:100%; text-align:center;\'> \
										<input type=\'button\' value=\'<\' class=\'prevPage\'> \
										<span class=\'pageNum\'>1</span>/<span class=\'pageCount\'>' + maxFrames + '</span> \
										<input type=\'button\' value=\'>\' class=\'nextPage\'> \
									</div>' );
					$( this ).height( $( this ).height() + $( this ).children( '.CraftingGridControls' ).height() );
					// Implement controls
					$( this ).find( '.nextPage' ).click( function() {
						$( this ).parents( '.CraftingGrid' ).children( '.CraftingGridCell' ).each( function() {
							if ( $( this ).children( ':not(.ignore)' ).length === 1 ) {
								$( this ).removeClass( '.CraftingGridCell' );
								return;
							}
							var cur = $( this ).children( '.ActiveSlide' ),
								next = cur.next( 'span:not(.ignore), div.GridTank:not(.ignore)' );
							if ( next.length === 0 ) {
								next = cur.siblings( 'span:not(.ignore), div.GridTank:not(.ignore)' ).first();
							}
							cur.removeClass( 'ActiveSlide' );
							next.addClass( 'ActiveSlide' );
						});
						var pageNum = parseInt( $( this ).siblings( 'span.pageNum' ).html(), 10 ) + 1;
						if ( pageNum > parseInt( $( this ).siblings( 'span.pageCount' ).html(), 10 ) ) {
							pageNum = 1;
						}
						$( this ).siblings( 'span.pageNum' ).html( pageNum );
					});
					$( this ).find( '.prevPage' ).click( function() {
						$( this ).parents( '.CraftingGrid' ).children( '.CraftingGridCell' ).each( function() {
							if ( $( this ).children( ':not(.ignore)' ).length === 1 ) {
								$( this ).removeClass( '.CraftingGridCell' );
								return 0;
							}
							var cur = $( this ).children( '.ActiveSlide' ),
								next = cur.prev( 'span:not(.ignore), div.GridTank:not(.ignore)' );
							if ( next.length === 0 ) {
								next = cur.siblings( 'span:not(.ignore), div.GridTank:not(.ignore)' ).last();
							}
							cur.removeClass( 'ActiveSlide' );
							next.addClass( 'ActiveSlide' );
						});
						var pageNum = parseInt( $( this ).siblings( 'span.pageNum' ).html(), 10 ) - 1;
						if (pageNum === 0) {
							pageNum = parseInt( $( this ).siblings( 'span.pageCount' ).html(), 10 );
						}
						$( this ).siblings( 'span.pageNum' ).html( pageNum );
					});
				});
			}
		},

		/**
		 * Infobox collapsing
		 *
		 * @author Unknown
		 */
		infobox: {
			conditional: $( '.infobox' ).length,
			exec: function () {
				$( '.infobox:not(.infoboxNoCollapse) td' ).each( function() {
					if ( $( this ).html().match( /{{{[^}]+}}}/ ) ) {
						$( this ).parent( 'tr' ).hide();
					}
				});
				$( '.infobox:not(.infoboxNoCollapse) .infoboxSubsectionBreak, .infobox:not(.infoboxNoCollapse) tr.infoboxSectionHeader' ).each( function() {
					var next = $( this ).next();
					while ( next !== undefined && next.html() !== undefined && !next.is( '.infoboxSubsectionBreak, .infoboxSectionHeader' ) ) {
						if ( next.is( ':visible' ) ) {
							return;
						}
						next = next.next();
					}
					$( this ).hide();
				});
			}
		},

		/**
		 * Autosorting sortable tables
		 *
		 * @author Cblair91
		 */
		autosort: {
			conditional: $( '.sortable' ).length,
			exec: function () {
				mw.loader.using( 'jquery.tablesorter', function () {
					$( '.sortable[class*="autosort="]' ).each( function ( i ) {
						var matched = /(?:^| )autosort=(\d+)(?:,|-)(a|d)(?: |$)/.exec( $( this ).attr( 'class' ) ),
							$sortCol = $( $( this ).children( '> thead th:nth-child(' + matched[1] + ')' )[i] );
						if ( matched[2] === 'd' ) {
							$sortCol.click().click();
						} else {
							$sortCol.click();
						}
					} );
				} );
			}
		}
	};

	var loaded = [];

	/**
	 * Used to detect incorrectly spelt keys for each include
	 *
	 * @param obj {object}
	 * @param key {string}
	 */
	function checkKeys( obj, key ) {
		var inclKeys = Object.keys( obj );

		['conditional', 'exec'].forEach( function ( elem ) {
			var index = inclKeys.indexOf( elem );

			if ( index > -1 ) {
				inclKeys.splice( index, 1 );
			}
		} );

		if ( inclKeys.length ) {
			console.warn( 'Error in MediaWiki:Common.js: `includes.' + key + '` contains unknown key(s): ' + inclKeys.toString() );
		}
	}

	/**
	 * Loading method
	 *
	 * Iterates over each entry in `includes` to check if the script should be executed
	 */
	function init() {
		$.each( includes, function ( k, v ) {

			if ( $.isFunction( v.conditional ) ? v.conditional() : v.conditional ) {

				loaded.push( 'common.' + k );
				v.exec();

			}

			checkKeys( v, k );
		} );

		ftb.loaded = ( ftb.loaded || [] ).concat( loaded );

		// add `ftb` an an alias for `ftbwiki`
		window.ftb = ftb;
	}

	$( init );

}( this.jQuery, this.mediaWiki, this.ftbwiki = this.ftbwiki || {} ) );