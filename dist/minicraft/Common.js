/* Any JavaScript here will be loaded for all users on every page load. */

/* Has the Navigation templates set to be hidden by default */
var ShowHideConfig = { autoCollapse: 0 };
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

/* Changes WikiActivity to Recent Changes */
function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges);
/* */
/* Fires when DOM is ready */
$( function() {


/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );
/* End DOM ready */

}() );