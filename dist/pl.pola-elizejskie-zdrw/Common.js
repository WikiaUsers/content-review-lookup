// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});