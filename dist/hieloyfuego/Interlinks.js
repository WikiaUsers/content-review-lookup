mw.hook( 'AddRailModule.module' ).add( function( module ) {
	if ( module === 'Template:RailModule' ) {
		var $Interlinks = $( '#Interlinks' );
		if ( $Interlinks.length === 0 ) {
			$( '.railModule' ).remove();
		} else {
			$( '#InterlinksPlaceholder' ).html( $( '#Interlinks' ) );
			$( '#Interlinks' ).show();
		}
	}
});

window.AddRailModule = [
	{ page: 'Template:RailModule', prepend: true }
];

importArticles( {
	type: 'script',
	articles: [
		'u:dev:MediaWiki:AddRailModule/code.js'
	]
} );