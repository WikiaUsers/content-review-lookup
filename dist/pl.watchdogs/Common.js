/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
importScriptPage('AjaxRC/code.js', 'dev');

/**
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 * Script from: http://minecraft.gamepedia.com/
 */
window.mcw = {};
mcw.animation = function() {
	if ( mcw.animate === undefined && $( '.animated' ).length ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var $current = $( this ).children( '.active' ), $next = $current.nextAll( ':not(.skip):first' );
				if ( !$next.length ) {
					$next = $( this ).children( ':not(.skip):first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
	}
};
mcw.animation();