//===============================================================================
// Warning for uploading files without license
//===============================================================================

function emptyLicenseAlert(form) {
	var msg = "License has not been selected. You can try again, but remember, files without license will be deleted."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});