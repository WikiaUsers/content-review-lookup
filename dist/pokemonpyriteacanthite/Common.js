/* Any JavaScript here will be loaded for all users on every page load. */
importArticles( {
	type: 'script',
	articles: [
	]
} );
 
$( function () {
	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <http://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if ( mw.config.get( 'wgNamespaceNumber' ) === 1201 && $( '.mw-geshi' ).length ) {
		mw.loader.load( 'ext.geshi.local' );
	}
} );

importArticles({
    type: 'script',
    articles: [
        // other scripts
        'u:dev:QuickDelete/multiCats.js',
        // other scripts
    ]
});