/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Alert o braku licencji dla plików
 
function emptyLicenseAlert(form) {
	var msg = "Nie dodałeś/-aś licencji do pliku. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane po 7 dniach od ich przesłania."
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

importScriptPage('AjaxRC/code.js', 'dev');

// AjaxRC
ajaxPages = ["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';

/* Wyskakujące przypisy */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});