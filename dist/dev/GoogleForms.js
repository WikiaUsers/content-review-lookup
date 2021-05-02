/* Reimplement the ability to embed Google Forms on pages */
;( function() {
	'use strict';

	var i18n;

	function renderGoogleForm( element ) {
		const tagDefaults = {
			width: 760,
			height: 500
		};
		const tagData = element.dataset;

		// I don't want this to be a possible security risk, no
		if ( !tagData.url || !/^(https?:\/\/)?docs.google.com\/forms\//.test( tagData.url ) ) {
			element.innerHTML = '<strong class="error">' + i18n.msg( 'badOrNoUrl' ).escape()  + '</strong>';
			return false;
		}

		const formIframe = document.createElement( 'iframe' );

		formIframe.setAttribute( 'src', tagData.url );
		formIframe.setAttribute( 'width', ( tagData.width || tagDefaults.width + 'px' ) );
		formIframe.setAttribute( 'height', ( tagData.height || tagDefaults.height + 'px' ) );

		element.innerHTML = '';
		element.appendChild( formIframe );
	}

	function init() {
		mw.hook( 'wikipage.content' ).add( function( content ) {
			const googleFormInstances = content[0].querySelectorAll( 'div.googleForm' );

			if ( !!googleFormInstances ) {
				Array.from( googleFormInstances ).forEach( function( i ) {
					renderGoogleForm( i );
				} );
			}
		} );
	}

	mw.hook( 'dev.i18n' ).add( function( i18no ) {
		i18no.loadMessages( 'GoogleForms' ).done( function( i18no ) {
			i18n = i18no;
			init();
		} );
	} );

	importArticle( {
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	} );
} )();