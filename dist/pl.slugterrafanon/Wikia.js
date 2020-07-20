/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/

// KONFIGURACJA SKRYPTÓW
// Konfigurację umieszczamy zgodnie z kolejnością importu.

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';

// Licencje
var LicenseOptions = {
		'{{Brak_licencji}}': 'Nie znam licencji',
		'{{CC-BY-SA}}': 'Plik na licencji Creative Commons BY-SA',
		'{{Copyright}}': 'Plik o zastrzeżonych pr. autorskich',
		'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
		'{{PD}}': 'Plik znajduje się w domenie publicznej',
};

// UserTags
window.UserTagsJS = {
	tags: {
		usermonth:	{ u:'Użyt. miesiąca', title: 'Użytkownik miesiąca' }
	},
	modules: {
		inactive: 30,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};

// PurgeButton
PurgeButtonText = 'Odśwież';
importScriptPage('PurgeButton/code.js', 'dev');

// SocialIcons
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201, 2001];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "19px",
	wikiTwitterAccount: "default"
};
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js", 			// AjaxRC
	"u:pl.tes:MediaWiki:ElderScrollsWiki.js",		// ToTop
	"u:pl.tes:MediaWiki:APIQuery.js",                       // Licencje plików
	"u:pl.tes:MediaWiki:Licenses.js",                       // Licencje plików
	"u:pl.tes:MediaWiki:Change.js",				// Change
	"u:dev:UserTags/code.js",				// UserTag
	"u:dev:DupImageList/code.js",				// DupImageList
	"u:dev:SocialIcons/code.js",				// SocialIcons
	"u:dev:PurgeButton/code.js",				// PurgeButton
	"u:dev:WallGreetingButton/code.js",			// WallGreetingButton
	"u:dev:SearchSuggest/code.js",				// SearchSuggest
	"u:dev:RevealAnonIP/code.js"				// RevealAnonIP
   ]
});

// POMNIEJSZE MODYFIKACJE
// Umieszczamy na własną odpowiedzialność.

// Profil użytkownika
$(function() {
    // Przeniesienie paska wyszukiwania na wysokość nicku
    $('#UserProfileMastheadSearch').appendTo('.masthead-info hgroup h1');
 
    // Przeniesienie przycisku edycji na bardziej logiczne miejsce
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

// Nawigacja

    // Dodatkowe linki w zakładce "Na Wiki"
$(document).ready(function() {
 $('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:Zasady">Regulamin</a></li>');
});

/*</pre>*/