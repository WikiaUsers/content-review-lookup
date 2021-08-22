/**
 * Dynamiczny, w pełni modyfikowalny moduł mediów społecznościowych w prawym panelu wiki
 *
 * @author Rail
 * <nowiki>
 */
mw.loader.using( [ 'mediawiki.api', 'mediawiki.template.mustache' ], function() {
	'use strict';

	// Prawy panel nie istnieje lub moduł SM został dodany
	if ( !document.querySelector( '.page__right-rail' ) || window.smRailLoaded ) {
		return;
	}
	window.smRailLoaded = true;

	var smRail = {};
	
	/**
	 * Ta funkcja odpytuje API MediaWiki w celu zdobycia konfiguracji modułu
	 * mediów społecznościowych przechowywanej na stronie MediaWiki:SocialMedia.json
	 */
	smRail.getJsonConfig = function( callback ) {
		var jsonConfig;

		new mw.Api().get( {
			formatversion: 2,
			action: 'query',
			titles: 'MediaWiki:SocialMedia.json',
			prop: 'revisions',
			rvprop: [
				'content',
				'contentmodel'
			],
			rvslots: 'main',
			rvlimit: 1
		} ).done( function( resp ) {
			// Błąd API
			if ( resp.error ) {
				return console.error( 'SocialMedia: ApiErrorException', resp.error );
			}

			const apiResp = resp.query.pages[0].revisions[0].slots.main;

			// Nieprawidłowy model zawartości
			if ( apiResp.contentmodel !== 'json' ) {
				return console.error( 'SocialMedia: InvalidConfigContentModelException' );
			}

			// Spróbuj przeparsować JSON-a
			try {
				jsonConfig = JSON.parse( apiResp.content );
			} catch ( error ) {
				throw new Error( 'SocialMedia: InvalidJsonConfigSyntaxException' );
			}

			// Zwróć konfigurację jako callback
			return callback( jsonConfig );
		} ).fail( function() {
			console.error( 'SocialMedia: AjaxErrorException' );
		} );
	};

	/**
	 * Wyrenderuj moduł mediów społecznościowych pod innymi przykjlejonymi modułami
	 */
	smRail.renderModule = function() {
		// Znajdź element przyklejonych modułów
		const stickyRail = smRail.rightRail.querySelector( '.sticky-modules-wrapper' );

		// Stwórz wrappera dla modułu i nadaj mu klasy
		const moduleWrapper = document.createElement( 'section' );
		moduleWrapper.classList.add( 'rail-module' );
		moduleWrapper.classList.add( 'socialMediaModule' );

		// Przy użyciu Mustache.js wyrenderuj HTML modułu
		const wrapperTemplate = '<h2 class="rail-module__header socialMediaHeader">{{headerText}}</h2>' +
			'<p class="socialMediaDesc">{{descText}}</p>' +
			'<div class="socialMediaLinks">' +
				'{{#listElements}}' +
					'<a class="listItem" data-site="{{label}}" href="{{link}}" rel="nofollow" target="_blank">' +
						'<div class="listItem-image">' +
							'<img src="{{image}}" alt="{{alt}}" />' +
						'</div>' +
						'<div class="listItem-label">' +
							'<strong>{{label}}</strong>' +
						'</div>' +
					'</a>' +
				'{{/listElements}}' +
			'</div>';

		const wrapperData = {
			headerText: smRail.conf.headerText,
			descText: smRail.conf.descText,
			listElements: smRail.conf.links
		};

		// Dodaj moduł do prawego panelu
		moduleWrapper.innerHTML = Mustache.render(
			wrapperTemplate,
			wrapperData
		);
		stickyRail.appendChild( moduleWrapper );
	};
	
	smRail.init = function() {
		// Załaduj zależności
		importArticle( {
			type: 'style',
			article: 'MediaWiki:SocialMedia.css'
		}, {
			type: 'script',
			article: 'MediaWiki:RightRailHook.js'
		} );
		
		// Wczytaj konfigurację JSON
		smRail.getJsonConfig( function( conf ) {
			// Wyeksportuj konfigurację do globalnego obiektu
			smRail.conf = conf;

			// Uruchom hook
			mw.hook( 'custom.rightRail.loaded' ).add( function( rightRail ) {
				// Wyeksportuj stan panelu do globalnego obiektu
				smRail.rightRail = rightRail;

				// Wyrenderuj moduł
				smRail.renderModule();
			} );
		} );
	};

	// Uruchom skrypt
	smRail.init();
	
	// Wyeksportuj API skryptu
	window.smRailModule = smRail;
} );