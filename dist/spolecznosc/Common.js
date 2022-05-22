// <nowiki>
// Konfiguracja skryptu odpowiedzialnego za formularz adopcji
window.adoptInternational = {
	unsupportedLanguages: ['en','es','de','fr','ru','it','nl','pt','pt-br','zh'],
	adoptionConfig: {
		activityDays: 7,
		adminsDays: 60,
		permissionTypes: [
			'bureaucrat',
			'sysop'
		]
	},
	pageConfig: {
		namespace: 'Adopcja',
		namespaceId: 114,
		adoptionsPage: 'Centrum_Społeczności:Adoptuj_wiki'
	},
	wikitextSchema: "{{bStart}}Prośba o adopcję\n" +
		"| 0-Status              = Otwarta\n" +
		"| 1-Użytkownik          = {{userName}}\n" +
		"| 2-URL Wiki            = {{{wikiURL}}}\n" +
		"| 3-Uprawnienia         = {{permissionsType}}\n" +
		"| 4-Dni edycje          = {{numDays}}\n" +
		"| 5-Dni administratorzy = {{numAdmins}}\n" +
		"| 6-Powód               = {{comments}}\n" +
		"| 7-URL Dyskusja        = {{{communityVote}}}\n" +
	"{{bEnd}}"
};

// Konfiguracja skryptu odpowiedzialnego za formularz linków językowych
window.interwikiInternational = {
	namespace: 'Linki_językowe',
	namespaceId: 116,
	mainPage: 'Centrum_Społeczności:Linki_językowe',
	interwikiSchema: '{{bStart}}InterwikiLink|{{from}}|{{to}}{{bEnd}}',
	pageSchema: '{{bStart}}Prośba o linki językowe{{bEnd}}\n' +
	'{{interwikis}}\n\n' +
	'~~' + '~~'
};

// Konfiguracja skryptu odpowiedzialnego za formularz flag bota
window.botFlagInternational = {
	pageConfig: {
		namespace: 'Flaga_bota',
		namespaceId: 118,
		requestsPage: 'Centrum_Społeczności:Oflagowanie_bota'
	},
	titleSchema: '$1 na $2',
	wikitextSchema: '{{bStart}}Prośba o flagę bota\n' +
		'| 0-Status          = Otwarta\n' +
		'| 1-Nazwa wiki      = {{wikiName}}\n' +
		'| 2-URL bota        = {{{botUrl}}}\n' +
		'| 3-Nazwa bota      = {{botName}}\n' +
		'| 4-Nazwa operatora = {{requesterName}}\n' +
		'| 5-URL Dyskusja    = {{{communityVote}}}\n' +
		'| 6-Powód           = {{comments}}\n' +
	'{{bEnd}}'
};

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