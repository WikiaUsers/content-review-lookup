/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/

// KONFIGURACJA SKRYPTÓW
// Konfigurację umieszczamy zgodnie z kolejnością importu.

// Automatyczne odświeżanie (AjaxRC)
ajaxPages = [
    "Specjalna:Aktywność_na_wiki",
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:Rejestr",
    "Specjalna:Nowe_pliki",
    "Specjalna:Nowe_strony"
];

window.AjaxRCRefreshText = 'Auto-odświeżanie';
window.AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{Styczeń;Luty;Marzec;Kwiecień;Maj;Czerwiec;Lipiec;Sierpień;Wrzesień;Październik;Listopad;Grudzień}m %Y (UTC)';

// Ręczne odświeżanie (PurgeButton)
window.PurgeButtonText = 'Odśwież';

// Zmiana "użytkownik wiki" na dokładny numer IP (RevealAnonIP)
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
};
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:AjaxRC.js",         // Automatyczne odświeżanie (AjaxRC)
    ]
});

// POMNIEJSZE MODYFIKACJE
// Umieszczamy na własną odpowiedzialność.

// Profil użytkownika
$(function() {
    // Przeniesienie przycisku edycji na bardziej logiczne miejsce
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

function emptyLicenseAlert(form) {
    var msg = "Drogi użytkowniku! Przesyłanie plików bez licencji jest karalne! W dodatku taki plik najprawdopodobniej będzie usunięty. Proszę, dodaj kategorie."
    if(window.emptyLicenseWarningDelivered) return true;
    if($('#wpLicense').val() == '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}

$('#mw-upload-form').submit(function(e) {
    return emptyLicenseAlert(this);
});

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // plakietki
  rights["Piotr9999"]                   = ["Opiekun Wiki"],
  rights["Penelopa123"]                     = ["HeadAdmin"] ;
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
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