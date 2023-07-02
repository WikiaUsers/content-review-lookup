/**
 * WallGreeting
 * 
 * Adds a greeting to the user's 
 * message wall.
 * 
 * Author: Ultimate Dark Carnage
 * Version: 1.2
 **/

// Initializing the script through an IIFE
( function( window, $, mw ) { 
    "use strict";
    
    // MediaWiki configurations
    const conf = mw.config.get( [ 
        "wgTitle",
        "wgFormattedNamespaces",
        "wgNamespaceNumber",
        "wgUserGroups",
        "wgUserName",
        "wgServer"
    ] );
    
    // Creating the UCP object
    window.UCP = window.UCP || { };
    
    // Creating the dev object if it does not exist
    window.dev = window.dev || { };
    
    // If the WallGreeting extension is loaded,
    // do not run
    if ( window.UCP.WallGreeting ) return;
    
    
} )( window, jQuery, mediaWiki );