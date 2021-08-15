// Konfiguracja skryptu UserTags
window.UserTagsJS = {
	modules: {
		inactive: 60,
		mwGroups: [
			'sysop',
			'bot',
			'bot-global',
			'staff',
			'helper',
			'soap',
			'vanguard'
		],
		metafilter: {
			sysop: [
				'bureaucrat',
				'founder'
			],
			bureaucrat: [
				'founder'
			]
		}
	},
	tags: {
		bot: {
			link: 'Pomoc:Boty'
		},
		staff: {
			link: 'w:Project:Staff'
		},
		helper: {
			link: 'Pomoc:Helperzy'
		},
		soap: {
			link: 'Pomoc:SOAP'
		},
		vanguard: {
			link: 'Pomoc:Vanguard'
		},
		sysop: {
			link: 'Project:Administracja',
			order: 3
		}
	}
};

// Pomoc:Zawartość – klikalne boksy
;( function() {
	if ( mw.config.get( 'wgPageName' ) !== 'Pomoc:Zawartość' ) return;

	const boxes = document.getElementsByClassName( 'centralhelpbox' );

	Array.from( boxes ).forEach( function( box ) {
		box.addEventListener( 'click', function() {
			const link = box.getElementsByTagName( 'a' )[0].href;
			location.href = link;
		} );
	} );
} )();

/*
 * Funkcja eksportująca frontend rozszerzenia BannerNotifications
 *
 * Na UCP funkcja ta nie jest domyślnie eksportowana do JavaScriptu
 * w przestrzeni użytkowników – ten kod to zmienia dodając globalnie
 * konstruktor `BannerNotification()` aka window.BannerNotification
 *
 * Uruchamia hook `BannerNotification` gdy funkcja jest gotowa.
 *
 * @author Rail
 */
;( function() {
	'use strict';

	/**
	 * Nazwa modułu BannerNotifications jest hashowana.
	 *
	 * Z każdym odświeżeniem pamięci podręcznej ResourceLoadera
	 * hash ulega zmienie i import modułu przestaje działać.
	 */
	function getHashedModuleName() {
		return mw.loader.getModuleNames().find( function( module ) {
			return module.startsWith( 'BannerNotifications-' );
		} );
	}

	const moduleName = getHashedModuleName();

	// Załaduj moduł BannerNotifications, jeśli nie jest gotowy
	mw.loader.using( moduleName, function( require ) {
		// Wyeksportuj konstruktor `BannerNotification` do zmiennej
		const bannerFrontend = require( moduleName ).BannerNotification;

		// Dodaj obiekt globalny
		window.BannerNotification = bannerFrontend;

		// Uruchom hook
		mw.hook( 'BannerNotification' ).fire( bannerFrontend );
	} );
} )();