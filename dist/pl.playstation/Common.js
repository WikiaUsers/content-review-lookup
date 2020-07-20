importArticles({
    type: 'script',
    articles: [
	"u:pl.acdc:MediaWiki:CategoryGalleryHeader.js",	// Dodatkowy nagłówek w galeriach kategorii
	"u:dev:AjaxRC/code.js",				// Auto-odświeżanie
	"u:dev:ExtendedNavigation/code.js",		// Nawigacja
	"u:dev:LockOldBlogs/code.js",			// Wyłączenie komentowania pod starymi blogami
	"u:dev:RevealAnonIP/code.js",			// Adresy IP dla niezarejestrowanych
	"u:dev:Voice_Dictation/voice.js"		// Wyszukiwanie głosowe
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

// Wyłączenie komentowania pod starymi blogami
window.LockOldBlogs = {
	expiryDays: 60,
	expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
	nonexpiryCategory: "Niearchiwizowane blogi"
};