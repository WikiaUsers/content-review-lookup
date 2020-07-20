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
 

 
// PurgeButton
PurgeButtonText = 'Odśwież';
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js", 			// AjaxRC
	"u:pl.tes:MediaWiki:ElderScrollsWiki.js",		// ToTop
	"u:pl.tes:MediaWiki:Change.js",				// Change
	"u:dev:UserTags/code.js",				// UserTag
	"u:dev:PurgeButton/code.js",				// PurgeButton
	"u:dev:WallGreetingButton/code.js",			// WallGreetingButton
	"u:dev:SearchSuggest/code.js",				// SearchSuggest
	"u:dev:Voice_Dictation/voice.js"			// VoiceDictation
   ]
});
// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
importArticles({
	type: "script",
	articles: [
	"u:dev:SearchSuggest/code.js"
	]
});
// Import (Quiz)
importArticles({
	type: "script",
	articles: [
	"MediaWiki:Quiz.js"
	]
});
// Propozycje przy wyszukiwaniu
importArticles({
	type: "script",
	articles: [
	"u:dev:SearchSuggest/code.js"
	]
});

function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:left;"><a href="http://ztm-warszawa.wikia.com/wiki/Project:Strona główna">Powrót na stronę główną</a></li>')
};
addOnloadHook(ToTop);

// Blokada starych blogów i wątków
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 30 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum" 
};
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Nikt nie skomentował tego blogu od ponad 30 dni. Nowy komentarz zostałby i tak prawdopodobnie uznany za odkopywanie starych dyskusji, więc możliwość komentowania została automatycznie wyłączona. Jeśli jesteś autorem bloga i chcesz, aby komentowanie zawsze było możliwe, dodaj kategorię „Blogi zawsze aktualne”.",
    nonexpiryCategory: "Blogi zawsze aktualne"
};

$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
// Profil użytkownika
$(function() {
    // Przeniesienie paska wyszukiwania na wysokość nicku
    $('#UserProfileMastheadSearch').appendTo('.masthead-info hgroup h1');
 
    // Przeniesienie przycisku edycji na bardziej logiczne miejsce
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});
// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA
 
if (typeof (mwCustomEditButtons) != 'undefined') {
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
		"speedTip": "Wyrównaj tekst do lewej",
		"tagOpen": "<left>",
		"tagClose": "</left>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
		"speedTip": "Wyrównaj tekst do prawej",
		"tagOpen": "<right>",
		"tagClose": "</right>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
		"speedTip": "Wyśrodkuj tekst",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
		"speedTip": "Wyjustuj tekst",
		"tagOpen": "<p align=justify>",
		"tagClose": "</p>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/89/Button_bigger.png",
		"speedTip": "Powiększ czcionkę",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Powiększony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0d/Button_smaller.png",
		"speedTip": "Pomniejsz czcionkę",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Pomniejszony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png",
		"speedTip": "Przekreśl tekst",
		"tagOpen": "<strike>",
		"tagClose": "</" + "strike>",
		"sampleText": "Skreślony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
		"speedTip": "Podkreśl tekst",
		"tagOpen": "<u>",
		"tagClose": "</" + "u>",
		"sampleText": "Podkreślony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": "Indeks górny"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": "Indeks dolny"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Treść komentarza"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
		"speedTip": "Dodaj kod",
		"tagOpen": "<code><nowiki>",
		"tagClose": "</" + "nowiki></code>",
		"sampleText": "Zakodowany tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
		"speedTip": "Wstaw szablon",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "Nazwa szablonu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
		"speedTip": "Wstaw szaro-zieloną tabelę",
		"tagOpen": '{| {' + '{Tabelka|alineacion=col1izq col2cen col3der|}}\n|-\n',
		"tagClose": "\n|}",
		"sampleText": "!| Nagłówek 1\n!| Nagłówek 2\n!| Nagłówek 3\n|-\n|| komórka 1, kolumna 1\n|| komórka 1, kolumna 2\n|| komórka 1, kolumna 3\n|-\n|| komórka 2, kolumna 1\n|| komórka 2, kolumna 2\n|| komórka 2, kolumna 3"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
		"speedTip": "Zalinkuj użytkownika",
		"tagOpen": "[[Użytkownik:",
		"tagClose": "|Nick_użytkownika]]",
		"sampleText": "Nick_użytkownika"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
		"speedTip": "Dodaj szablon ujednoznaczniający",
		"tagOpen": "{{Strona ujednoznaczniająca",
		"tagClose": "}}",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
		"speedTip": "Zgłoś usunięcie tego artykułu",
		"tagOpen": "{{EK",
		"tagClose": "}}",
		"sampleText": ""
	};
 
	
        mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię zdjęć",
		"tagOpen": "\n<gallery spacing=small columns=3 position=center widths=206 orientation=landscape captionalign=center>\n",
		"tagClose": "\n</gallery>",
		"sampleText": "Plik:Przykład.jpg|Podpis1\nPlik:Przykład.jpg|Podpis2\nPlik:Przykład.jpg|Podpis3\n<!-- Możesz zmienić sposób przycinania grafik zmieniając orientation=landscape na orientation=square, orientation=portrait lub na orientation=none. -->"
	};
 
}
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
var options = {
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{LicencjaZTM}}': 'Plik ze strony ZTM Warszawa',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js"
   ]
});
 
function FixNs() {
    $('.ns-4 #WikiaPageHeader > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader').append('<h2>Strona ZTM Warszawa Wiki</h2>');
};
addOnloadHook(FixNs);