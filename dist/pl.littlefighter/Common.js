/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
importArticles({
	type: "script",
	articles: [
// Skrypty wewnętrzne

// Skrypty zewnętrzne
	"u:dev:LockOldBlogs/code.js",
	"u:dev:RevealAnonIP/code.js",
        "u:pl.tes:MediaWiki:AjaxRC.js"
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
// Ajax
ajaxPages = [ 
"Specjalna:Aktywność_na_wiki", 
"Specjalna:Ostatnie_zmiany", 
"Specjalna:Rejestr", 
"Specjalna:Nowe_pliki", 
"Specjalna:Nowe_strony" 
];

// Stare blogi
window.LockOldBlogs = {
	expiryDays: 90,
	expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
	nonexpiryCategory: "Niearchiwizowane blogi"
};
 
 
// Zmiana "użytkownik wiki" na dokładny numer IP
// wersja dla adminów i biurokratów
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};