/*
 * Automatically change the content model to CSS for template pages that end with "/estilos.css".
 */
;( function () {
	var conf = mw.config.get( [ 'wgArticleId', 'wgNamespaceNumber', 'wgPageName', 'wgPageContentModel' ] );
	
	if ( conf.wgArticleId === 0 || conf.wgNamespaceNumber !== 10 || !conf.wgPageName.match( /\.css$/ ) || conf.wgPageContentModel === 'css' ) {
		return;
	}
	
	mw.loader.using( 'mediawiki.api' ).then( function () {
		var api = new mw.Api();
		
		api.getToken( 'csrf' ).then( function ( token ) {
			$.post( 'https://plantillas.fandom.com/es/wiki/Especial:ChangeContentModel', {
				pagetitle: conf.wgPageName,
				model: 'css',
				reason: '',
				wpFormIdentifier: 'modelform',
				wpEditToken: token
			} ).then( function () {
				mw.hook( 'dev.banners' ).add( function ( BannerNotification ) {
				    new BannerNotification( 'Se ha cambiado el modelo de contenido de la página a CSS. La página será recargada en unos segundos.', 'confirm' ).show();
				    setTimeout( function () {
				    	location.reload();
				    }, 2500 );
				} );
				
				importArticle( {
				    type: 'script',
				    article: 'u:dev:MediaWiki:BannerNotification.js'
				} );
			} );
		} );
	} );
} )();