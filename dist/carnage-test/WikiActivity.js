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
 * Version: v2.1
 **/

( function( window, $, mw ) { 
	"use strict";
	
	// MediaWiki configuration variables
	const config = mw.config.get( );
	
	// Wiki Activity options
	const options = $.extend( 
		{ },
		window.wikiActivity, 
		window.rwaOptions 
	);
	
	// Creating the UCX object
	window.UCX = $.extend( { }, window.UCX );
	
	// Creating the Dev object
	window.dev = $.extend( { }, window.dev );
	
	// Creating the loader
	function dispatchLoader( resources, context ) { 
		const loader = { };
		
		if ( arguments.length < 2 ) context = loader;
		
		// Checks whether the loader is dispatched
		loader.LOADED = false;
		
		// An array of loaded scripts
		loader.LOADED_SCRIPTS = [ ];
		
		// An array of loaded stylesheets
		loader.LOADED_STYLESHEETS = [ ];
		
		// An array of MediaWiki modules
		loader.MODULES = resources.MODULES || [ ];
		
		// An array of scripts to load
		loader.SCRIPTS = resources.SCRIPTS || [ ];
		
		// An array of stylesheets to load
		loader.STYLESHEETS = resources.STYLESHEETS || [ ];
		
		// Initializes the script
		loader.init = function( ) { 
			if ( 
				Array.isArray( loader.MODULES ) && 
				loader.MODULES.length 
			) { 
				return mw.loader
					.using( loader.MODULES )
					.then( loader.load );
			}
		};
		
		loader.load = function( ) { 
			const promises = [ ];
			
			if ( Array.isArray( loader.STYLESHEETS ) ) 
				promises.push( Promise.all( 
					loader.STYLESHEETS.map( function( stylesheet ) { 
						return new Promise( function( r, j ) { 
							importArticle( { 
								type: "style",
								article: stylesheet
							} ).then( function( ) { 
								loader.LOADED_STYLESHEETS.push( stylesheet );
								r( stylesheet );
							} );
						} );
					} )
				) );
			
			if ( Array.isArray( loader.SCRIPTS ) ) { 
				promises.push( Promise.all( 
					loader.SCRIPTS.map( function( script ) { 
						if ( typeof script === "string" ) 
							script = { 
								name: "unknown",
								page: script
							};
						
						return new Promise( function( r, j ) {
							const name = script.name;
							const exec = script.exec || null;
							const page = script.page;
							
							if ( 
								typeof exec === "function" &&
								typeof exec( name, page, script ) !== "undefined"
							) { 
								loader.LOADED_SCRIPTS.push( page );
								return r( page );
							}
							
							importArticle( { type: "script", article: page } )
								.then( function( ) { 
									loader.LOADED_SCRIPTS.push( page );
									r( page );
								} )
								[ "catch" ]( j );
						} );
					} )
				) );
			}
			
			return Promise.all( promises ).then( function( ) { 
				loader.LOADED = true;
				return loader;
			} );
		};
		
		return loader.init( );
	}
	
	const wac = { };
	
	const CAN_BLOCK = Object.freeze( [ 
		"sysop",
        "staff",
        "wiki-manager",
        "helper",
        "soap",
        "global-discussions-moderator"
	] );
	
	const IS_MOD = Object.freeze( CAN_BLOCK.concat( "discussion-moderator", "threadmoderator" ) );
	
	const CAN_ROLLBACK = Object.freeze( CAN_BLOCK.concat( "rollback" ) );
	
	const CAN_PATROL = Object.freeze( CAN_BLOCK.concat( "patroller" ) );
	
	function inGroups( groups ) { 
		return groups.some( function( group ) { 
			return config.wgUserGroups.includes( group );
		} );
	}
	
	wac.MODULES = Object.freeze( [
		"mediawiki.api",
		"mediawiki.Title",
		"mediawiki.Uri"
	] );
	
	wac.SCRIPTS = Object.freeze( { 
		i18n: { 
			page: "u:dev:MediaWiki:I18n-js/code.js",
			name: "i18n",
			exec: function( name ) { 
				return window.dev && window.dev[ name ];
			}
		},
		colors: "u:dev:MediaWiki:Colors/code.js",
		wds: {
			page: "u:dev:MediaWiki:WDSIcons/code.js",
			name: "wds",
			exec: function( name ) { 
				return window.dev && window.dev[ name ];
			}
		},
		dorui: "u:dev:MediaWiki:Dorui.js"
	} );
	
	wac.STYLESHEETS = [ "u:dev:MediaWiki:WikiActivity.css" ];
	
	wac.PAGE_CACHE = { };
	
	wac.AVATAR_CACHE = { };
	
	wac.SUBPAGES = { 
		"main": [ "" ],
		"following": [ "f", "watchlist", "w" ],
		"social": [ ],
		"media": [ "m" ]
	};
	
	wac.CAN_BLOCK = inGroup( CAN_BLOCK );
	
	wac.IS_MOD = inGroup( IS_MOD );
	
	wac.CAN_ROLLBACK = inGroup( CAN_ROLLBACK );
	
	wac.CAN_PATROL = inGroup( CAN_PATROL );
	
	wac.LOADER = dispatchLoader( { 
		SCRIPTS: wac.SCRIPTS,
		STYLESHEETS: wac.STYLESHEETS,
		MODULES: wac.MODULES
	} );
	
	wac.LOADER.then( function( ) { 
		const i18no = window.dev.i18n;
		
		const colors = window.dev.colors;
	} );
} )( window, jQuery, mediaWiki );