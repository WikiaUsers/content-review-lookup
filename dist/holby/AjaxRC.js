	ajaxTimer = 10000;

/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
	$( '#ajaxLoadProgress' ).ajaxComplete ( function ( event, xhr, settings ) {
		var  $collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' );
		if ( location.href == settings.url ) {
			$( this ).hide();
			for ( var i = 0; i < ajaxCallAgain.length; i++ ) {
				ajaxCallAgain[i]();
			}
			if ( $collapsibleElements.length ) {
				$collapsibleElements.makeCollapsible();
			}
			if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
				mw.special.recentchanges.init();
			}
		}
	} );
		loadPageData();
}

/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = '#mw-content-text';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		ajaxTimer = setTimeout( loadPageData, 10000 );
	} );
}

/**
 * Load the script on specific pages
 */
$( function () {
	if ( wgPageName == 'Special:RecentChanges' ) {
		preloadAJAXRL();
	}
} );