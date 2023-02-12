importArticles({
    type: "script",
    articles: [
        "u:dev:WallGreetingButton/code.js",
        "w:c:dev:DynamicImages/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:InactiveUsers/code.js",
        "u:halo:MediaWiki:Wikia.js/Slider.js",
        "u:pl.tes:MediaWiki:AjaxRC.js",
        "u:dev:ReferencePopups/code.js"

    ]
});
 
InactiveUsers = { text: 'nieaktywny' };

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';
 
// Skrypt dodaje na pasku narzędzi przycisk powrotu na górę strony.
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>')
};
addOnloadHook(ToTop);
 
// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
//===============================================================================
//   Ostrzeżenie o braku licencji dla plików
//===============================================================================
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
 
// Licencje
var LicenseOptions = {
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{Kadr}}': 'Plik będący zrzutem z ekranu (screenshotem)',
	'{{Art}}': 'Plik będący oficjalnym artem związanym z serią',
	'{{Foto użytkownika}}': 'Plik do użytku użytkownika',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik o dozwolonym użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii i Fundacji Wikimedia'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});
 
function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona Kraina lodu Wiki</h2>');
    $('.ns-112 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-112 #WikiaPageHeader .header-title').append('<h2>Strona galerii</h2>');
    $('.ns-114 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-114 #WikiaPageHeader .header-title').append('<h2>Strona fanonu Kraina lodu Wiki</h2>');
    $('.ns-118 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-118 #WikiaPageHeader .header-title').append('<h2>Strona relacji z bohaterami</h2>');
};
addOnloadHook(FixNs);