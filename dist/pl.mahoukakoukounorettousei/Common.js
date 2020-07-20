// Konfiguracja dla AutoEditDropdown
var	AutoEditDropdownConfig = {
	expandedAreaContribute: true,
	expandedAreaEdit: false
};
 
// RevealAnonIP
window.RevealAnonIP = {permissions : ['bureaucrat','sysop']};
 
// Licencje
var LicenseOptions = {
	'{{Fairuse}}': 'Dozwolony użytek',
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi ze zbiorów Wikimedia'
};
 
// Moduły
function hasGroup(group) {
	for (var i in wgUserGroups) {
		if (wgUserGroups[i] == group) return true;
	}
	return false;
}
 
// UserTag
window.UserTagsJS = {
	tags: {
		usermonth:	{u:'Użyt. miesiąca', title: 'Użytkownik miesiąca'}
	},
	modules: {
		inactive: 60,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};
 
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:Change.js",			// Change
	"u:pl.tes:MediaWiki:Wiki.js",			// Change
	"u:pl.tes:MediaWiki:Summaries.js",		// Summaries
	"u:pl.tes:MediaWiki:Preload.js",		// Preload
	"u:pl.tes:MediaWiki:Preload2.js",		// Preload
	"u:pl.tes:MediaWiki:Wandalizm.js",		// CVU
	"u:pl.tes:MediaWiki:Module.js",			// Module
//	"u:pl.tes:MediaWiki:Chatango.js",		// Chat od Chatango.com
//	"u:pl.tes:MediaWiki:FixWantedFiles.js",		// FixWantedFiles
	"u:pl.tes:MediaWiki:DupImageList.js",		// DupImageList		ns-4
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js",
	"u:pl.tes:MediaWiki:AjaxRC.js",			// AjaxRC
	"u:pl.tes:MediaWiki:LockOldBlogs.js",		// LockOldBlogs
	"u:pl.tes:MediaWiki:UserTags.js",		// UserTag
	"u:pl.tes:MediaWiki:RevealAnonIP.js",		// RevealAnonIP
	"u:pl.tes:MediaWiki:CategorySorter.js",		// CategorySorter
	"u:pl.tes:MediaWiki:AutoEditDropdown.js",	// AutoEditDropdown
//	"u:pl.tes:MediaWiki:Slider.js",			// Nowy slider
	"u:pl.sao:MediaWiki:Slider.js",			// Nowy slider
	"u:dev:WallGreetingButton/code.js"		// WallGreetingButton	ns-1200
   ]
});
 
 
// Ostrzeżenie o braku licencji dla plików
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
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
 
// Usunięcie z galerii rozmiaru pliku
$(".wikia-gallery-item .thumbimage").each(function (i, elem) {
	$(elem).attr('title', $(elem).attr('alt'));
});
$(".wikia-gallery-item .image").each(function (i, elem) {
	$(elem).attr('title', $(elem).attr('alt'));
});
 
 
/****************************************/
// sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using(['jquery.ui.tabs'], function () {
	var $tabs = $("#portal_slider").tabs({
		fx: {
			opacity: 'toggle',
			duration: 100
		}
	});
	$("[class^=portal_sliderlink]").click(function () { // bind click event to link
		$tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
		return false;
	});
	$('#portal_next').click(function () {
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
		return false;
	});
	$('#portal_prev').click(function () {
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
		return false;
	});
});
 
/****************************************/
// Special CSS controller
// Author: Jens Ingels
// http://dev.wikia.com/wiki/SpCSS_workspace
/****************************************/
jQuery(function ($) {
	if (mw.config.get('wgCanonicalSpecialPageName') === 'CSS') {
		$(".css-editor").prepend("<span id='buttom-css' class='button'>Rozszerz na maksymalną szerokość</span>");
	};
	var countcss = 0;
	$("#buttom-css").click(function () {
		countcss += 1;
		if (countcss == 1) {
			$(this).text("Powróć do wartości domyślnych");
			$(".css-editor-wrapper").css("width", "100%");
			$(".css-side-bar").css("display", "none");
			$(".ace_gutter").css("display", "none");
			$(".ace_scroller").css("left", "0px");
		}
		if (countcss == 2) {
			$(this).text("100%");
			$(".css-editor-wrapper").css("width", "auto");
			$(".css-side-bar").css("display", "block");
			$(".ace_gutter").css("display", "block");
			$(".ace_scroller").css("left", "49px");
			countcss = 0
		}
	});
});
 
 
//===============================================================================
// Nawigacja
//===============================================================================
// Dod. linków na karcie "Na Wiki" w menu nawigacji
$(document).ready(function () {
	$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Mahouka_Koukou_no_Rettousei_Wiki:Regulamin">Regulamin</a></li>');
});
 
//===============================================================================
// Przyciski dla edytora w trybie źródłowym
//===============================================================================
if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/5/5c/Button_h2p.png",
		"speedTip": "Nagłówek 2. poziomu",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Tekst nagłówka"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/1/15/Button_h3p.png",
		"speedTip": "Nagłówek 3. poziomu",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Tekst nagłówka"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/1/1c/Button_h4p.png",
		"speedTip": "Nagłówek 4. poziomu",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Tekst nagłówka"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
		"speedTip": "Lista numerowana",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
		"speedTip": "Lista punktowana",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/0/05/Button_Anf%C3%BChrung.png",
		"speedTip": "Wstaw nawias",
		"tagOpen": "„",
		"tagClose": "”",
		"sampleText": "Tekst"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/70/Button_disambig.png",
		"speedTip": "Utwórz ujednoznacznienie",
		"tagOpen": "{" + "{disambig}" + "}\n* ",
		"tagClose": "",
		"sampleText": "Ujednoznacznienie"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Utwórz przekierowanie",
		"tagOpen": "#TAM [[:",
		"tagClose": "]]",
		"sampleText": "Przekierowanie"};
//<nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię obrazów",
		"tagOpen": "<gallery widths=\"200\" orientation=\"landscape\" spacing=\"small\" captionalign=\"center\">",
		"tagClose": "\n</gallery>",
		"sampleText": "\nPrzykład.jpg|Podpis1\nPrzykład.jpg|Podpis2"};
//</nowiki>
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png",
		"speedTip": "Zgłoś stronę do usunięcia",
		"tagOpen": "{" + "{EK|",
		"tagClose": "}" + "}",
		"sampleText": "Powód usunięcia"};
}