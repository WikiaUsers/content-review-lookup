// Importy
importArticles({
    type: 'script',
    articles: [
	"MW:CategoryGalleryHeader.js",		// Dodatkowy nagłówek w galeriach kategorii
	"u:dev:AjaxRC/code.js",			// Auto-odświeżanie
	"u:dev:ExtendedNavigation/code.js",	// Nawigacja
	"u:dev:RevealAnonIP/code.js",		// Adresy IP dla niezarejestrowanych
	"u:dev:Voice_Dictation/voice.js"	// Wyszukiwanie głosowe
    ]
});

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];