mw.loader.using( 'mediawiki.api', function () {
	mw.hook( 'wikipage.content' ).add( function () {
		var config = mw.config.get( [ 'wgCategories' ] );
		var categories = config.wgCategories.filter( function ( category ) {
			return category.startsWith( 'Mantenimiento: ' );
		} ).map( function ( category ) {
			return category.substring( 'Mantenimiento: '.length );
		} );
		if ( categories.length === 0 ) {
			return;
		}
		
		var options = require( './maintenance.json' );
		var api = new mw.Api();
		var templates = [];
		categories.forEach( function ( category ) {
			var params = options[ category ] || options.default;
			var args = Object.entries( params ).map( function ( entry ) {
				return '| ' + entry[ 0 ] + ' = ' + entry[ 1 ];
			} );
			var template = '{{Aviso' + args.join( '' ) + '}}';
			templates.push( template );
		} );
		templates.push( '{{Mantenimiento/pie}}' );

		api.get( {
			action: 'parse',
			format: 'json',
			formatversion: 2,
			text: templates.join( '' )
		} ).then( function ( result ) {
			var html = result.parse.text;
			document.querySelector( '.page-content' ).insertAdjacentHTML( 'beforebegin', html );
		} );
	} );
} );