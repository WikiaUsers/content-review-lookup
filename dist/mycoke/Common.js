/* Any JavaScript here will be loaded for all users on every page load. */

/*** 
 * Cycles images Module:Animate + Template:Animate
 * ported from https://community.fandom.com/f/p/2593182260920322622 
 * based on js from minecraft.fandom
 ***/
( function() {
'use strict';

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

/**
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 */
( function() {
	if ( !mcw.animate ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var $elem = $( this );
				var $current = $elem.children( '.active' );
				var $next = $current.nextAll( ':not(.skip):first' );
				// Loop back to the start
				if ( !$next.length ) {
					$next = $elem.children( ':not(.skip):first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
	}
}() );

}() );

/*** Adjustment for import: dev:LinkPreview/code.js (no preview image)***/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = ''; // Set to empty string or null to disable default image
window.pPreview.noimage = ''; // same^ gets rid of the stupid borderlands logo. Why is this even the default of an import on Fandom?