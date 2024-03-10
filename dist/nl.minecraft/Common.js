( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// Collapsible elements and page loader
	hideText: 'sluiten',
	showText: 'openen',
	
	// Page loader
	loadErrorTitle: 'Er trad een fout op tijdens het laden van de inhoud',
	
	// File upload
	defaultLicense: 'License'
};

/**
 * Instead of cluttering up the global scope with
 * variables, they should instead be set as a
 * property of this global variable
 *
 * E.g: Instead of
 *   myVar = 'blah';
 * use
 *   mcw.myVar = 'blah';
 */
var mcw = window.mcw = {};


/* Keep track of delegated events on dynamic content */
mcw.events = {};

/* Add extra buttons to the classic toolbar */
if ( mw.user.options.get( 'showtoolbar' ) && !mw.user.options.get( 'usebetatoolbar' ) ) {
	mw.loader.localLoad( 'MediaWiki:Toolbar.js' );
}

/* Fires when DOM is ready */
$( function() {

/**
 * Pause MCUI templates (e.g. [[Template:Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );

/** 
 * Fix edit summary prompt for undo
 *
 * Fixes the fact that the undo function combined with the "no edit summary prompter"
 * causes problems if leaving the edit summary unchanged.
 * Added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]].
 * See https://bugzilla.wikimedia.org/show_bug.cgi?id=8912
 */
if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}

/**
 * Make simple search suggestions box separately styled
 */
mw.loader.using( 'mediawiki.searchSuggest', function() {
	$( '.suggestions:first' ).addClass( 'searchbar' );
} );


/**
 * Set unlicensed as the default license on file pages
 *
 * That way the file will be categorised so someone can find a license for the file
 */
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
	var $license = $( '#wpLicense' );
	if ( $license.length ) {
		if ( $license.val() === '' ) {
			$license.val( i18n.defaultLicense );
		}
		
		mw.loader.using( 'mediawiki.special.upload', function() {
			$license.change();
		} );
	}
}

/** 
 * API Purge
 * 
 * Performs a purge with the API to avoid the confirmation form
 */
mw.loader.using( 'mediawiki.api' ).then( function() {
	$( '#ca-purge a' ).on( 'click', function( e ) {
		new mw.Api().post( {
			action: 'purge',
			titles: mw.config.get( 'wgPageName' )
		} ).then( function() {
			location.reload();
		}, function() {
			mw.notify( 'Leegmaken van cache mislukt', { type: 'error' } );
		} );
		
		e.preventDefault();
	} );
} );

} );
/* End DOM ready */


}() );

/* Functions that shouldn't be used strictly, place here */

/** Load version data navbox stuff.
  *
  * This function allows the displaying of the version navbox.
  * By default, the full navbox is hidden on most pages, due to
  * taking up a lot of space when uncollapsed.
  */

/* Build function first */
function unhideFullVersionNavbox() {
    var items = document.getElementsByClassName('navbox_full_version_list');
    for ( var x = 0; x < items.length; x++) {
        var item = items[x]; 
        if (item.style.display == 'none') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}

/* Add link to other navbox */
$('.navbox_full_list_link').append(
    '<a onclick="unhideFullVersionNavbox()" title="toon overige versies hieronder">toon alles</a>'
);