/**
 * Originally created by [[User:Majr]] as [[MediaWiki:Gadget-spriteEditLoader.js]]
 */

$( function() {
'use strict';
/**
 * Add an edit button which loads the content editor
 *
 * If contentaction=edit is in the URL, the editor will be loaded
 * immediately, otherwise it will wait for the button to be clicked.
 * Uses the History API where supported to update the URL, otherwise
 * the URL isn't updated.
 */
if ( !$( '.versionlist' ).length ) {
	return;
}

var $editTab = $( '#ca-edit' );
if ( !$editTab.length ) {
	$editTab = $( '#ca-viewsource' );
}
var $contentEditLink = $( '<a>' ).text( 'Inhalt bearbeiten' ).attr( 'href',
	mw.util.getUrl( null, { contentaction: 'edit' } )
);
var $contentEditTab = $( '<li>' ).attr( 'id', 'ca-contentedit' ).append(
	$( '<span>' ).append( $contentEditLink )
);
$contentEditTab.insertAfter( $editTab );

var loadContentEditor = function() {
	$contentEditTab.add( '#ca-view' ).toggleClass( 'selected' );
	
	mw.loader.load( 'ext.gadget.contentEdit' );
};
if ( location.search.match( 'contentaction=edit' ) ) {
	loadContentEditor();
} else {
	var $win = $( window );
	$contentEditLink.one( 'click', function( e ) {
		if ( window.history && history.pushState ) {
			// Initially add the history so it is not delayed waiting
			// for the editor to load. The editor will handle it from now.
			history.pushState( {}, '', this.href );
		}
		
		loadContentEditor();
		$win.off( '.contentEditLoader' );
		
		e.preventDefault();
	} );
	
	if ( window.history && history.pushState ) {
		// If the page is reloaded while the editor isn't loaded, navigating
		// back to the editor won't work, so an initial navigation check is
		// necessary to load the editor, where it will then monitor navigation
		$win.on( 'popstate.contentEditLoader', function() {
			if (
				location.search.match( 'contentaction=edit' ) &&
				!$( 'html' ).hasClass( 'contentedit-loaded' )
			) {
				loadContentEditor();
				$win.off( '.contentEditLoader' );
			}
		} );
	}
}

} );