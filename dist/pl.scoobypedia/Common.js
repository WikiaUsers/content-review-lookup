importArticles({
    type: "script",
    articles: [
	"MediaWiki:Slider.js",
   ]
});
 
importArticles({
    type: "script",
    articles: [
        "w:c:pl.elderscrolls:MediaWiki:Gadget-searchopt.js"
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:PortableCSSPad/code.js'
    ]
});
 
importScriptPage('ShowHide/code.js', 'dev');
 
importScript('MediaWiki:Common.js/displayTimer.js');
 
importScriptPage('BackToTopArrow/code.js', 'dev');
 
importScriptPage('InactiveUsers/code.js', 'dev');
 
InactiveUsers = { text: 'nieaktywny' };
 
importScriptPage( 'SkinSwitchButton/code.js', 'dev' );
 
importScriptPage('AjaxRC/code.js', 'dev');
 
// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
// AjaxRC
ajaxPages = ["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';
 
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