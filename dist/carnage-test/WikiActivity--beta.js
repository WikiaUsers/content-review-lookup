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
 * Version: v1.5b
 **/
( function( window, $, mw, options ) { 
	"use strict";
	
	if ( options.noop || $.extend( { }, window.RWA ).LOADED ) return; 
	
	window.dev = $.extend( { }, window.dev );
	window.UCX = $.extend( { }, window.dev );
	
	const RWA = Object.freeze( { 
		// Constants
		NAME: "WikiActivity",
		VERSION: "v1.0c",
		LOADED: false,
		// MediaWiki configuration variables
		VARIABLES: Object.freeze( { 
			WIKI_ID: mw.config.get( "wgCityId" ),
			SITE_NAME: mw.config.get( "wgSiteName" ),
			SCRIPT_PATH: mw.config.get( "wgScriptPath" ),
			SERVER: mw.config.get( "wgServer" ),
			TITLE: mw.config.get( "wgTitle" ),
			NAMESPACE_NUMBER: mw.config.get( "wgNamespaceNumber" ),
			NAMESPACES: mw.config.get( "wgFormattedNamespaces" ),
			USERNAME: mw.config.get( "wgUserName" ),
			USER_GROUPS: mw.config.get( "wgUserGroups" )
		} ),
		// User group constraints
		CAN_PHALANX: Object.freeze( [ 
			"staff",
			"helper",
			"soap",
			"wiki-specialist",
			"wiki-representative"
		] ),
		CAN_BLOCK: Object.freeze( [
			"staff",
			"helper",
			"soap",
			"wiki-specialist",
			"wiki-representative",
			"global-discussions-moderator",
			"sysop"
		] ),
		IS_MOD: Object.freeze( [ 
			"staff",
			"helper",
			"soap",
			"wiki-specialist",
			"wiki-representative",
			"global-discussions-moderator",
			"sysop"
		] )
	} );
	
	window.RWA = RWA;
} )( window, jQuery, mediaWiki, $.extend( { }, window.rwa ) );