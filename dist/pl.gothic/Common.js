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
	const categoryElements = document.querySelectorAll( 'li.cat-el' );

	/**
	 * Gdy elementy istnieją (t.j. jesteśmy na stronie głównej), dodaj eventListenery nasłuchujące 
	 * kliknięcia na element kategorii, a następnie przekierujące do odpowiadajacej im strony
	 */
	if ( !!categoryElements ) categoryElements.forEach( function( category ) {
		category.addEventListener( 'click', function() {
			mw.loader.using( 'mediawiki.util', function() {
				location.replace( mw.util.getUrl( 'Kategoria:' + category.dataset.catName ) );
			} );
		} );
	} );
} );

/**
 * Moduł ResourceLoadera dodający hook wykonywany po załadowaniu prawego panelu
 * Potrzebny do skryptów osadzanych w treści prawego panelu wiki
 */
mw.loader.implement( 'custom.righRailHook', function() {
	// Prawy panel nie istnieje, zakończ
	if ( !document.querySelector( '.page__right-rail' ) ) {
		return;
	}

	// Opóźnienie wynosi 150ms
	const intervalDelay = 150;

	// Zarejestruj interwał nasłuchujący istnienia panelu
	const rightRailInterval = setInterval( function() {
		// Panel został załadowany
		if ( !!document.querySelector( '.sticky-modules-wrapper' ) ) {
			// Usuń interwał
			clearInterval( rightRailInterval );

			// Wykonaj hook
			mw.hook( 'custom.rightRail.loaded' ).fire(
				// Zwróć callback z zawartością panelu
				document.querySelector( '.right-rail-wrapper' )
			);
		}
	}, intervalDelay );
} );