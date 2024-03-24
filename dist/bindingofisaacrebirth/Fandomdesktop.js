/* Any JavaScript here will be loaded for all users using the FandomDesktop skin on every page load. */

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

	// Shows gadget dependencies on the Preferences page.
	// I.e. if a gx gadget requires a gy gadget, you can show this dependency
	// by specifying it with a placeholder element on the Gx description
	// [[MediaWiki:gadget-gx]]:
	//   <span class="htmlform-field-constraint" data-field-requires="gy"></span> ...
	mw.hook( 'htmlform.enhance' ).add( function () {
		const $fieldSet = $( '#mw-prefsection-gadgets' );
		if ( !$fieldSet.length || $fieldSet.hasClass( 'htmlform-constrained' ) ) {
			return;
		}
		$fieldSet.find( '.mw-htmlform-field-HTMLCheckField' ).each( function () {
			const $field      = $( this );
			const $constraint = $field.find( '.htmlform-field-constraint' ).first();
			if ( !$constraint.length ) {
				return;
			}
			const required = $constraint.attr( 'data-field-requires' );
			if ( required ) {
				$( '#mw-input-wpgadget-' + required )
					.parents( '.oo-ui-fieldLayout-field' ).first()
					.siblings( '.oo-ui-fieldLayout-header' ).first()
					.append( $field );
			}
		} );
	} );

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