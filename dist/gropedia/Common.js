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

/* Komunikat */
/*
var WikiaNotificationMessage = 'Elder Scrolls Wiki szuka administratorów!<br />Chciałbyś wspomóc encyklopedię o grach The Elder Scrolls? Kliknij <a href="/wiki/Wątek:21443">tutaj</a>, aby się zapoznać z zasadami rekrutacji.';
var expiry = 10;
*/

// UserTag
window.UserTagsJS = {
	modules: {
		inactive: 60,
		mwGroups: ['bot', 'bureaucrat', 'chatmoderator', 'founder', 'moderator', 'rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};

importArticles({
    type: "script",
    articles: [
	"MW:Module.js",			// Module
	"u:pl.tes:MediaWiki:APIQuery.js",		// APIQuery
	"u:pl.tes:MediaWiki:Wiki.js",			// Wiki
	"u:pl.tes:MediaWiki:Change.js",			// Change
	"u:pl.tes:MediaWiki:Summaries.js",		// Summaries
	"u:pl.tes:MediaWiki:Preload.js",		// Preload
	"u:pl.tes:MediaWiki:Preload2.js",		// Preload
	"u:pl.tes:MediaWiki:Disablecomments.js",	// Disablecomments
	"u:pl.tes:MediaWiki:DupImageList.js",		// DupImageList		ns-4
	"u:pl.tes:MediaWiki:Licenses.js",		// Licencje plików
	"u:pl.tes:MediaWiki:AjaxRC.js",			// AjaxRC
	"u:pl.tes:MediaWiki:LockOldBlogs.js",		// LockOldBlogs
	"u:pl.tes:MediaWiki:UserTags.js",		// UserTag
	"u:pl.tes:MediaWiki:SearchSuggest.js",		// SearchSuggest
	"u:pl.tes:MediaWiki:RevealAnonIP.js",		// RevealAnonIP
	"u:pl.tes:MediaWiki:CategorySorter.js",		// CategorySorter
	"u:pl.tes:MediaWiki:AutoEditDropdown.js",	// AutoEditDropdown
	"u:pl.tes:MediaWiki:VisualSpellCheck.js",	// VisualSpellCheck
	"u:dev:WallGreetingButton/code.js",		// WallGreetingButton	ns-1200
	"u:dev:MassNullEdit/code.js",
	'u:dev:FindAndReplace/code.js',
	"u:dev:AjaxDiff/code.js",
	"u:dev:LuaError/code.js"
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

// Dodanie linków do infoboxów
if(wgNamespaceNumber == 0 && $('.IESW').length) {
	$('#WikiaPageHeader .wikia-menu-button').after('<a href="/wiki/Infobox:'+encodeURIComponent(wgPageName)+'?action=formedit" class="wikia-button comments" style="margin: 2px 0 0 10px;"><img alt="" class="sprite categorization" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22">Edytuj infobox</a>');
}


//===============================================================================
// Nawigacja
//===============================================================================
// Dod. linków na karcie "Na Wiki" w menu nawigacji
$(document).ready(function () {
	$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:Regulamin">Regulamin</a></li>');
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
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
		"speedTip": "Wyrównaj tekst do lewej",
		"tagOpen": "<left>",
		"tagClose": "</left>",
		"sampleText": ""};
 
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
		"speedTip": "Wyśrodkuj tekst",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
		"speedTip": "Wyrównaj tekst do prawej",
		"tagOpen": "<right>",
		"tagClose": "</right>",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
		"speedTip": "Wyjustuj tekst",
		"tagOpen": "<p align=justify>",
		"tagClose": "</p>",
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
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
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
// <nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię obrazów",
		"tagOpen": "<gallery widths=\"200\" orientation=\"landscape\" spacing=\"small\" captionalign=\"center\">\n",
		"tagClose": "\n</gallery>",
		"sampleText": "Przykład.jpg|Podpis1\nPrzykład.jpg|Podpis2"};
// </nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
		"speedTip": "Dodaj kategorię",
		"tagOpen": "[[Kategoria:",
		"tagClose": "|{" + "{PAGENAME}}]]",
		"sampleText": "Nazwa kategorii"};
 
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