/* JavaScript umieszony w tym pliku dotyczy wszystkich skórek */

/**
 * Import Change.js z The Elser Scrolls Wiki
 * Odpowiada za przełączanie zakładek z infoboksach
 */
importArticle( {
	type: 'script',
	article: 'u:pl.tes:MediaWiki:Change.js'
} );

/**
 * Widżet Discorda na [[Gothicpedia:Discord]]
 */
mw.hook( 'wikipage.content' ).add( function() {
	const discordWidget = document.getElementById( 'discord-widget' );

	// Element widżetu nie istnieje lub strona to nie projekt Discorda
	if ( !discordWidget || mw.config.get( 'wgArticleId' ) !== 133757 ) {
		return;
	}

	mw.loader.using( 'mediawiki.template.mustache', function() {
		// Wyrenderuj widżet z danych Mustache
		const widgetMustache = Mustache.render(
			'<a href="{{discordLink}}" rel="nofollow" target="_blank">' +
				'<img src="{{discordImage}}" />' +
			'</a>',
			{
				discordLink: 'https://discord.gg/' + discordWidget.dataset.invite,
				discordImage: 'https://discord.com/api/guilds/' + discordWidget.dataset.id + '/widget.png?style=banner3'
			}
		);

		// Dodaj widżet do jego elementu
		discordWidget.innerHTML = widgetMustache;
	} );
} );

/**
 * Kliknięcie gdziekolwiek na element kategorii strony głównej niech będzie przekierowaniem
 */
mw.hook( 'wikipage.content' ).add( function() {
	const categoryElements = document.querySelectorAll( '.categories-list .cat-el' );

	// Sprawdź, czy istnieją elementy kategorii
	if ( !!categoryElements ) {
		/**
		 * Wykorzystanie konstruktora MouseEvent() do zarejestrowania
		 * wydarzenia kliknięcia, a później jego wykonania jest lepsze
		 * od użycia location.replace(), bo pozwala m.in. na powrót do
		 * poprzedniej strony przy użyciu nawigacji w przeglądarce.
		 */
		const clickEvent = new MouseEvent( 'click', {
			view: window,
			bubbles: true,
			cancelable: false
		} );

		categoryElements.forEach( function( category ) {
			const categoryLink = category.querySelector( 'a' );

			category.addEventListener( 'click', function() {
				categoryLink.dispatchEvent( clickEvent );
			} );
		} );
	}
} );

importArticle( {
	type: 'script',
	article: 'MediaWiki:SocialMedia.js'
} );