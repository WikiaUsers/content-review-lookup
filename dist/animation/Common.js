/* Any JavaScript here will be loaded for all users on every page load. */

/* For [[Template:Icons]] */
// Copied from https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );
/* Spoiler alert */
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};