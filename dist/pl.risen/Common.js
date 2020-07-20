// <pre>

// Licencje
var LicenseOptions = {
	'{{Nieznana}}': 'Nie znam licencji',
	'{{Screenshot}}': 'Screenshot z gry',
	'{{Screenshot-wikia}}': 'Screenshot strony wiki',
	'{{Logo}}': 'Logo gry lub firmy',
	'{{CC-BY-SA}}': 'Creative Commons 3.0',
	'{{Fair-use}}': 'Plik ma dozwolone użycie',
	'{{PD}}': 'Plik należy do domeny publicznej',
	'{{Wikimedia}}': 'Plik pochodzi z Wikipedii'
};

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];

importArticles({
    type: 'script',
    articles: [
        "u:dev:ExtendedNavigation/code.js",              // Nawigacja
        "u:dev:AjaxRC/code.js",                          // Auto-odświeżanie
        "u:dev:RevealAnonIP/code.js",                    // Adresy IP dla anonów
	"u:pl.tes:MediaWiki:APIQuery.js",                // Licencje
	"u:pl.tes:MediaWiki:Licenses.js",                // Licencje
        "u:pl.tes:MediaWiki:Change.js",                  // Change
        'u:dev:SearchSuggest/code.js',                   // Sugestie wyszukiwania
	"u:dev:DupImageList/code.js",                    // Zdublowane pliki
        "MediaWiki:Quiz.js"				 // Quiz
    ]
});

// </pre>