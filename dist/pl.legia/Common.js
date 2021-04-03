/*================================================================================

                 Początek Common.js na Legia Warszawa Wiki

       Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. 

==================================================================================

1. Import skryptów
2. Zmiana "użytkownik wiki" na adres IP
3. Alert o braku licencji

===============================================================================*/

//===============================================================================
// IMPORT SKRYPTÓW
// W ostatnim skrypcie nie umieszczamy przecinka.

$(function(){
importArticles({
	type: "script",
	articles: [
	"MediaWiki:Common.js/sourceButtons.js",
        "MediaWiki:Common.js/userTags.js"
        ]
});

//===============================================================================
// Zmiana "użytkownik wiki" na dokładny numer IP
// wersja dla adminów i biurokratów

window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

//===============================================================================
// Alert o braku licencji dla plików

function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});