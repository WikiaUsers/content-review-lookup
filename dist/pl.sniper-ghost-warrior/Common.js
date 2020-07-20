//Skrypty zewnętrzne 
importArticles({
    type: 'script',
    articles: [
	"u:pl.acdc:MediaWiki:CategoryGalleryHeader.js",	// Dodatkowy nagłówek w galeriach kategorii
	"u:dev:AjaxRC/code.js",				// Auto-odświeżanie
	"u:dev:ExtendedNavigation/code.js",		// Nawigacja
	"u:dev:LockOldBlogs/code.js",			// Wyłączenie komentowania pod starymi blogami
	"u:dev:RevealAnonIP/code.js",			// Adresy IP dla niezarejestrowanych
	"u:dev:Voice_Dictation/voice.js",               // Wyszukiwanie głosowe
        "MediaWiki:Common.js/userTags.js",              // Plakietki
        "MediaWiki:Wulgtreści.js"                       // Info o wulgarnych treściach       		
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

importScriptPage('AjaxRC/code.js', 'dev');
 
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Jeśli prześlesz plik bez niej, zostaniesz upomniany (w ostateczności zablokowany), a grafika zostanie usunięta"
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});

/*Rozwijane tabele*/

importScriptPage('ShowHide/code.js', 'dev');

// Wyłączenie komentowania pod starymi blogami
window.LockOldBlogs = {
	expiryDays: 100,
	expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
	nonexpiryCategory: "Niearchiwizowane blogi"
};