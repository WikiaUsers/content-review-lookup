/* Auto-odświeżanie */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-odświeżanie';
window.AjaxRCRefreshHoverText = 'Automatycznie odświeża stronę';

// Dodatkowe przyciski w edytorze źródłowym by Wedkarski
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
		"tagOpen": "{{Ujednoznacznienie",
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
	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/5/57/CIT_Button.png",
        "speedTip": "Canon-In-Training",
        "tagOpen": "{{CIT|",
        "tagClose": "}}",
        "sampleText": "Wstaw tekst"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/2f/TS_Button.png",
        "speedTip": "Znacznik czasu",
        "tagOpen": "{{TS|",
        "tagClose": "|Data|Godzina|Strefa czasowa}}",
        "sampleText": "Lokacja"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/d/dc/Image_Button.png",
        "speedTip": "Wstaw szablon „Filebox”",
        "tagOpen": "\{\{Filebox\r| opis = ",
        "tagClose": "\r| sezon = \r| odcinek = \r| źródło = \r| pochodzenie = \r| licencja = \r\}\}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/c/ce/Ep_ref_Button.png",
        "speedTip": "Przypis",
        "tagOpen": "<ref name=>{{przypis|",
        "tagClose": "}}</ref>",
        "sampleText": "numer"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/24/AG_Button.png",
        "speedTip": "Przypis „Zapytaj Grega”",
        "tagOpen": "<ref name=id>{{askgreg|id pytania|2019-",
        "tagClose": "}}</ref>",
        "sampleText": "MIESIĄC-DZIEŃ"
    }
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/2d/Tweet_Button.png",
        "speedTip": "Przypis z Twittera",
        "tagOpen": "<ref>{{tweet|postujący|nazwa użytkownika|url id|2019-",
        "tagClose": "}}</ref>",
        "sampleText": "MIESIĄC-DZIEŃ"
    }
}
 
// Rozwijane opisy zmian
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});