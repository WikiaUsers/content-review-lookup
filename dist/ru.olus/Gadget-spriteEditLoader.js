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

var $spriteEditLink;
var $spriteEditTab;
    
// Temporary: FandomDesktop-specific changes
if ( $( ".skin-fandomdesktop" ).length > 0 ) {
	var $editButton = $( '#ca-edit-side-tool' );
	if ( !$editButton.length ) {
		$editButton = $( '#ca-viewsource-side-tool' );
	}
	
	$spriteEditLink = $( '<a>' )
	    .attr( 'id', 'ca-spriteedit' )
	    .attr( 'href', mw.util.getUrl( editPage, { spriteaction: 'edit' } ) )
	    .attr( 'title', 'Править спрайт' )
	    .addClass( 'page-side-tool' )
	    .html('<svg width="24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>');
	    // It's the "Photograph" icon from Heroicons – https://heroicons.dev/
	    
	$spriteEditLink.insertAfter( $editButton );
	$spriteEditTab = $spriteEditLink;
} else {
	var $editTab = $( '#ca-edit' );
	if ( !$editTab.length ) {
		$editTab = $( '#ca-viewsource' );
	}
	$spriteEditLink = $( '<a>' ).text( 'Edit sprite' ).attr( 'href',
		mw.util.getUrl( editPage, { spriteaction: 'edit' } )
	);
	$spriteEditTab = $( '<li>' )
	    .attr( 'id', 'ca-spriteedit' )
	    .addClass( 'page-side-tool' )
	    .append(
		    $( '<span>' ).append( $spriteEditLink )
	    );
	
	$spriteEditTab.insertAfter( $editTab );
}

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