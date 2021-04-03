/* Any JavaScript here will be loaded for all users on every page load. */
/* Please don't change without Admin's permission. That means another Admin, not just you. */

( function( window, $, mw ) { 
    "use strict";
    const isAdmin = Object.freeze( [  
        "staff",
        "helper",
        "wiki-manager",
        "soap",
        "bureaucrat",
        "sysop"
    ] );
    
    const isMod = Object.freeze( isAdmin.concat( [
        "global-discussions-moderator",
        "discussions-moderator",
        "content-moderator"
    ] ) );
    
    const scripts = [
        // Dev scripts
        "u:dev:MediaWiki:InfoboxEditorPreview.js",
        // Local scripts
        "MediaWiki:Wikia.js/AccordionView.js",
        "MediaWiki:Wikia.js/RFA.js",
        "MediaWiki:Wikia.js/HTMLCSSNews.js"
    ];
    
    const checkRights = function checkRights( group ) { 
        return mw.config.get( "wgUserGroups" ).includes( group );
    };
    
    if ( isAdmin.some( checkRights ) ) {
        scripts.push( "MediaWiki:Wikia.js/admin.js" );
    }
    
    if ( isMod.some( checkRights ) ) {
        scripts.push( "MediaWiki:Wikia.js/mod.js" );
    }
    
    importArticles( { 
        type: "script",
        articles : scripts
    } );
} )( this, jQuery, mediaWiki );