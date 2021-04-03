$( function() {
'use strict';

/**
 * Add an edit button which loads the sprite editor
 *
 * If spriteaction=edit is in the URL, the editor will be loaded
 * immediately, otherwise it will wait for the button to be clicked.
 */
var editPage = $( '#sprite-editor-message' ).data( 'page' ) || null;
if ( !$( '#spritedoc' ).length && !editPage ) {
	return;
}

var $editTab = $( '#ca-edit' );
if ( !$editTab.length ) {
	$editTab = $( '#ca-viewsource' );
}
var $spriteEditLink = $( '<a>' ).text( 'Sprites bearbeiten' ).attr( 'href',
	mw.util.getUrl( editPage, { spriteaction: 'edit' } )
);
var $spriteEditTab = $( '<li>' ).attr( 'id', 'ca-spriteedit' ).append(
	$( '<span>' ).append( $spriteEditLink )
);
$spriteEditTab.insertAfter( $editTab );

// Page to sprite edit is not here, so no need to bind events
if ( editPage ) {
	return;
}

var loadSpriteEditor = function() {
	$spriteEditTab.add( '#ca-view' ).toggleClass( 'selected' );
	
	return mw.loader.using( 'ext.gadget.spriteEdit' );
};
if ( location.search.match( '[?&]spriteaction=edit' ) ) {
	loadSpriteEditor();
	return;
}

var $win = $( window );
$spriteEditLink.one( 'click.spriteEditLoader', function( e ) {
	// Initially add the history so it is not delayed waiting
	// for the editor to load. The editor will handle it from now.
	history.pushState( {}, '', this.href );
	
	loadSpriteEditor().then( function() {
		$win.off( '.spriteEditLoader' );
	} );
	
	e.preventDefault();
} );

// If the page is reloaded while the editor isn't loaded, navigating
// back to the editor won't work, so an initial navigation check is
// necessary to load the editor, where it will then monitor navigation
$win.on( 'popstate.spriteEditLoader', function() {
	if (
		location.search.match( '[?&]spriteaction=edit' ) &&
		!$( 'html' ).hasClass( 'spriteedit-loaded' )
	) {
		loadSpriteEditor().then( function() {
			$win.off( '.spriteEditLoader' );
		} );
	}
} );

} );