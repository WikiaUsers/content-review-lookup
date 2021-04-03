//Skrypty zewnętrzne 
/*
importArticles({
    type: 'script',
    articles: []
});
*/

// Komunikat o braku licencji
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Jeśli prześlesz plik bez niej, zostaniesz upomniany (w ostateczności zablokowany), a grafika zostanie usunięta";
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true;
		return false;
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});

// Zapobiegaj ukrywaniu istniejących plakietek
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// Wyłączenie komentowania pod starymi blogami
/*
window.LockOldBlogs = {
	expiryDays: 100,
	expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
	nonexpiryCategory: "Niearchiwizowane blogi"
};
*/