// Konfiguracja skryptu odpowiedzialnego za formularz adopcji
window.adoptInternational = {
	unsupportedLanguages: ['en','es','de','fr','ru','it','nl','pt','pt-br','zh'],
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
	"{{bEnd}}",
	i18n: {
		activeAdminsError: 'Pamiętaj, że jeśli wiki posiada już aktywnych administratorów, w pierwszej kolejności należy skontaktować się z nimi, jeśli chcesz otrzymać uprawnienia administratora.',
		adminsActivityLabel: 'Liczba aktywnych administratorów w ciągu ostatnich 60 dni',
		adoptionButtonLabel: 'Adoptuj wiki',
		alreadyAdminError: 'Posiadasz już uprawnienia administratora na tej wiki, nie musisz jej adoptować, chyba że aplikujesz o uprawnienia biurokraty.',
		alreadyBureaucratError: 'Posiadasz już uprawnienia biurokraty na tej wiki, nie musisz jej adoptować.',
		automaticQueryError: 'Wiki nie odpowiedziała na automatyczne zapytanie. Konieczne będzie ręczne podanie wymaganych danych.',
		ccError: 'Nie można adoptować oficjalnych wiki Fandomu.',
		closeLabel: 'Anuluj',
		commentsLabel: 'Komentarz/powód adopcji',
		communityVoteLabel: 'Dyskusja społeczności',
		defaultStatus: 'Otwarta',
		invalidLanguageError: 'Aby adoptować wiki w innym języku, rozwiń proszę listę linków językowych i odwiedź odpowiednik Centrum Społeczności w interesującym cię języku.',
		invalidUrlError: 'Nie rozpoznano formatu podanego adresu URL.',
		linkLabel: 'Link',
		modalTitle: 'Prośba o adopcję',
		nameLabel: 'Nazwa wiki',
		noActivityError: 'Pamiętaj, że aby adoptować wiki, powinno się wnosić na niej wkład przez co najmniej tydzień przed złożeniem prośby o adopcję.',
		noCommentsError: 'Wprowadź uzasadnienie, dlaczego chcesz adoptować wiki i co czyni cię dobrym kandydatem do adopcji.',
		noEditsError: 'Aby adoptować wiki, musisz ją aktywnie edytować przez przynajmniej tydzień.',
		noNameError: 'Wprowadź nazwę wiki.',
		noUrlError: 'Wprowadź adres URL wiki.',
		permissionLabel: 'Rodzaj uprawnień',
		placeholderComments: 'Komentarze na temat adopcji. Powiedz nam, dlaczego chcesz ją adoptować i dlaczego uważasz, że stanowisz dobrą kandydaturę na administratora.',
		placeholderDiscussionsPost: 'Identyfikator postu',
		placeholderUrl: 'https://wiki.fandom.com/pl',
		processFailError: 'Podczas przetwarzania twojego zgłoszenia wystąpił problem.',
		provideCommunityVote: 'Wygląda na to, że wiki ma przynajmniej kilkoro innych aktywnych użytkowników. Rozważ utworzenie wpisu w Dyskusjach, w którym opiszesz swój zamiar adoptowania wiki i pozwolisz innym wyrazić ich opinię na ten temat. Jeśli już taki istnieje, podaj proszę link do niego.',
		submitError: 'Nie udało się przesłać twojego zgłoszenia',
		submitLabel: 'Prześlij',
		userActivityLabel: 'Liczba dni spośród ostatnich 10, w których edytowałeś(aś) wiki'
	}
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