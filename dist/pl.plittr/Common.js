/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
 
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

// Licencje plików
var LicenseOptions = {
    '{{Brak_licencji}}': 'Nie znam licencji',
        '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
        '{{CC-BY-SA}}': 'Pliki na licencji Creative Commons',
        '{{Copyright}}': 'Zastrzeżone prawa autorskie',
        '{{PD}}': 'Plik znajduje się w domenie publicznej',
        '{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};

// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
//    'MediaWiki:Common.js/BlokForum.js', / wyłączone
        'u:dev:InactiveUsers/code.js',
        'u:dev:SearchSuggest/code.js',
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js",
        'u:dev:LockOldBlogs/code.js',
	    'u:pl.tes:MediaWiki:AjaxRC.js',
	    'u:dev:WallGreetingButton/code.js',
	    'u:dev:ReferencePopups/code.js',
    ]
});

// KRESKAKRESKAKRESKAKRESKAKRESKAKRESKA

//Username
$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});
//Podebrane z pl.ztmwaw
//Dodatkowe w źródłowym
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
 
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/dark-brightness/images/b/b3/Info.png/revision/latest?cb=20150406134253&path-prefix=pl",
		"speedTip": "Wstaw infobox",
		"tagOpen": "{{Infobox",
		"tagClose": "}}",
		"sampleText": "|Tytuł = tytuł infoboxu|Obraz = obrazek|szerokość obrazka = 0px|podpis obrazka = podpis|Tytuł1 = tytuł jeden|Zawartość1 = zawartość1|Tytuł2 = tytuł dwa|Zawartość2 = zawartość2|Tytuł3 = tytuł trzy|Zawartość3 = zawartość3|Tytuł4 = tytuł cztery|Zawartość4 = zawartość4|Tytuł5 = tytuł pięć|Zawartość5 = zawartość5|i tak aż do 10"
	};
 
 
}
//Purge
PurgeButtonText = 'Odśwież';

/* Blokada starych wątków i blogasów */
// window.LockForums = {
//    expiryDays: 30,
//    expiryMessage: "Postowanie pod tym wątkiem zostało wyłączone ponieważ nikt nie napisał tu nic od 30 dni. Jeśli chcesz się wypowiedzieć - załóż nowy wątek.",
//    forumName: "Forum"
// };
// Wyłączone

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Odkopy starych blogów są czymś czego nie chcemy dlatego blokujemy komentowanie ich po 30 dniach.",
    nonexpiryCategory: "Blogi zawsze aktualne"
};

/* InactiveUsers tekst */
InactiveUsers = { 
    text: 'Martwy/a'
};

/***Licencje***/
function emptyLicenseAlert(form) {
    var msg = "<font style='color:red;text-shadow:0 0 5px red'>Licencja pliku nie została wybrana.</font>";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}