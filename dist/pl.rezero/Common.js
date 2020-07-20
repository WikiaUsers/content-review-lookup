// <source lang="javascript">
// <nowiki>
// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
	expandedAreaContribute: true,
	expandedAreaEdit: false
};
// RevealAnonIP
window.RevealAnonIP = {
	permissions: ['bureaucrat', 'sysop']
};
 
// Licencje
var LicenseOptions = {
	'{{Fairuse}}': 'Dozwolony użytek',
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi ze zbiorów Wikimedia'
};

importArticles({
	type: "script",
	articles: [
		"u:pl.tes:MediaWiki:Change.js",
		"u:pl.tes:MediaWiki:APIQuery.js",
		"u:pl.tes:MediaWiki:Summaries.js",
		"u:pl.tes:MediaWiki:Preload.js",
		"u:pl.tes:MediaWiki:Preload2.js",
		"u:pl.tes:MediaWiki:Wandalizm.js",
		"u:pl.tes:MediaWiki:Slider.js",
		"u:pl.tes:MediaWiki:Disablecomments.js",
		"u:pl.tes:MediaWiki:DupImageList.js",
		"u:pl.tes:MediaWiki:Licenses.js",
		"u:pl.tes:MediaWiki:AjaxRC.js",
		"u:pl.tes:MediaWiki:LockOldBlogs.js",
		"u:pl.tes:MediaWiki:UserTags.js",
		"u:pl.tes:MediaWiki:SearchSuggest.js",
		"u:pl.tes:MediaWiki:RevealAnonIP.js",
		"u:pl.tes:MediaWiki:CategorySorter.js",
		"u:pl.tes:MediaWiki:AutoEditDropdown.js",
		"u:pl.tes:MediaWiki:VisualSpellCheck.js",
		"u:pl.tes:MediaWiki:FindAndReplace.js",
		"u:dev:MassNullEdit/code.js",
		"u:dev:NullEditButton/code.js",
		"u:dev:OggPlayer.js",
		"u:dev:WallGreetingButton/code.js",
		"u:dev:AjaxDiff/code.js",
		"u:dev:LuaError/code.js",
		"u:dev:MultiUpload/code.js",
		"u:dev:FileUsageAuto-update/code.js",
		"u:dev:Tooltips.js",
		"u:halo:MediaWiki:Wikia.js/Slider.js"
	]
});

// Slider3 przycisk lewy i prawy
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});

// Ostrzeżenie o braku licencji dla plików
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

//===============================================================================
// Nawigacja
//===============================================================================
// Dod. linków na karcie "Na Wiki" w menu nawigacji
$(document).ready(function() {
	$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:Regulamin">Regulamin</a></li>');
});
//===============================================================================
// Przyciski dla edytora w trybie źródłowym
//===============================================================================
if(mwCustomEditButtons && wgNamespaceNumber != 10 && wgNamespaceNumber != 828) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/5/5c/Button_h2p.png",
		"speedTip": "Nagłówek 2. poziomu",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Tekst nagłówka"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/1/15/Button_h3p.png",
		"speedTip": "Nagłówek 3. poziomu",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Tekst nagłówka"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/1/1c/Button_h4p.png",
		"speedTip": "Nagłówek 4. poziomu",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Tekst nagłówka"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
		"speedTip": "Lista numerowana",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
		"speedTip": "Lista punktowana",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/0/05/Button_Anf%C3%BChrung.png",
		"speedTip": "Wstaw nawias",
		"tagOpen": "„",
		"tagClose": "”",
		"sampleText": "Tekst"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/elderscrolls/images/7/70/Button_disambig.png/revision/latest?cb=20160407152304&path-prefix=pl",
		"speedTip": "Utwórz ujednoznacznienie",
		"tagOpen": "{" + "{disambig}" + "}\n* ",
		"tagClose": "",
		"sampleText": "Ujednoznacznienie"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Utwórz przekierowanie",
		"tagOpen": "#TAM [[:",
		"tagClose": "]]",
		"sampleText": "Przekierowanie"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię obrazów",
		"tagOpen": "<gallery>",
		"tagClose": "\n</gallery>",
		"sampleText": "\nPrzykład.jpg|Podpis1\nPrzykład.jpg|Podpis2"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/elderscrolls/images/8/8c/Button_RedX.png/revision/latest?cb=20160407151721&path-prefix=pl",
		"speedTip": "Zgłoś stronę do usunięcia",
		"tagOpen": "{" + "{EK|",
		"tagClose": "}" + "}",
		"sampleText": "Powód usunięcia"
	};
}
// </nowiki>
// </source>