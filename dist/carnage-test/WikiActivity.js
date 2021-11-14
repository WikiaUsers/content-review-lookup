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
 * Version: v1.2
 **/

( function( window, $, mw ) { 
	"use strict";
	
	// Fetching the MediaWiki configuration variables
	const mediaWikiConfig = mw.config.get( );
	
	// Creating the defaults function
	function defaults( target ) { 
		const args = Array.from( arguments ).slice( 1 );
		args.forEach( function( currentObject ) { 
			const keys = currentObject === Object( currentObject ) ? 
				Object.keys( currentObject ) : [ ];
			
			keys.forEach( function( key ) { 
				if ( target[ key ] !== void 0 ) return;
				target[ key ] = currentObject[ key ];
			} );
		} );
		return target;
	}
	
	// Core scripts and modules
	const scripts = Object.freeze( { 
		i18n: "u:dev:MediaWiki:I18n-js/code.js",
		colors: "u:dev:MediaWiki:Colors/code.js",
		wds: "u:dev:MediaWiki:WDSIcons/code.js",
		dorui: "u:dev:MediaWikki:UI-js/code.js"
	} );
	
	// Core stylesheets
	const stylesheets = Object.freeze( [ 
		"u:carnage-test:MediaWiki:WikiActivity.css"
	] );
	
	// Core MediaWiki dependencies
	const dependencies = Object.freeze( [ 
		"mediawiki.util",
		"mediawiki.api",
		"mediawiki.Title"
	] );
	
	function init( callback ) { 
		const importedScripts = Object.keys( scripts ).map( function( scriptId ) { 
			const scriptName = scripts[ scriptId ];
			if ( window.dev.hasOwnProperty( scriptId ) ) return Promise.resolve( window.dev[ scriptId ] );
			return importArticle( { type: "script", article: scriptName } );
		} );
		
		const importedStylesheets = Array.from( stylesheets ).map( function( stylesheet ) { 
			return importArticle( { type: "style", article: stylesheet } );
		} );
		
		const resources = [ mw.loader.using( dependencies ) ].concat( importedScripts, importStylesheets );
		
		return Promise.all( resources ).then( callback );
	}
	
	function start( ) { 
		// User group objects
		const CAN_PHALANX = Object.freeze( [ "staff", "helper", "wiki-representative", "wiki-specialist", "soap" ] );
		const CAN_BLOCK = Object.freeze( CAN_PHALANX.concat( [ "global-discussions-moderator", "sysop" ] ) );
		const IS_MOD = Object.freeze( CAN_BLOCK.concat( [ "discussion-moderator", "threadmoderator" ] ) );
		const CAN_ROLLBACK = Object.freeze( IS_MOD.concat( "rollback" ) );
		
		// Create the core Wiki Activity object
		const wikiActivity = { 
			// Constants
			LIMITS: Object.freeze( [ 5, 10, 25, 50, 100, 250, 500 ] ),
			SUPPORTED_NAMESPACES: Object.freeze( [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 828, 829 ] ),
			IS_TALK: Object.freeze( [ 3, 5, 111, 829 ] ),
			// User rights objects
			CAN_PHALANX: CAN_PHALANX,
			CAN_BLOCK: CAN_BLOCK,
			IS_MOD: IS_MOD,
			CAN_ROLLBACK: CAN_ROLLBACK,
			// Caches
			AVATAR_CACHE: new Map( ),
			// Core objects
			loading: false,
			loaded: false
			// Methods
		};
		
		// Returning the WikiActivity object
		return wikiActivity;
	}
	
	mw.hook( "wikiactivity.init" ).add( init( start ) );
	
} )( window, jQuery, mediaWiki );