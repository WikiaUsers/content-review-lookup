// AJAXRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';

window.InactiveUsers = { text: 'nieobecny' };

// PRZYCISK DO POWROTU NA GÓRĘ STRONY
$(function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});

// PRZENOSI INTERWIKI DO STOPKI NA SPECJALNA:FORUM
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
 
// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

// OSTRZEŻENIE O BRAKU LICENCJI
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
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});