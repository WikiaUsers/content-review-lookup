/**
 * Facebook.js
 * Dodaje wysuwaną pływającą ramkę Facebooka w prawym rogu ekranu
 */
( function( mw, window ) {
	'use strict';

	/**
	 * Funkcja sprawdzającą status akceptacji śledzenia
	 *
	 * Używa kodu z bloga plainJS
	 * https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
	 */
	function isTrackingRejected() {
		// Pobierz zawartość ciasteczka
		const cookieName = 'tracking-opt-in-status';
		const v = document.cookie.match( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );

		// Zwróć porównanie z tekstem `accepted` lub null jeśli ciasteczko nie istnieje
		return v ? ( v[2] !== 'accepted' ) : null;
	}

	/**
	 * Uproszczony fragment modułu browserDetect z bazy kodu Fandomu
	 * https://github.com/Wikia/app/blob/dev/resources/wikia/modules/browserDetect.js
	 */
	const isMobileSession = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );

	// Nie uruchamiaj na FandomDesktop
	const isFandomDesktop = mw.config.get( 'skin' ) === 'fandomdesktop';

	// Nie uruchamiaj skryptu w określonych okolicznościach
	if ( isFandomDesktop || isTrackingRejected() || isMobileSession || window.FloatingFBLoaded ) {
		return;
	}

	// Załaduj CSS
	importArticle( {
		type: 'style',
		article: 'MediaWiki:Facebook.css'
	} );

	// Główna funkcja skryptu
	mw.loader.using( 'mediawiki.Uri', function() {
		/**
		 * Instancja `mw.Uri()` w której przetwarzany będzie link do Facebooka
		 *
		 * Dokumentacja API Facebooka:
		 * https://developers.facebook.com/docs/plugins/page-plugin/
		 */
		var facebookURI = new mw.Uri( 'https://facebook.com/plugins/page.php' );

		facebookURI.query = {
			href: 'https://facebook.com/gothicpedia/',
			tabs: 'timeline',
			width: 195,
			height: 360,
			small_header: true,
			adapt_container_width: false,
			hide_cover: false,
			show_facepile: true,
			appId: ''
		};

		// Dodaj ramkę do strony
		var element = document.createElement( 'div' );
		var content = document.createElement( 'iframe' );

		content.setAttribute( 'src', facebookURI.toString() );
		content.setAttribute( 'width', 195 );
		content.setAttribute( 'height', 360 );
		content.setAttribute( 'scrolling', 'no' );
		content.setAttribute( 'frameborder', 0 );
		content.setAttribute( 'allowTransparency', true );

		element.setAttribute( 'id', 'FacebookWnd' );

		element.appendChild( content );
		document.body.appendChild( element );
	} );

	// Oznacz skrypt jako wykonany
	window.FloatingFBLoaded = true;
} )( mediaWiki, this );