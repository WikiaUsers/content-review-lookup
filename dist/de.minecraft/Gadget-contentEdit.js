( function() {
'use strict';

/** "Global" vars (preserved between editing sessions) **/
var i18n = {
	blockedNotice: 'Du kannst nichts bearbeiten, da dein Konto gesperrt wurde.',
	blockedReason: 'Grund: $1',
	changesSavedNotice: 'Deine Änderungen wurden gespeichert.',
	diffError: 'Unterschied konnte nicht geladen werden',
	diffErrorMissingPage: 'Seite konnte nicht geladen werden',
	invalidJson: 'Beim Laden der Versionsliste ist ein Fehler aufgetreten.'
};
var $root = $( document.documentElement );
var $win = $( window );
var historySupported = window.history && history.pushState;
var $vlist = $( '.versionlist' );
// var versions = $vlist.data( 'versions' );
var versions = $vlist.html();


// Handle recreating the editor
$( '#ca-contentedit' ).find( 'a' ).click( function( e ) {
	// Editor is already loaded, reload the page
	if ( $root.hasClass( 'contentedit-loaded' ) ) {
		return;
	}
	create();
	e.preventDefault();
} );
if ( historySupported ) {
	$win.on( 'popstate', function() {
		if (
			location.search.match( 'contentaction=edit' ) &&
			!$root.hasClass( 'contentedit-loaded' )
		) {
			create( 'history' );
		}
	} );
}


/** Functions **/
/**
 * Entry point for the editor
 *
 * Updates the page if it has been edited since being viewed
 * and creates the editor once ready
 * Is called right at the end of the script, once all other functions
 * are defined.
 *
 * "state" is what triggered the creation (e.g. from history navigation)
 */
var create = function( state ) {
	var versionList;
	versionList = JSON.parse(versions);

	var saveModules = mw.loader.using( [ 'jquery.byteLimit', 'mediawiki.action.history.diff', 'mediawiki.ui.input' ] );
	
	$root.addClass( 'contentedit-loaded' );
	
	// Pre-load modules which will be needed later
	if ( !state && historySupported ) {
		history.pushState( {}, '', mw.util.getUrl( null, { contentaction: 'edit' } ) );
	}
	if ( state !== 'initial' ) {
		$( '#ca-view' ).add( '#ca-contentedit' ).toggleClass( 'selected' );
	}
	
	var editForm = $( '<div>', { class: 'contentEditForm' } );
	
	$.each( versionList, function( i, v ) {
		editForm.append(
			$( '<div>', { class: 'versionEdit' } ).append(
				$( '<h2>' ).html( v ),
				$( '<textarea>' ).html( 'Work in progress...' )
			)
		);
	} );
	
	$( '#bodyContent' ).empty().append( editForm );
};


// Finally start the editor
create( 'initial' );


}() );