( function( mw, $ ) { 
	"use strict";

	// Adds a polyfill in case of browser support
	if ( !( "matches" in Element.prototype ) ) { 
		Element.prototype.matches = 
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function( s ) { 
				var matches = ( this.document || this.ownerDocument ).querySelectorAll( s ),
					i = matches.length;
				
				while ( --i >= 0 && matches.item( i ) !== this ) { }

				return i > -1;
			};
	}

	// MediaWiki configurations
	const CONF = mw.config.get( );

	// Valid protocols
	const VALID_PROTOCOLS = new RegExp( '^(?:' + CONF.wgUrlProtocols + ')' );
	
	// Valid paths
	const VALID_URL_PATHS = /^\/{1}\w+[\w\/]*/;

	// Max number of levels
	const MAX_LEVELS = 5;

	// Start index to prevent the Explore tab from being rerendered
	const START_INDEX = 1;

	// The community local navigation selector
	const COMMUNITY_NAV = ".fandom-community-header__local-navigation";

	// The subnav shift
	var shift = 0;
	
	// Fetches the navigation data from its page
	const getNavigationData = new Promise( function( res, rej ) { 
		const xhr = new XMLHttpRequest( );

		const uri = ( new mw.Uri( "/index.php" ) ).extend( { 
			title: "MediaWiki:Wiki-navigation",
			action: "raw"
		} );

		xhr.open( "GET", uri );

		xhr.addEventListener( "readystatechange", function( ) { 
			if ( xhr.readyState !== xhr.DONE ) return;
			res( xhr.response );
		} );

		xhr.send( );
	} );

	// Utility function to escape selector
	function escapeSelector( string ) { 
		return ( string || "" ).replace( 
			/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, 
			function( ch, asCodePoint ) {
				if ( asCodePoint ) {
		  
				  // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				  if ( ch === "\0" ) {
					return "\uFFFD";
				  }
		  
				  // Control characters and (dependent upon position) numbers get escaped as code points
				  return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
				}
		  
				// Other potentially-special ASCII characters get backslash-escaped
				return "\\" + ch;
			}
		);
	}

	// Checks if a line is a valid nav item
	function isNavItem( line ) { 
		return line.startsWith( "*" );
	}

	// Fetches the subnav level from a line
	function level( line ) { 
		if ( arguments.length === 0 ) return -1;
		var index = 0;
		while ( index < line.length && line.substr( index, 1 ) === "*" ) index++;
		index -= shift;

		return index;
	}

	// Generates a subnav dropdown
	function subnav_dropdown( line, level, open ) { 
		if ( !open ) return "</ul></div></li>";
		var html = '<li class="wds-dropdown-level-' + level + '">';
		html += subnav_link( line, level );
		html += '<div class="wds-dropdown-level-' + level + '"__content wds-is-not-scrollable">';
		html += '<ul class="wds-list wds-is-linked">';
		return html;
	}

	// Parses the current line
	function parse_subnav( line, level ) { 
		line = line.substr( level + shift ).trim( );
		if ( /^<nowiki>/.test( line ) && /<\/nowiki>$/.test( line ) )
			line = [ "#", line.substr( 8, line.length - 17 ) ];
		else 
			line = line.split( "|" );
		
		if ( line.length === 1 ) line = [ line, line ];

		if ( line[ 0 ].length < 1 || line[ 0 ].charAt( 0 ) === "#" )
			line[ 0 ] = "#";
		else if ( VALID_PROTOCOLS.test( line[ 0 ] ) || VALID_URL_PATHS.test( line[ 0 ] ) )
			line[ 0 ] = encodeURI( line[ 0 ] );
		else { 
			var namespace_split = line[ 0 ].split( ":" );

			if ( namespace_split.length > 1 ) { 
				if ( namespace_split[ 0 ] === "" ) namespace_split.shift( );

				const namespace_id = CONF.wgNamespaceIds[ namespace_split[ 0 ].replace( /\s+/g, "_" ).toLowerCase( ) ];

				if ( typeof namespace_id !== "undefined" ) namespace_split[ 0 ] = CONF.wgFormattedNamespaces[ namespace_id ];

				line[ 0 ] = namespace_split.join( ":" );
			}
		}

		return line;
	}

	// Parses the current link parts
	function parse_link( parts, native_encode ) { 
		var fragment_position = parts[ 0 ].indexOf( "#" );
		var fragment = "";

		if ( fragment_position !== -1 ) { 
			fragment = parts[ 0 ].substr( fragment_position );
			parts[ 0 ] = parts[ 0 ].substr( 0, fragment_position );
		}

		if ( native_encode ) { 
			parts[ 0 ] = encodeURI( parts[ 0 ] )
				.replace( /%20|\+/g, "_" )
				.replace( /\?/g, "%3F" )
				.replace( /&/g, "%26" )
				.replace( /=/g, "%3D" )
				.replace( /'/g, "%27" );
		} else { 
			parts[ 0 ] = mw.util.wikiUrlencode( parts[ 0 ] );
		}

		parts[ 0 ] = CONF.wgArticlePath
			.replace( "$1", parts[ 0 ] ) +
			fragment;
		
		return parts;
	}

	// Generates a subnav link
	function subnav_link( line, level ) { 
		const parts = parse_subnav( line, level );
		const encoded = parse_link( parts );

		var html = '<a href="' + mw.html.escape( encoded[ 0 ] ) + '" class="wds-dropdown-level-' + level + '__toggle" data-tracking="custom-level-' + level + '">';
		html += '<span>' + mw.html.escape( encoded[ 1 ] ) + '</span>';
		html += window.dev.wds.icon( "menu-control-tiny", { 
			"class": "wds-dropdown-chevron"
		} ).outerHTML;
		html += "</a>";

		return html;
	}

	// Creates a subnav item without a child
	function subnav_noparent( line, level ) {
		const parts = parse_subnav( line, level );
		const encoded = parse_link( parts );

		var html = "<li>";
		html += '<a href="' + mw.html.escape( encoded[ 0 ] ) + '" data-tracking="' + level + '">';
		html += mw.html.escape( encoded[ 1 ] );
		html += "</a></li>";

		return html;
	}

	// Fetches the subnav selector
	function subnav_selector( line, level ) { 
		const parts = parse_subnav( line, level );
		const encoded = parse_link( parts, true );

		return encoded[ 0 ] === "#" ?
			[ 'a[href="' + escapeSelector( encoded[ 0 ] ) + '"] + .wds-dropdown-level-' + ( level + 1 ) + '__content', mw.html.escape( encoded[ 1 ] ) ] :
			'a[href="' + escapeSelector( encoded[ 0 ] ) + '"] + .wds-dropdown-level-' + ( level + 1 ) + '__content';
	}

	// Processes the navigation data
	function process_navigation( data, nav ) { 
		var lines = data.split( "\n" ).filter( isNavItem ),
			html = "", rendered = "", subnav2 = "", subnav2a = "", hasSubnav4 = false;

		shift = level( lines[ 0 ] ) - 1;

		for ( var i = 0; i < lines.length; i++ ) { 
			const currLevel = level( lines[ i ] );

			if ( currLevel >= 3 ) { 
				const prevLevel = level( lines[ i - 1 ] );
				const nextLevel = ( i === lines.length - 1 ) ? 0 : level( lines[ i + 1 ] );

				if ( currLevel > ( prevLevel + 1 ) ) { 
					return console.warn( 
						"Exiting ExtendedNavigation: Submenu structure has been misformed. \n" + 
						"Current line: " + lines[ i ] + "\n" +
						"Current level: " + currLevel + "\n" +
						"Previous level: " + prevLevel + "\n" +
						"Next level: " + nextLevel 
					);
				}

				if ( currLevel === 4 ) hasSubnav4 = true;

				if ( nextLevel === ( currLevel + 1 ) ) { 
					html += ( html === "" ? "" : "\n" );
					html += subnav_dropdown( lines[ i ], currLevel, true );
				} else if ( nextLevel < currLevel ) { 
					html += ( html === "" ? "" : "\n" );
					html += subnav_noparent( lines[ i ], currLevel );
					html += "\n" + subnav_dropdown( null, null, false );

					if ( ( currLevel - nextLevel ) > 1 && html !== "" ) { 
						var closingTags = currLevel - nextLevel;

						while ( closingTags > 1 ) { 
							html += "\n" + subnav_dropdown( null, null, false );
						}
					}
				} else if ( currLevel === nextLevel ) { 
					html += "\n" + subnav_noparent( lines[ i ], currLevel );
				} else { 
					return console.warn( 
						"Exiting ExtendedNavigation: Fallthrough. \n" +
						"Current line: " + lines[ i ] + "\n" +
						"Current level: " + currLevel + "\n" +
						"Previous level: " + prevLevel + "\n" + 
						"Next level: " + nextLevel
					);
				}				
			}

			if ( i === lines.length - 1 || currLevel < 3 ) { 
				if ( html !== "" ) { 
					rendered += html;
					html = "";
				}

				if ( hasSubnav4 ) { 
					var subnav3 = Array.isArray( nav.querySelectorAll( subnav2 ) );

					if ( subnav2a !== "" ) { 
						subnav3 = subnav3.find( function( el ) { 
							const subnav_2children = Array.from( el.parentElement.children );
							const subnav_2a = subnav_2children.find( function( child ) { 
								return child.matches( "a" );
							} );

							return subnav2a === subnav_2a.innerHTML;
						} );
					} else { 
						subnav3 = subnav3[ 0 ];
					}

					subnav3.classList.add( "wds-dropdown-level-3-parent" );
					subnav3.innerHTML = rendered;
					hasSubnav4 = false;
				}
			}

			if ( currLevel === 2 ) { 
				subnav2 = subnav_selector( lines[ i ], currLevel );

				if ( Array.isArray( subnav2 ) ) { 
					subnav2a = subnav2[ 1 ];
					subnav2 = subnav2[ 0 ];
				} else { 
					subnav2a = "";
				}

				rendered = "";
				hasSubnav4 = false;
			}
		}
	}

	function traverse( data ) { 
		const navigations = document.querySelectorAll( COMMUNITY_NAV );

		navigations.forEach( function( navigation ) { 
			const navs = navigation.querySelectorAll( ".wds-tabs" );

			navs.forEach( function( nav ) { 
				return process_navigation( data, nav );
			} );
		} );
	}

	getNavigationData.then( traverse );
} )( mediaWiki, jQuery );