/* KONFIGURACJA AJAXRC */
window.AjaxRCRefreshText = 'Auto-odświeżanie';
window.AjaxRCRefreshHoverText = 'Automatycznie odświeżaj stronę';
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:AllPages',
    'Special:UncategorizedPages',
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:Aktywność_na_wiki",
    "Specjalna:Wszystkie_strony",
    "Specjalna:Nieskategoryzowane_strony"
];
 
/* WIDOCZNOŚĆ IP DLA ADMINISTRACJI */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'staff', 'helper']
};

/* KONFIGURACJA BACKTOTOPMODERN */
window.BackToTopModern = true;

/* IMPORT SKRYPTÓW Z INNYCH WIKI */
importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:APIQuery.js",
        "u:pl.tes:MediaWiki:Licenses.js"
    ]
});

/* KONFIGURACJA INACTIVEUSERS */
InactiveUsers = {
    text: 'nieobecny'
};

/* WIDOCZNOŚĆ IP DLA ADMINISTRACJI */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'staff', 'helper']
};

/* OSTRZEŻENIE O BRAKU LICENCJI by Vuh */
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
$('#mw-upload-form').submit(function(e) {
    return emptyLicenseAlert(this);
});
 
/* LICENCJE by Vuh */
var LicenseOptions = {
    '{{Brak licencji}}': 'Nie znam licencji',
    '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
    '{{CC-BY-SA}}': 'Plik używany zgodnie z zasadami Creative Commons BY-SA',
    '{{Copyright}}': 'Plik posiadający zastrzeżone prawa autorskie',
    '{{PD}}': 'Plik używany zgodnie z zasadami domeny publicznej',
    '{{Wikimedia}}': 'Plik używany zgodnie z zasadami projektów Fundacji Wikimedia',
};

/* DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA by Wedkarski */
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/8/85/Cudzyslow-icon.svg",
        "speedTip": "Wstaw polskie cudzysłowy",
        "tagOpen": "„",
        "tagClose": "”",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/d/d7/Ppauza.svg",
        "speedTip": "Wstaw półpauzę",
        "tagOpen": "–",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/8/8c/Apostrof.svg",
        "speedTip": "Wstaw apostrof",
        "tagOpen": "’",
        "tagClose": "",
        "sampleText": ""
    };
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0d/Button_smaller.png",
		"speedTip": "Pomniejsz czcionkę",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Pomniejszony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Treść komentarza"
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
		"tagOpen": "{{Inne znaczenie",
		"tagClose": "}}",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
		"speedTip": "Dodaj kategorię",
		"tagOpen": "[[Kategoria:",
		"tagClose": "|{" + "{PAGENAME}}]]",
		"sampleText": "Nazwa kategorii"
	};
}

/* ROZWIJANE OPISY ZMIAN */
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});


/* KONFIGURACJA CATEGORYREFRESH 

This is CSS and won't work on a JS page.

.article-categories {
    --cr-cat-color: rgba(13, 23, 31, .08);
    --cr-cat-text: rgba(255, 255, 255, .5);
    --cr-hover-color: rgba(5, 31, 55, .15);
    --cr-hover-text: #FFF;
    --cr-hiddencat-opacity: .6;
    --cr-button-opacity: .6;
}
*/