( function ( $, mw ) {
	'use strict';
	const config = mw.config.get( [
		'wgAction',
		'wgCanonicalNamespace',
		'wgCanonicalSpecialPageName',
		'wgIsTestModeEnabled',
		'wgPageName',
		'wgTitle'
	] );
	if ( window.SpriteEditorLoaded ) {
		return;
	}
	window.SpriteEditorLoaded = true;

	window.SpriteEditorModules = {
		shared: {},
		main: {
			blacklist: [
				'animatesprite',
				'sprite'
			],
			flags: [ // [tag-name, display title]
				[ 'deprecated', 'Deprecated' ],
				[ 'black', 'Black' ],
				[ 'dark', 'Dark' ],
				[ 'nolink', 'No link' ]
			]
		},
		seperatePath: function ( path ) {
			let a = path.split( '/' );
			if ( a.length === 1 ) {
				a[ 1 ] = a[ 0 ].slice( a[ 0 ].indexOf( ':' ) + 1 );
			}
			return {
				full: path.slice( path.indexOf( ':' ) + 1 ),
				module: a[ 0 ].slice( a[ 0 ].indexOf( ':' ) + 1 ),
				name: a[ a.length - 1 ],
				all: a
			};
		}
	};

	window.SpriteEditorModules.main.flags = window.SpriteEditorModules.main.flags.concat( window.SpriteEditorFlags || [] );
	window.SpriteEditorModules.main.blacklist = window.SpriteEditorModules.main.blacklist.concat( window.SpriteEditorBlacklist || [] );

	let loadPHP = 'https://dev.fandom.com/load.php',
		jsFiles = [
			'MediaWiki:SpriteEditor/spriteutils.js',
			'MediaWiki:SpriteEditor/main.js'
		],
		files = [],
		sP = new URL( document.location ).searchParams;
	if ( config.wgAction === 'view' &&
	!sP.has( 'oldid' ) &&
	!sP.has( 'curid' ) &&
	( config.wgCanonicalNamespace === 'Module' || config.wgCanonicalNamespace === 'Template' ) &&
	config.wgTitle.split( '/' )[ 0 ].slice( -6 ) === 'Sprite' ) {
		const names = window.SpriteEditorModules.seperatePath( config.wgPageName );
		if ( names.module.slice( -6 ) !== 'Sprite' ||
		Array.prototype.includes.call( window.SpriteEditorModules.main.blacklist, names.module.toLowerCase() ) ) {
			return;
		}
		files = jsFiles.concat( [ 'MediaWiki:SpriteEditor/openButton.js' ] );
	}
	if ( config.wgCanonicalSpecialPageName === 'Blankpage' &&
	config.wgTitle.slice( -13 ) === '/SpriteEditor' ) {
		files = jsFiles.concat( [
			'MediaWiki:SpriteEditor/diff.js',
			'MediaWiki:SpriteEditor/new.js',
			'MediaWiki:SpriteEditor/open.js',
			'MediaWiki:SpriteEditor/sprite_reorder.js',
			'MediaWiki:SpriteEditor/settings.js'
		] );
	}
	if ( files.length > 2 ) {
		let a;
		if ( config.wgIsTestModeEnabled ) {
			a = mw.loader.load( loadPHP + '?mode=articles&only=scripts&articles=test:' + encodeURI( files.join( '|test:' ) ) + '&*' );
		} else {
			a = mw.loader.load( loadPHP + '?mode=articles&only=scripts&articles=' + encodeURI( files.join( '|' ) ) + '&*' );
		}
		Promise.allSettled( [ a ] ).then( function () {
			let checkExist = setInterval( function () {
				if ( window.SpriteEditorModules.main.run ) {
					clearInterval( checkExist );
					if ( // Don't load if the user hasn't specified a position for preview on sprite-template pages.
						window.SpriteEditorModules.openButton &&
						Array.prototype.includes.call( [ 'Template', 'Module' ], config.wgCanonicalNamespace ) &&
						!document.getElementById( 'sprite-root' )
					) {
						return;
					}
					$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="' + loadPHP + '?mode=articles&articles=MediaWiki:SpriteEditor.css&only=styles">' );
					window.SpriteEditorModules.main.run();
				}
			}, 500 );
		} );
	}
}( window.jQuery, window.mediaWiki ) );