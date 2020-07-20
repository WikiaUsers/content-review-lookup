/*Rozwijane tabele*/
importScriptPage('ShowHide/code.js', 'dev');

/*Przypomnienie o licencji*/
function emptyLicenseAlert(form) {
	var msg = "Uwaga! Licencja pliku nie została wybrana. Pliki bez licencji są usuwane."
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