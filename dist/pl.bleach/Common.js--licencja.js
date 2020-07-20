/* Skrypt autorstwa użytkownika Nanaki */
function emptyLicenseAlert(form) {
	var msg = "Nie wybrałeś licencji! Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});