/*
 * Load custom CSS per page using [[Template:CSS]].
 * Only allows titles that match the following regex: ^[a-z0-9_-]+$
 * CSS is imported using an @import statement. The /load.php request will be cached for subsequent requests if the imported styles are the same.
 * For use only in templates that only have styles for desktop and don't intend to support.
 */
;( function() {
	var api;

	function init() {
		if ( window.loadCssScript ) {
			return;
		}
		window.loadCssScript = true;
		api = new mw.Api();
		
		var requests = [];
		document.querySelectorAll( '.load-css' ).forEach( function ( span ) {
		    var title = span.dataset.cssSource;
		    if ( title.match( /^[a-z0-9_-]+$/i ) ) {
		    	var page = 'Plantilla:' + title + '/estilos.css' ;
		    	requests.push( getRevision( page ) );
		    }
		} );
		
		$.when.apply( null, requests ).then( function () {
			var revisions = [].concat.apply( [], arguments );
			mw.util.addCSS( revisions.join( '' ) );
		} );
	}
	
	function getRevision( title ) {
		var promise = $.Deferred();
		
		api.get( {
			action: 'query',
			formatversion: 2,
			prop: 'revisions',
			rvprop: 'content',
			rvslots: '*',
			titles: title
		} ).then( function ( result ) {
			var page = result.query.pages[ 0 ];
			if ( page.missing ) {
				promise.resolve( null );
				return;
			}
			
			var content = page.revisions[ 0 ].slots.main.content;
			
			promise.resolve( content );
		} );
		
		return promise;
	}
	
	mw.hook( 'wikipage.content' ).add( init );
} )();