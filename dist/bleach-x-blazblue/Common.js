//===============================================================================
//
//			Common.js na GothicPedii
//
//===============================================================================
// Umieszczony tutaj kod JavaScript zostanie załadowany
// przez każdego użytkownika, podczas każdego ładowania strony.
//===============================================================================

//===============================================================================
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
//===============================================================================

importArticles({
    type: "script",
    articles: [
// Strony wewnętrzne
	"MediaWiki:Common.js/chatango.js",		/* Chatango i fejsbuk */
	"MediaWiki:Common.js/sliderVuh.js",		/* Nowy slider */
	"MediaWiki:Common.js/maphilight.min.js",	/* Podświetlenie map */
	"MediaWiki:Common.js/mapy.js",			/* dla Kartografów */
	"MediaWiki:Common.js/es.js",			/* Rozwijane opisy zmian */
	"MediaWiki:Common.js/userRightsIcons.js",	/* Opisy grup userów w profilu użytkownika + Info o nieaktywności */
	"MediaWiki:Common.js/dodajLicencję.js",		/* Łatwe dodawanie licencji do przesłanych obrazków */
	"MediaWiki:Common.js/showhide.js",		/* Zwijane tabele */
	"MediaWiki:Common.js/sourceButtons.js",		/* Dodatkowe przyciski w trybie źródła */
	"MediaWiki:Common.js/wandalizm.js",		/* System zgłaszania wandali - oryginał by RuneScape Wiki */
	"MediaWiki:Common.js/extraRollbacks.js",	/* Dodatkowe przyciski szybkiego cofania zmian - by Monchoman45 */ 
	"MediaWiki:Common.js/facebookRozwijany.js",	/* Rozwijany z prawej strony panel fejsbuka */
	"MediaWiki:Common.js/witamyModule.js",		/* Panel powitania z przydatnymi linkami */
// Strony zewnętrzne
	"u:pl.tes:MediaWiki:Gadget-searchopt.js",	/* Opcje wyszukiwania */
	"u:pl.tes:MediaWiki:Gadget-ajaxbatchdelete.js",	/* Usuwanie wielu plików jednocześnie */
	"u:dev:DupImageList/code.js",			/* Lista duplikatów obrazków */
	"u:dev:VisualSpellCheck/code.js",		/* Sprawdzanie pisowni w trybie wizualnym */
	"u:dev:SearchSuggest/code.js",			/* Sugestie do wyników wyszukiwania */
	"u:dev:WallGreetingButton/code.js",		/* Przycisk edytowania powitania na Tablicy */
	"u:dev:BackToTopButton/code.js",		/* Przycisk powrotu na górę strony */
        "u:dev:ListFiles/code.js"                       /* */
   ]
});

//===============================================================================
//   Zmiana "użytkownik wiki" na numer IP,
//===============================================================================

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

//===============================================================================
//   Sliders using jquery by Tierrie
//===============================================================================

//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
	var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
	$("[class^=portal_sliderlink]").click(function() { // bind click event to link
		$tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
		return false;
	});

	$('#portal_next').click(function() {
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
		return false;
	});

	$('#portal_prev').click(function() { // bind click event to link
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
		return false;
	});
});
});

//===============================================================================
//   Ostrzeżenie o braku wybrania licencji
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