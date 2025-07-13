// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.
( function () {
	'use strict';
	if ( window.SpriteEditorLoaded ) {
		return;
	}
	window.SpriteEditorLoaded = true;
	const blacklist = [
			'animatesprite',
			'sprite'
		],
		config = mw.config.get( [
			'wgAction',
			'wgArticleId',
			'wgCanonicalNamespace',
			'wgCanonicalSpecialPageName',
			'wgIsTestModeEnabled',
			'wgPageName',
			'wgTitle'
		] ),
		loadPHP = 'https://dev.fandom.com/load.php',
		seperatePath = function ( path ) {
			const a = path.split( '/' );
			if ( a.length > 0 && a[ 0 ].indexOf( ':' ) ) {
				a[ 0 ] = a[ 0 ].slice( a[ 0 ].indexOf( ':' ) + 1 );
			}
			return {
				full: a.join( '/' ),
				module: a[ 0 ],
				name: a[ a.length - 1 ],
				all: a
			};
		},
		searchParams = new URL( document.location ).searchParams;
	let buttonLoaded = false,
		loadURL = loadPHP + '?mode=articles&only=scripts&articles=%1&*';
	if ( config.wgIsTestModeEnabled ) {
		loadURL = loadURL.replace( '%1', 'test:%1' );
	}
	if ( config.wgAction === 'view' &&
		!searchParams.has( 'oldid' ) &&
		!searchParams.has( 'curid' ) &&
		Array.prototype.includes.call( [ 'Template', 'Module' ], config.wgCanonicalNamespace ) ) {
		const names = seperatePath( config.wgPageName );
		if ( config.wgArticleId === 0 || names.module.slice( -6 ) !== 'Sprite' ||
		Array.prototype.includes.call( blacklist, names.module.toLowerCase() ) ) {
			return;
		}
		mw.loader.load( loadURL.replace( '%1', 'MediaWiki:SpriteEditor/openButton.js' ) );
		buttonLoaded = true;
	}
	if ( ( buttonLoaded && document.getElementById( 'sprite-root' ) ) || ( config.wgCanonicalSpecialPageName === 'Blankpage' &&
		config.wgTitle.slice( -13 ) === '/SpriteEditor' ) ) {
		mw.loader.load( loadURL.replace( '%1', 'MediaWiki:SpriteEditor/main.js' ) );
	}
}() );