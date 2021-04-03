/**
 * WikiActivity
 *
 * Recreates the legacy Special:WikiActivity page on the Unified
 * Community platform with a modernized appearance and a few
 * upgrades.
 *
 * Note: This script is a community project and is high-traffic.
 * If you know what you're doing and need to make any changes
 * that will impact the users of the script, you are welcome
 *
 * Author: Ultimate Dark Carnage
 * Version: v2.0
 **/

( function( window ) { 
	"use strict";
	
	// Configuration object
	const options = window.rwa || window.rwaOptions || { };
	
	// Current script version
	const __version = "v2.0";
	
	// Script name
	const __name = "WikiActivity";
	
	// MediaWiki variables
	const __mw = mw.config.get( [ 
		"wgCityId",
        "wgNamespaceNumber",
        "wgFormattedNamespaces",
        "wgTitle",
        "wgSiteName",
        "wgServer",
        "wgUserName",
        "wgUserGroups",
        "wgScriptPath"
	] );
	
	// UCP object
	window.UCP = window.UCP || { };
	
	// Developers object
	window.dev = window.dev || { };
	
	// If the script has been ran, stop
	if ( ( window.UCP.WikiActivity || window.activityLoaded ) ) return;
	
	// Sets the loaded state to true
	window.activityLoaded = true;
	
	// A list of core scripts
	const __scripts = Object.freeze( { 
		i18n : "u:dev:MediaWiki:I18n-js/code.js",
		colors : "u:dev:MediaWiki:Colors/code.js",
		wds : "u:dev:MediaWiki:WDSIcons/code.js",
		ui : "u:dev:MediaWiki:Dorui.js"
	} );
	
	// A list of installed scripts
	const __installedScripts = [ ];
	
	// A list of core MediaWiki dependencies
	const __deps = Object.freeze( [ 
		"mediawiki.util",
		"mediawiki.api"
	] );
	
	// Function to load all scripts
	function loadScripts( ) { 
		mw.loader.using( __deps ).then( function( ) { 
			Object.keys( __scripts ).forEach( function( name ) { 
				const key = name === "ui" ? "doru" : "dev";
				const script = __scripts[ name ];
				
				if ( 
					window[ key ][ name ] || 
					__installedScripts.includes( script ) 
				) { 
					__installedScripts.push( script );
					return;
				}
				
				importArticle( { type : "script", article : script } );
			} );
			
			loadCSS( );
		} );
	}
	
	// Function to load CSS
	function loadCSS( ) { 
		importArticle( { 
			type : "style",
			article : "u:dev:MediaWiki:WikiActivity.css"
		} );
	}
	
	// Initializes all scripts
	loadScripts( );
	
	// A list of canonical namespaces
	const __namespaces = Object.freeze( [ 
		0, // Main (article)
		1, // Talk
		2, // User
		3, // User talk
		4, // Project (<SITENAME>)
		5, // Project talk (<SITENAME> talk)
		6, // File
		7, // File talk
		8, // Forum
		9, // Forum talk
		500, // User blog
		828, // Module
		829 // Module talk
	] );
	
	// Creates a {Promise} for checking 
	// if the namespace is a talk namespace
	function isTalk( ns ) { 
		const __isTalk = Object.freeze( [ 
			1,
			3,
			5,
			7,
			829
		] );
		
		return new Promise( function( r, j ) { 
			if ( __isTalk.includes( ns ) ) return r( );
			j( );
		} );
	}
	
	// Creating the main object
	function WikiActivity( i18n ) { 
		// A list of canonical types
		const types = Object.freeze( [ 
			"main",
			"watchlist",
			"images"
		] );
		
		// Sets the current instance to a variable
		const _w = this;
		
		// A list of subpages
		const _s = Object.freeze( { 
			main : [ "", /^m(?:ain|)$/i ],
			watchlist : /^w(?:atchlist|)$|^fo(?:llowing|)$/i,
			images : /^i(?:mages|)$|^f(?:iles?|)$/i
		} );
		
		// The main storage key
		const _ks = "${name}-".replace( "${name}", __name );
		
		// Function to parse a date object
		function parseDate( d ) { 
			return !isNaN( 
				( d = d instanceof Date ? d : new Date( d ) ) 
			) ? d : null;
		}
		
		// Creates a storage pseudo-constructor
		function storage( ) { 
			const _ps = { };
			
			function safeJSONParse( s ) { 
				try { return JSON.parse( s ); }
				catch ( e ) { console.warn( e ); return s; } 
			}
			
			function getStorageKey( k ) { 
				return arguments.length ? String( _ks + k ) : "";  
			}
			
			function watch( ) { 
				setInterval( function( ) { 
					const _keys = Object
						.keys( localStorage )
						.filter( function( s ) { 
							if ( !s.startsWith( _ks ) ) return false;
							
							const _sv = localStorage.getItem( s );
							
							const _sp = safeJSONParse( _sv );
							
							return (
								( typeof _sp === "object" ) &&
								( _sp.hasOwnProperty( "expiry" ) ) &&
								( _sp.hasOwnProperty( "value" ) )
							);
						} );
					
					_keys.forEach( function( key ) { 
						const value = safeJSONParse( localStorage.getItem( key ) );
						
						const date = parseDate( value.expiry ).getTime( ) / 1000;
						
						const curr = Date.now( ) / 1000;
						
						if ( ( date - curr ) < 1 ) localStorage.removeItem( key );
					} );
				}, 1000 );
			}
			
			_ps.get = function( k ) { 
				if ( !arguments.length ) return;
				
				const pk = getStorageKey( k );
				const pv = localStorage.getItem( pk );
				
				if ( 
					( typeof pv === "object" ) &&
					( pv.hasOwnProperty( "expiry" ) ) &&
					( pv.hasOwnProperty( "value" ) )
				) return pv.value;
				
				return pv;
			};
			
			_ps.set = function( k, v ) { 
				if ( !arguments.length ) return false;
				
				if ( arguments.length === 1 && typeof k === "object" ) { 
					return Object
						.keys( k )
						.some( function( pk ) { 
							const pv = k[ pk ];
							return _ps.set( pk, pv );
						} );
				}
				
				const _k = getStorageKey( k );
				
				const _v = JSON.stringify( v );
				
				localStorage.setIten( _k, _v );
				
				return true;
			};
			
			_ps.remove = function( k ) { 
				if ( !arguments.length ) return false;
				const _pk = getStorageKey( k );
				
				try { 
					localStorage.removeItem( _pk );
				} catch( e ) { 
					return false;
				}
				
				return true;
			};
			
			_ps.clear = function( ) { 
				Object
					.keys( localStorage )
					.filter( function( s ) { 
						return s.startsWith( _ks );
					} )
					.forEach( localStorage.removeItem  );
			};
			
			_ps.store = function( o, d ) { 
				if ( !isNaN( d ) && isFinite( d ) ) {
					d = Math.abs( parseInt( d ) );
					d = Date.now( ) + d;
				} else { 
					d = parseDate( d );
					
					if ( isNaN( d ) ) d = Date.now( ) * ( 2 * 24 * 3600 * 1000 );
				}
				
				d = parseDate( d );
				
				Object
					.keys( o )
					.forEach( function( k ) { 
						const v = o[ k ];
						
						const r = new Map( [ 
							[ "expiry", d.toISOString( ) ],
							[ "value", v ]
						] );
						
						_ps.set( k, Object.fromEntries( r ) );
					} );
			};
			
			return _ps;
		}
		
		// Title parts for WikiActivity
		const parts = __mw.wgTitle.split( "/" );
		
		// Checks if the page is a special page
		const isSpecial = __mw.wgNamespaceNumber === -1;
		
		// Automatically shifts the parts array
		parts.shift( );
		
		// The current subpage
		const subpage = parts[ 0 ] || "";
		
		// The wrapper for localStorage
		_w.storage = storage( );
		
		// Fetches subpage patterns
		_w.getSubpageObject = function( ) { 
			const sKeys = types.filter( function( k ) { 
				return k !== "main";
			} );
			
			const sObject = { };
			
			sKeys.forEach( function( k ) { 
				sObject[ k ] = Object.freeze( { 
					name : k,
					match : function( s ) { 
						const p = _s[ k ];
						if ( typeof p === "string" ) { 
							return p === s;
						} else if ( p instanceof RegExp ) { 
							return p.test( s ); 
						} else return false;
					}
				} );
			} );
			
			return sObject;
		};
		
		_w.getType = function( ) { }
	}
} )( this );