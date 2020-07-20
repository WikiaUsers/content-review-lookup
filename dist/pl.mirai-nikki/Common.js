//Skrypty zewnętrzne 
importArticles({
    type: 'script',
    articles: [
	"u:dev:AjaxRC/code.js",				// Auto-odświeżanie
	"u:dev:RevealAnonIP/code.js",			// Adresy IP dla niezarejestrowanych
        "MediaWiki:Common.js/userTags.js",              // Plakietki
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