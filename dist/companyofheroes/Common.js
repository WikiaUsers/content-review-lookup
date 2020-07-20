/* Import Show-Hide JS */
 
importScriptPage('ShowHide/code.js', 'dev');

/* add history, what links here, and skin change buttons to the menu */
/*
jQuery( document ).ready( function( $ ) { 
    $('section header nav ul li:nth-last-child(2) ul li:first-child').after('<li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=history">History</a></li><li><a href="/wiki/Special:WhatLinksHere/'+ encodeURIComponent(wgPageName) +'">What Links here</a></li>');
    $('section header nav ul li:nth-last-child(2) ul li:nth-last-child(1)').after('<li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook">Monobook skin</a></li><li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector">Vector skin</a></li>');
});
*/

/*
 * Redirect User:Name/skin.js and skin.css to the current skin's pages
 * (unless the 'skin' page really exists)
 * @source: http://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
 * @rev: 2
 */
/*
if ( mw.config.get( 'wgArticleId' ) == 0 && mw.config.get( 'wgNamespaceNumber' ) == 2 ) {
    var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
    // Make sure there was a part before and after the slash
    // And that the latter is 'skin.js' or 'skin.css'
    if ( titleParts.length == 2 ) {
        var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
        if ( titleParts.slice(-1) == 'skin.js' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.js' );
        } else if ( titleParts.slice(-1) == 'skin.css' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.css' );
        }
    }
}
*/