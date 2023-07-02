/* Any JavaScript here will be loaded for all users on every page load. */

// <nowiki>

// [START: module]
( function ( $, mw ) {

	// Style backbutton dev wiki
	window.BackToTopModern = true;

	// Alternative to "mw.hook( 'wikipage.content' ).add()" that fires with all
	// previously given event data.
	var contentMemories = [];
	mw.hook( 'wikipage.content' ).add( function ( $element ) {
		if ( !contentMemories.includes( $element ) ) {
			contentMemories.push( $element );
		}
	} );
	window.safeAddContentHook = function () {
		var callback, contentMemory;
		for ( var i = 0; i < arguments.length; i++ ) {
			callback = arguments[ i ];
			for ( var j = 0; j < contentMemories.length - 1; ) {
				contentMemory = contentMemories[ j ];
				if ( contentMemory[ 0 ].isConnected ) {
					callback.call( null, contentMemory );
					j++;
				} else {
					contentMemories.splice( j, 1 );
				}
			}
			mw.hook( 'wikipage.content' ).add( callback );
		}
	};

// [START: DOM ready]
$( function () {

	// HTML attribute removal
	$( '.notitle a' ).removeAttr( 'title' );
	$( 'img.no-alt' ).removeAttr( 'alt' );

	// Slideshows
	mw.loader.using( 'mediawiki.api' ).then( function () {
		return mw.loader.getScript( 'https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts' );
	} ).then( function () {
		importArticle( {
			type: 'script',
			article: 'MediaWiki:Slideshows.js'
		} ).then( function () {
			slideshows.init();
		} );
	} );

	// Collection pages
	$( 'div.collection' ).on( 'scroll', function () {
		$( 'div.collection' ).scrollLeft( $( this ).scrollLeft() );
	} );

	// Collection fast load icon
	switch ( mw.config.get('wgPageName') ) {
		case 'Collection_Page_(Rebirth)':
		case 'Collection_Page_(Afterbirth)':
		case 'Collection_Page_(Afterbirth_†)':
		case 'Collection_Page_(Repentance)':
			$( 'body' ).addClass( 'is-content-expanded' );
			$( 'img.lazyload' ).each( function () {
				$( this )
					.attr( 'src', $( this ).attr( 'data-src' ) )
					.attr( 'class', 'lazyloaded' );
			});
			break;
	}

} );
// [END: DOM ready]
	
} )( jQuery, mediaWiki );
// [END: module]

// </nowiki>