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
		
		var title = conf.wgPageName;
		if ( title.match( /\.css$/ ) ) {
			return;
		}
		title = title.replace( 'Plantilla:', '' );
		
		api = new mw.Api();
		
		var common = 'Plantilla:' + title + '/common.css';
		var fandomdesktop = 'Plantilla:' + title + '/fandomdesktop.css';
		var fandommobile = 'Plantilla:' + title + '/fandommobile.css';
		var mwCommon = 'MediaWiki:' + title + '/common.css';
		var mwFandomdesktop = 'MediaWiki:' + title + '/fandomdesktop.css';
		var mwFandommobile = 'MediaWiki:' + title + '/fandommobile.css';
		getChecksums( [
			common, fandomdesktop, fandommobile,
			mwCommon, mwFandomdesktop, mwFandommobile
		] ).then( function ( cs ) {
			if ( !cs[ common ] && !cs[ fandomdesktop ] && !cs[ fandommobile ] ) {
				caseTemplateWithoutCss( title );
			} else if ( cs[ common ] === cs[ mwCommon ] && cs[ fandomdesktop ] === cs[ mwFandomdesktop ] && cs[ fandommobile ] === cs[ mwFandommobile ] ) {
				caseUpToDate();
			} else {
				caseOutdated( title, cs );
			}
		} );
	}
	
	function getChecksums( titles ) {
		var promise = $.Deferred();

		api.get( {
			action: 'query',
			format: 'json',
			formatversion: 2,
			prop: 'revisions',
			rvprop: 'sha1',
			titles: titles.join( '|' )
		} ).then( function ( result ) {
			var checksums = {};

			for ( var i = 0; i < result.query.pages.length; i++ ) {
				var page = result.query.pages[ i ];
				if ( page.missing ) continue;
				checksums[ page.title ] = page.revisions[ 0 ].sha1;
			}
			
			promise.resolve( checksums );
		} );

		return promise;
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

	function getMultipleRevisions( titles ) {
		var promise = $.Deferred();

		var promises = [];
		for ( var i = 0; i < titles.length; i++ ) {
			promises.push( getRevision( titles[ i ] ) );
		}

		$.when.apply( undefined, promises ).then( function() {
			var content = {};
			for ( var i = 0; i < titles.length; i++ ) {
				var title = titles[ i ];
				var page = arguments[ i ];

				if ( page ) {
					content[ title ] = page;
				}
			}
			promise.resolve( content );
		} );

		return promise;
	}
	
	function caseDesktopOnly() {
		addModule( 'Esta plantilla tiene CSS propio solo para FandomDesktop, por lo que no es necesario actualizarlo en el CSS del wiki.' );
	}
	
	function caseTemplateWithoutCss() {
		addModule( 'Esta plantilla no tiene CSS propio, por lo que no es necesario actualizarlo.' );
	}
	
	function caseUpToDate() {
		addModule( 'El CSS propio de esta página ya se encuentra actualizado en la página MediaWiki.' );
	}

	function caseOutdated( title, cs ) {
		var common = 'Plantilla:' + title + '/common.css';
		var fandomdesktop = 'Plantilla:' + title + '/fandomdesktop.css';
		var fandommobile = 'Plantilla:' + title + '/fandommobile.css';
		var mwCommon = 'MediaWiki:' + title + '/common.css';
		var mwFandomdesktop = 'MediaWiki:' + title + '/fandomdesktop.css';
		var mwFandommobile = 'MediaWiki:' + title + '/fandommobile.css';

		var requiredRevisions = [];
		if ( cs[ common ] !== cs[ mwCommon ] ) {
			requiredRevisions.push( common );
		}
		if ( cs[ fandomdesktop ] !== cs[ mwFandomdesktop ] ) {
			requiredRevisions.push( fandomdesktop );
		}
		if ( cs[ fandommobile ] !== cs[ mwFandommobile ] ) {
			requiredRevisions.push( fandommobile );
		}

		var section = document.createElement( 'div' );
		section.insertAdjacentText( 'afterbegin', 'Las siguientes hojas de estilos necesitan ser actualizadas.' );

		var ul = document.createElement( 'ul' );
		section.append( ul );

		for ( var i = 0; i < requiredRevisions.length; i++ ) {
			var page = requiredRevisions[ i ];
			var li = document.createElement( 'li' );
			var a = document.createElement( 'a' );
			a.href = '/es/wiki/' + page;
			a.innerText = '/' + page.split( /\//g ).at( -1 );
			a.dataset.page = page;

			li.append( a );
			ul.append( li );
		}

		var button = createButton( 'Actualizar', updateCss );
		addModule( section, [ button ] );
	}

	function updateCss() {
		var list = document.querySelectorAll( '#css-module ul a' );
		var titles = [];
		for ( var i = 0; i < list.length; i++ ) {
			var link = list[ i ];
			titles.push( link.dataset.page );
		}

		getMultipleRevisions( titles ).then( function ( contents ) {
			var entries = Object.entries( contents );
			for ( var i = 0; i < entries.length; i++ ) {
				var entry = entries[ i ];
				var title = entry[ 0 ];
				var content = entry[ 1 ];

				api.postWithToken( 'csrf', {
					action: 'edit',
					summary: 'Actualización de CSS a través de módulo.',
					text: content,
					title: title.replace( 'Plantilla', 'MediaWiki' )
				} ).then( function () {
					new BannerNotification( 'Se ha actualizado la siguiente hoja de estilos: ' + title.replace( 'Plantilla:', '' ) + '.', 'confirm' ).show();
				} );
			}

			var titles = Object.keys( contents );
			for ( var j = 0; j < titles.length; j++ ) {
				verifyImport( titles[ j ] );
			}
		} );
	}

	function createButton( text, callback ) {
		var button;
		if ( typeof callback === 'string' ) {
			button = document.createElement( 'a' );
			button.href = callback;
		} else {
			button = document.createElement( 'button' );
			button.addEventListener( 'click', callback );
		}
		button.classList.add( 'wds-button' );
		button.innerText = text;
		return button;
	}
	
	function addModule( text, buttons ) {
		findContainer( '.sticky-modules-wrapper' ).then( function ( wrapper ) {
			var module = document.createElement( 'section' );
			module.classList.add( 'rail-module' );
			module.id = 'css-module';
			
			var header = document.createElement( 'h2' );
			header.classList.add( 'rail-module__header', 'has-icon' );
			header.innerText = 'Estado de CSS';
			module.append( header );
			
			var content;
			if ( typeof text === 'string' ) {
				content = document.createElement( 'p' );
				content.innerText = text;
			} else {
				content = text;
			}
			module.append( content );
			
			if ( buttons ) {
				for ( var i = 0; i < buttons.length; i++ ) {
					module.append( buttons[ i ] );
				}
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
	
	function verifyImport( title ) {
		title = title.replace( 'Plantilla', 'MediaWiki' );
		var promise = $.Deferred();
		
		var mediawiki = 'MediaWiki:' + title.split( /\//g ).at( -1 );
		if ( mediawiki === 'MediaWiki:fandommobile.css' ) {
			mediawiki = 'MediaWiki:FandomMobile.css';
		}

		getRevision( mediawiki ).then( function ( content ) {
			var atImport = content.match( /@import url\("(.*?)"\);/ );

			var importUrl = new URL ( atImport[ 1 ], mw.config.get( 'wgServer' ) );
			var titles = importUrl.searchParams.get( 'articles' ).split( /\|/g );

			var isAlreadyImported = titles.find( function ( item ) {
				return item === title;
			} );
			if ( isAlreadyImported ) {
				promise.resolve();
				return;
			}

			titles.push( title );
			var cssImport = '@import url("/es/load.php?mode=articles&articles=' + titles.join( '|' ) + '&only=styles");';
			api.postWithToken( 'csrf', {
				action: 'edit',
				text: cssImport,
				title: mediawiki
			} );
		} );
		
		return promise;
	}
	
	var BannerNotification;
	mw.hook( 'dev.banners' ).add( function ( BN ) {
		BannerNotification = BN;
		mw.hook( 'wikipage.content' ).add( init );
	} );
		
	importArticle( {
		type: 'script',
		article: 'u:dev:MediaWiki:BannerNotification.js'
	} );
} )();