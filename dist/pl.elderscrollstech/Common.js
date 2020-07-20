//===============================================================================
//			Common.js Elder Scrolls Tech Wiki
//===============================================================================
// Umieszczony tutaj kod JavaScript zostanie załadowany
// przez każdego użytkownika, podczas każdego ładowania strony.
//===============================================================================
// Zanim bezmyślnie skopiujesz, zapytaj się o zgodę lub użyj importu skryptu.
//===============================================================================

// InfoWidgets dla Strony głównej
$(document).ready(function () {
    if ($('#iw-widgets').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
            iwNewPages = Widgets.newPages();
            iwNewPages.selector = '#iw-newpages';
            Widgets.add(iwNewPages);
            iwRecentChanges = Widgets.recentChanges();
            iwRecentChanges.selector = '#iw-recentchanges';
            Widgets.add(iwRecentChanges);
            iwContribs = Widgets.contribs();
            iwContribs.selector = '#iw-contribs';
            Widgets.add(iwContribs);
        }
    }
});

// Konfiguracja dla AutoEditDropdown
var	AutoEditDropdownConfig = {
	expandedAreaContribute: true,
	expandedAreaEdit: false
};

// RevealAnonIP
window.RevealAnonIP = {
	permissions : ['bureaucrat','sysop']
};

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];

// Licencje
var options = {
	'{{Bethesda}}': 'Plik należy do Bethesda Softworks',
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{Fairuse}}': 'Dozwolony użytek',
	'{{GFDL}}': 'GNU Free Documentation License',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi z jednego z projektów Wikimedia'
};

// UserTag
window.UserTagsJS = {
	tags: {
		usermonth:	{ u:'Użyt. miesiąca', title: 'Użytkownik miesiąca' }
	},
	modules: {
		inactive: 30,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true,
		implode: {'trinity': ['bureaucrat', 'sysop']}
	}
};

importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:Change.js",		// Change
	"u:pl.tes:MediaWiki:ElderScrollsWiki.js",// ElderScrollsWiki
	"u:pl.tes:MediaWiki:Module.js",		// Nowy moduł
	"u:pl.tes:MediaWiki:Summaries.js",	// Summaries
	"u:pl.tes:MediaWiki:FixWantedFiles.js",	// FixWantedFiles	ns-1
	"u:pl.tes:MediaWiki:DupImageList.js",	// DupImageList		ns-4
	"u:pl.tes:MediaWiki:License.js",	// Licencje plików	ns-6
	"u:pl.tes:MediaWiki:AjaxRC.js",		// AjaxRC		ns-1
	"u:pl.tes:MediaWiki:LockOldBlogs.js",	// LockOldBlogs		ns-500
	"u:pl.tes:MediaWiki:UserTags.js",	// UserTag		ns-2
	"u:dev:WallGreetingButton/code.js",	// WallGreetingButton	ns-1200
	"u:dev:SearchSuggest/code.js",		// SearchSuggest	ns-1
	"u:dev:RevealAnonIP/code.js"		// RevealAnonIP
   ]
});

// Ostrzeżenie o braku licencji dla plików
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

// Usunięcie z galerii rozmiaru pliku
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});

//===============================================================================
// Nawigacja
//===============================================================================
// Dod. linków na karcie "Na Wiki" w menu nawigacji
$(document).ready(function() {
 $('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Elder_Scrolls_Wiki:Regulamin">Regulamin</a></li>');
});

//===============================================================================
// Przyciski dla edytora w trybie źródłowym
//===============================================================================
if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png",
		"speedTip": "Lista numerowana",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png",
		"speedTip": "Lista punktowana",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
		"speedTip": "Dodaj kategorię",
		"tagOpen": "[[Kategoria:",
		"tagClose": "|{" + "{PAGENAME}}]]",
		"sampleText": "Nazwa kategorii"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Utwórz przekierowanie",
		"tagOpen": "#TAM [[",
		"tagClose": "]]",
		"sampleText": "Przekierowanie"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "/skins/common/images/button_image.png",
		"speedTip": "Obraz lub inny plik osadzony na stronie",
		"tagOpen": "[[Plik" + ":",
		"tagClose": "|thumb|right]]",
		"sampleText": "Przykład.jpg"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię obrazów",
		"tagOpen": "<gallery widths=\"200\" orientation=\"landscape\" spacing=\"small\" captionalign=\"center\">\n",
		"tagClose": "\n</gallery>",
		"sampleText": "Przykład.jpg|Podpis1\nPrzykład.jpg|Podpis2"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5c/Button_h2p.png",
		"speedTip": "Nagłówek 2. poziomu",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Tekst nagłówka"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/15/Button_h3p.png",
		"speedTip": "Nagłówek 3. poziomu",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Tekst nagłówka"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/1c/Button_h4p.png",
		"speedTip": "Nagłówek 4. poziomu",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Tekst nagłówka"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
		"speedTip": "Wstaw nawias",
		"tagOpen": "„",
		"tagClose": "”",
		"sampleText": "Tekst"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Treść komentarza"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/00/Button_vandale.png",
		"speedTip": "Zgłoś stronę do usunięcia",
		"tagOpen": "{" + "{EK|",
		"tagClose": "}" + "}",
		"sampleText": "Powód usunięcia"};
}