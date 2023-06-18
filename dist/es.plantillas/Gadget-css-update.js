/*
 * Gadget for admins.
 * If the user is in a template page, checks if there is an associated stylesheet at /estilos.css.
 * If there is, requests the page and checks if there is also a page MediaWiki:TEMPLATE.css.
 * Compares both pages' checksums to know if they are up to date. If they aren't, provides a button to update.
 * Additionally, updates the @import statement in MediaWiki:Common.css.
 * ----
 * Additional notes:
 * If the number of imported pages starts to grow, it may need to consider supporting multiple imports or appending all styles into the same page. Problem for the future.
 */
;( function() {
	var api;
	var conf = mw.config.get( [ 'wgNamespaceNumber', 'wgPageName' ] );

	function init() {
		if ( conf.wgNamespaceNumber !== 10 ) {
			return;
		}
		
		if ( document.querySelector( '.load-css' ) ) {
			caseDesktopOnly();
			return;
		}
		
		var title;
		if ( conf.wgPageName.match( /\/estilos.css$/ ) ) {
			title = conf.wgPageName.substring( 10, conf.wgPageName.length - 12 );
		} else {
			title = conf.wgPageName.substring( 10 );
		}
		
		api = new mw.Api();
		$.when( getRevision( 'Plantilla:' + title + '/estilos.css' ), getRevision( 'MediaWiki:' + title + '.css' ) ).then( function ( template, mediawiki ) {
			
			var caseFunction = null;

			if ( !template ) {
				caseFunction = caseTemplateWithoutCss;
			} else if ( !mediawiki ) {
				caseFunction = caseMediaWikiNotCreated;
			} else if ( template.sha1 !== mediawiki.sha1 ) {
				caseFunction = caseMediaWikiOutdated;
			} else {
				caseFunction = caseUpToDate;
			}
			
			caseFunction( title, template.content );
		} );
	}
	
	function getRevision( title ) {
		var promise = $.Deferred();
		
		api.get( {
			action: 'query',
			formatversion: 2,
			prop: 'revisions',
			rvprop: 'content|sha1',
			rvslots: '*',
			titles: title
		} ).then( function ( result ) {
			var page = result.query.pages[ 0 ];
			if ( page.missing ) {
				promise.resolve( null );
				return;
			}
			
			var sha1 = page.revisions[ 0 ].sha1;
			var content = page.revisions[ 0 ].slots.main.content;
			
			promise.resolve( {
				content: content,
				sha1: sha1
			} );
		} );
		
		return promise;
	}
	
	function caseDesktopOnly() {
		addModule( 'Esta plantilla tiene CSS propio solo para FandomDesktop, por lo que no es necesario actualizarlo en el CSS del wiki.' );
	}
	
	function caseTemplateWithoutCss() {
		addModule( 'Esta plantilla no tiene CSS propio, por lo que no es necesario actualizarlo.' );
	}
	
	function caseMediaWikiNotCreated( title, content ) {
		var label = 'Esta plantilla tiene CSS propio, pero no ha sido trasladado a una página MediaWiki para ser importado.';
		if ( conf.wgPageName.match( /estilos\.css$/ ) ) {
			addModule(
				label,
				'Crear',
				function () {
					performEdit( title, content );
				}
			);
		} else {
			addModule(
				label,
				'Revisar',
				'/es/wiki/Plantilla:' + title + '/estilos.css'
			);
		}
	}
	
	function caseMediaWikiOutdated( title, content ) {
		var label = 'El CSS propio de esta plantilla no ha sido actualizado en la página MediaWiki.';
		
		if ( conf.wgPageName.match( /estilos\.css$/ ) ) {
			addModule(
				label,
				'Actualizar',
				function () {
					performEdit( title, content );
				}
			);
		} else {
			addModule(
				label,
				'Revisar',
				'/es/wiki/Plantilla:' + title + '/estilos.css'
			);
		}
	}
	
	function caseUpToDate() {
		addModule( 'El CSS propio de esta página ya se encuentra actualizado en la página MediaWiki.' );
	}
	
	function addModule( text, buttonText, buttonCallback ) {
		findContainer( '.sticky-modules-wrapper' ).then( function ( wrapper ) {
			var module = document.createElement( 'section' );
			module.classList.add( 'rail-module' );
			module.id = 'css-module';
			
			var header = document.createElement( 'h2' );
			header.classList.add( 'rail-module__header', 'has-icon' );
			header.innerText = 'Estado de CSS';
			module.append( header );
			
			var content = document.createElement( 'p' );
			content.innerText = text;
			module.append( content );
			
			if ( buttonText && buttonCallback ) {
				var button;
				if ( typeof buttonCallback === 'string' ) {
					button = document.createElement( 'a' );
					button.href = buttonCallback;
				} else {
					button = document.createElement( 'button' );
					button.addEventListener( 'click', buttonCallback );
				}
				button.classList.add( 'wds-button' );
				button.innerText = buttonText;
				module.append( button );
			}
			
			wrapper.prepend( module );
		} );
	}

	// https://dev.fandom.com/wiki/MediaWiki:AddUserRightsTag/code.js
	function findContainer( identifier ) {
		var promise = $.Deferred();
		var interval = setInterval( function() {
			var $element = document.querySelector( identifier );
			if ( $element ) {
				clearInterval( interval );
				promise.resolve( $element );
			}
		}, 300 );
		return promise;
	}
	
	function performEdit( title, content ) {
		var promise = $.Deferred();
		
		document.querySelector( '#css-module button' ).disabled = true;

		var page = title.replace( '/estilos.css', '' );
		api.postWithToken( 'csrf', {
			action: 'edit',
			text: content,
			title: 'MediaWiki:' + page + '.css'
		} ).then( function () {
			return verifyImport( 'MediaWiki:' + page + '.css' );
		} ).then( function () {
			showBanner();
			promise.resolve();
		} );
		
		return promise;
	}
	
	function verifyImport( title ) {
		var promise = $.Deferred();
		
		var source = 'https://plantillas.fandom.com/es/load.php?lang=es&modules=site.styles&only=styles&skin=fandomdesktop';
		var titles = [];

		for ( var i = 0; i < document.styleSheets.length; i++ ) {
			var sheet = document.styleSheets[ i ];
			if ( sheet.href !== source ) continue;
			var url = new URL( sheet.cssRules[ 0 ].href, mw.config.get( 'wgServer' ) );
			titles = url.searchParams.get( 'articles' ).split( /\|/g );
			
			var isAlreadyImported = titles.find( function ( item ) {
				return item === title;
			} );
			if ( isAlreadyImported ) {
				promise.resolve();
				return;
			}

			titles.push( title );
			break;
		}
		
		if ( titles.length === 0 ) {
			promise.resolve();
			return;
		}

		var cssImport = '@import url("/es/load.php?mode=articles&articles=' + titles.join( '|' ) + '&only=styles");';
		api.postWithToken( 'csrf', {
			action: 'edit',
			text: cssImport,
			title: 'MediaWiki:Common.css'
		} ).then( function () {
			promise.resolve();
		} );
		
		return promise;
	}
	
	function showBanner() {
		mw.hook( 'dev.banners' ).add( function ( BannerNotification ) {
		    new BannerNotification( 'Se ha actualizado correctamente el CSS.', 'confirm' ).show();
		} );
		
		importArticle( {
		    type: 'script',
		    article: 'u:dev:MediaWiki:BannerNotification.js'
		} );
	}
	
	mw.hook( 'wikipage.content' ).add( init );
} )();