//===============================================================================
// Nawigacja
//===============================================================================
// Dod. linków na karcie "Na Wiki" w menu nawigacji
$(document).ready(function() {
	$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Elder_Scrolls_Wiki:Regulamin">Regulamin</a></li>');
});

// Dodanie linków do infoboxów
$('#WikiaPageHeader .wikia-menu-button').after($('.popupformlink'));
$('.popupformlink button').addClass('wikia-button comments').css({
	'margin': '2px 0 0 10px'
});

// Usunięcie z galerii rozmiaru pliku
/*
$(".wikia-gallery-item .thumbimage").each(function (i, elem) {
	$(elem).attr('title', $(elem).attr('alt'));
});
$(".wikia-gallery-item .image").each(function (i, elem) {
	$(elem).attr('title', $(elem).attr('alt'));
});
*/

/* Komunikat */
/*
var WikiaNotificationMessage = 'Elder Scrolls Wiki szuka administratorów!<br />Chciałbyś wspomóc encyklopedię o grach The Elder Scrolls? Kliknij <a href="/wiki/Wątek:21443">tutaj</a>, aby się zapoznać z zasadami rekrutacji.';
var expiry = 10;

importArticles({
	type: "script",
	articles: [
		"MW:Twitter.js",
		"MW:SectionLoader.js",
		"MW:JQuerySliders.js",
		"MW:Namespaces.js",
		"MW:Slider.js",
		"MW:CharInsert.js",
		"MW:FixWantedFiles.js",
		"MW:Mainpage.js",
		"MW:InputUserInformation.js",
		"MW:Common.js/Load.js",
		"MW:Common.js/Code.js",
		"MW:SliderHorizontal.js",
		"u:dev:AjaxRename/code.js",
		"u:dev:WikiaNotification/code.js"
	]
});
*/
// Ostrzeżenie o braku licencji dla plików
/*
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() === '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true;
		return false;
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {
	return emptyLicenseAlert(this);
});
*/
// Mutli RecentChanges
/*
var MRC = function () {
    $('div#recentchages-esw').append($('.rcoptions'));
    $('div#recentchages-esw').append($('.rc-conntent'));
};
$(MRC);


// AjaxRC
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(MRC, gApp, gUtils, gHelper);
*/

// Skrypt dodaje na pasku narzędzi przycisk powrotu na górę strony.
$('.WikiaBarWrapper .tools')
	.append('<li style="border:none;float:right;padding:0 40px;"><a href="#top">Powrót do góry</a></li>');