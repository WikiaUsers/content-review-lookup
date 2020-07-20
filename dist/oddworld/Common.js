/* Any JavaScript here will be loaded for all users on every page load. */

/* ######################################################################## */
/* ### SHOW/HIDE                                                        ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Collapsible tables using jQuery. Allows tables to   ### */
/* ###              be collapsed, showing only the header.              ### */
/* ### Credit:      User:Dantman                                        ### */
/* ### Disclaimer:  See http://dev.wikia.com/wiki/ShowHide/code.js      ### */
/* ######################################################################## */

/* Auto collapse setting mainly for Navboxes */
var ShowHideConfig = { autoCollapse: 2, userLang: false }; 
importScriptPage( 'ShowHide/code.js', 'dev' );

/*List Pages tool */
importArticles( {
    type: 'script',
    articles: [
        "u:dev:ListPages/code.js"
    ]
} );