importArticles({
	type: "script",
	articles: [
// Skrypty zewnętrzne
	"u:dev:RevealAnonIP/code.js",
        "u:dev:AjaxRC/code.js"
	]
});

function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
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
  
// Zmiana "użytkownik wiki" na dokładny numer IP
// wersja dla adminów i biurokratów
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};