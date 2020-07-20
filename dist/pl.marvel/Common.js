//===============================================================================
//			Common.js Marvel Universe Wiki
//===============================================================================
// Umieszczony tutaj kod JavaScript zostanie załadowany
// przez każdego użytkownika, podczas każdego ładowania strony.
//===============================================================================
// Zanim bezmyślnie skopiujesz, zapytaj się o zgodę lub użyj importu skryptu.
//===============================================================================
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
var LicenseOptions = {
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{Fairuse}}': 'Dozwolony użytek',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi ze zbiorów Wikimedia'
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
		nonuser: true
	}
};

importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:Change.js",		// Change
	"u:pl.tes:MediaWiki:Wiki.js",		// Wiki
	"u:pl.tes:MediaWiki:FixWantedFiles.js",	// FixWantedFiles
	"u:pl.tes:MediaWiki:DupImageList.js",	// DupImageList
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js",
	"u:pl.tes:MediaWiki:AjaxRC.js",		// AjaxRC
	"u:pl.tes:MediaWiki:LockOldBlogs.js",	// LockOldBlogs
	"u:pl.tes:MediaWiki:UserTags.js",	// UserTag
	"u:pl.tes:MediaWiki:RevealAnonIP.js",	// RevealAnonIP
//	"MediaWiki:Chatango.js"			// Chatango
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
// Przyciski dla edytora w trybie źródłowym
//===============================================================================
if (mwCustomEditButtons) {

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Button_h2p.png",
		"speedTip": "Nagłówek 2. poziomu",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Tekst nagłówka"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/1/15/Button_h3p.png",
		"speedTip": "Nagłówek 3. poziomu",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Tekst nagłówka"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Button_h4p.png",
		"speedTip": "Nagłówek 4. poziomu",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Tekst nagłówka"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png",
		"speedTip": "Lista numerowana",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png",
		"speedTip": "Lista punktowana",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
		"speedTip": "Wstaw nawias",
		"tagOpen": "„",
		"tagClose": "”",
		"sampleText": "Tekst"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Utwórz przekierowanie",
		"tagOpen": "#TAM [[",
		"tagClose": "]]",
		"sampleText": "Przekierowanie"};
//<nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię obrazów",
		"tagOpen": "<gallery widths=\"200\" orientation=\"landscape\" spacing=\"small\" captionalign=\"center\">\n",
		"tagClose": "\n</gallery>",
		"sampleText": "Przykład.jpg|Podpis1\nPrzykład.jpg|Podpis2"};
//</nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/00/Button_vandale.png",
		"speedTip": "Zgłoś stronę do usunięcia",
		"tagOpen": "{" + "{EK|",
		"tagClose": "}" + "}",
		"sampleText": "Powód usunięcia"};
}

/* Moduł Facebooka */
$(function() {
  $('#WikiaRail .loading').after('<div style="margin-bottom: 10px; max-height: 130px;"><iframe marginheight="0" marginwidth="0" src="https://www.facebook.com/connect/connect.php?id=AvengersPL&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="300" height="130" scrolling="no" /></div>');
});