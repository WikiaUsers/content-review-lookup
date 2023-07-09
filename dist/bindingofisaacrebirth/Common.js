/* Any JavaScript here will be loaded for all users on every page load. */

// <nowiki>

// [START: module]
( function ( $, mw ) {

	// Style backbutton dev wiki
	window.BackToTopModern = true;

	// Alternative to "mw.hook( 'wikipage.content' ).add()" that fires with all
	// previously given event data.
	const contentMemories = [];
	mw.hook( 'wikipage.content' ).add( function ( $element ) {
		if ( !contentMemories.includes( $element ) ) {
			contentMemories.push( $element );
		}
	} );
	window.safeAddContentHook = function () {
		for ( var i = 0; i < arguments.length; i++ ) {
			const callback = arguments[ i ];
			for ( var j = 0; j < contentMemories.length - 1; ) {
				const contentMemory = contentMemories[ j ];
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

	// Hide CodeEditor warnings related to the use of "const" in JS,
	//   since this is the only ES6 feature recognized by the JS validator.
	// About browsers without any support:
	//   - IE11 only has issues dealing with "const" in "for" loops, and
	//   - Opera Mini handles "const" the same way as "var".
	mw.hook( 'codeEditor.configure' ).add( function ( editSession ) {
		editSession.addEventListener( 'changeAnnotation', function () {
			const annotations = editSession.getAnnotations();
			if ( !annotations.every( isValidAnnotation ) ) {
				editSession.setAnnotations( annotations.filter( isValidAnnotation ) );
			}
		} );
	} );
	function isValidAnnotation( annotation ) {
		return annotation.text !== "'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).";
	}

// [START: DOM ready]
$( function () {

	// HTML attribute removal
	$( '.notitle a' ).removeAttr( 'title' );
	$( 'img.no-alt' ).removeAttr( 'alt' );

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