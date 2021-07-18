/* Reimplement the ability to embed Google Forms on pages */
;( function() {
	'use strict';

	function renderGoogleForm( element ) {
		const tagDefaults = {
			width: 760,
			height: 500
		};
		const tagData = element.dataset;

		// I don't want this to be a possible security risk, no
		if ( !tagData.url || !/^(https?:\/\/)?docs.google.com\/forms\//.test( tagData.url ) ) {
			const errorMsg = 'Formularze Google: Nie podano adresu URL formularza, lub podany adres jest nieprawidłowy. Upewnij się, że używany jest poprawny adres URL „docs.google.com/forms/”.';

			element.innerHTML = '<strong class="error">' + errorMsg  + '</strong>';
			return false;
		}

		const formIframe = document.createElement( 'iframe' );

		formIframe.setAttribute( 'src', tagData.url );
		formIframe.setAttribute( 'width', ( tagData.width || tagDefaults.width + 'px' ) );
		formIframe.setAttribute( 'height', ( tagData.height || tagDefaults.height + 'px' ) );

		element.innerHTML = '';
		element.appendChild( formIframe );
	}

	mw.hook( 'wikipage.content' ).add( function( content ) {
		const googleFormInstances = content[0].querySelectorAll( 'div.googleForm' );

		if ( !!googleFormInstances ) {
			Array.from( googleFormInstances ).forEach( function( i ) {
				renderGoogleForm( i );
			} );
		}
	} );
} )();