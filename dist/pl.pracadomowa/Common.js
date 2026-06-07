/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// Licencje
importArticles({
    type: 'script',
    article: 'u:pl.tes:MediaWiki:License.js'
});

function emptyLicenseAlert(form) {
	if ($('#wpLicense').val() === '') {
        if (window.emptyLicenseWarningDelivered) return true;
		alert('Licencja pliku nie została wybrana. Dodaj licencję by grafika nie naruszała praw autorskich.');
		window.emptyLicenseWarningDelivered = true;
		return false;
	}
	return true;
}

$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
//Autoodświeżanie
window.AjaxRCRefreshText = 'Auto-odświeżanie';
window.AjaxRCRefreshHoverText = 'Automatycznie odświeża stronę co 15 sekund';
window.ajaxRefresh = 15000;
window.ajaxPages = [
    'Specjalna:Ostatnie_Zmiany',
    'Specjalna:Aktywność_na_wiki/watchlist',
    'Specjalna:Aktywność_na_wiki'
];

//IP zamiast Użytkownik Wikii
window.RevealAnonIP = {
    permissions : ['user']
};