importArticles({
    type: 'script',
    articles: [
        "u:dev:ExtendedNavigation/code.js",                         // Nawigacja
        "u:dev:AjaxRC/code.js",                                     // Auto-odświeżanie
        "u:dev:RevealAnonIP/code.js",                               // Adresy IP dla anonów
        "u:pl.tes:MediaWiki:License.js",                            // Licencje
        "u:pl.gothic:MediaWiki:Common.js/listAdmins.js",            // Lista adminów
	"u:dev:DupImageList/code.js",                               // Zdublowane pliki
	"u:dev:WallGreetingButton/code.js",                         // Przycisk powitania
        "u:dev:InactiveUsers/code.js",                              // Plakietka nieaktywnego
        "u:dev:Voice_Dictation/voice.js",                           // Wyszukiwanie głosowe
        "u:pl.gothic:MediaWiki:Common.js/editSummaries.js"          // Opisy zmian
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
window.AjaxRCRefreshText = 'Auto-odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącz automatyczne odświeżanie strony';
 
// Licencje
var options = {
	'{{Brak_licencji}}': 'Nie wiem',
	'{{cc-by-2.0}}': 'Licencja Creative Commons Attribution 2.0',
	'{{cc-by-sa-3.0}}': 'Licencja Creative Commons Attribution-Share Alike 3.0 (CC BY 3.0)',
	'{{cc-by-3.0}}': 'Licencja Creative Commons Attribution 3.0 (CC BY-SA 3.0)',
	'{{GFDL}}': 'Licencja GNU Free Documentation License (GFDL)',
	'{{PD}}': 'Ta grafika należy do własności publicznej.',
	'{{PD-old}}': 'Grafika ta jest własnością publiczną, ponieważ prawa autorskie do niej wygasły.',
	'{{Screenshot-TV}}': 'Klatka z serialu lub logo stacji.',
	'{{Screenshot-Web}}': 'Zdjęcie strony internetowej. (screenshot)',
	'{{Screenshot-Game}}': 'Zdjęcie gry. (screenshot)',
	'{{SM}}': 'Klatka z filmu pełnometrażowego.',
	'{{Screenshot-Youtube}}': 'Klatka z filmu z Youtube',
	'{{fair-use1}}': 'Inne kwalifikujące jako "fair use" wg prawa USA (np. zdjęcie promocyjne, zdjęcie z IMDB)',
	'{{copyright-PL}}': 'Inne kwalifikujące się jako "dozwolone użycie" wg prawa polskiego',
};
 
// Nieaktywny user
InactiveUsers = { 
    months: 1,
    text: 'Nieaktywny'
};
 
// Alert o braku licencji dla plików
 
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
	if (window.emptyLicenseWarningDelivered) return true;
	if ($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function (e) {
	return emptyLicenseAlert(this);
});