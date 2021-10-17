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
	
	// Initializes the options object
	const OPTIONS = $.extend( 
		{ }, 
		window.wikiActivityOptions, 
		window.rwaOptions 
	);
	
	// Initializes the configuration object
	const CONFIG = mw.config.get( );
	
	// Checks for the UCX object
	window.UCX = $.extend( { }, window.UCX );
	
	
} ).call( ( window.WikiActivity = { } ), window, jQuery, mediaWiki );