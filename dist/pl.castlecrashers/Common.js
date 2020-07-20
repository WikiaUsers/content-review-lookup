importArticles({
    type: "script",
    articles: [
	    'u:pl.castlecrasherspl:MediaWiki:License.js', // ADDLICENSE by Vuh
	    // 'u:pl.castlecrasherspl:MediaWiki:ReportErrors.js' // REPORTERRORS by Szynka013
    ]
});

// RANGI UŻYTKOWNIKÓW
$(function() {
  var rights = {};
 
  rights["Benios912 "]                 = ["Rycerz", "Biurokrata"];
  rights["Szynka013"]                  = ["Rycerz", "Techniczny"];
  rights["Szynka.bot"]                 = ["B.O.T."];
 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// NIEAKTYWNY UŻYTKOWNIK
window.InactiveUsers = { text: 'nieobecny' };
 
// AJAXRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';

// PRZYCISK DO POWROTU NA GÓRĘ STRONY
$(function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});
 
// PRZENOSI INTERWIKI DO STOPKI NA SPECJALNA:FORUM
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
 
// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};
 
// OSTRZEŻENIE O BRAKU LICENCJI
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
 
// LICENCJE by Vuh
var options = {
	'{{Brak licencji}}': 'Grafika bez licencji',
	'{{CC-BY-SA}}': 'Grafika CC-BY-SA',
	'{{Copyright}}': 'Grafika Copyrighy',
	'{{Fairuse}}': 'Grafika Fairuse',
	'{{PD}}': 'Grafika domeny publicznej',
	'{{Wikimedia}}': 'Grafika Wikimedii',
};

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA
if (typeof (mwCustomEditButtons) != 'undefined') {
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/1c/Button_advanced_image.png",
		"speedTip": "Wstaw oznaczenie galerii",
		"tagOpen": "{{Galeria tekst|",
		"tagClose": "}}",
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
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Treść komentarza"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
		"speedTip": "Wstaw link do użytkownika",
		"tagOpen": "[[Użytkownik:",
		"tagClose": "|Nick_użytkownika]]",
		"sampleText": "Nick_użytkownika"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
		"speedTip": "Wstaw kategorię",
		"tagOpen": "[[Kategoria:",
		"tagClose": "|{" + "{PAGENAME}}]]",
		"sampleText": "Nazwa kategorii"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/60/Button_support.png",
		"speedTip": "Oddaj głos za",
		"tagOpen": "{{Zgadzam się|",
		"tagClose": "}}",
		"sampleText": "Treść powodu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fc/Button_supp.png",
		"speedTip": "Oddaj głos przeciw",
		"tagOpen": "{{Nie zgadzam się|",
		"tagClose": "}}",
		"sampleText": "Treść powodu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/4e/Button_neutre.png",
		"speedTip": "Oddaj głos obojętny",
		"tagOpen": "{{Obojętny|",
		"tagClose": "}}",
		"sampleText": "Treść powodu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
		"speedTip": "Wstaw przekierowanie",
		"tagOpen": "#PATRZ [[",
		"tagClose": "]]",
		"sampleText": "Nazwa artykułu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
		"speedTip": "Wstaw szablon",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "Nazwa szablonu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
		"speedTip": "Oznacz źródło znajdujące się w Wikipedii",
		"tagOpen": "{{Wikipedia",
		"tagClose": "}}",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/bf/Button_easy_cite_pl.png",
		"speedTip": "Wstaw cytat",
		"tagOpen": "{{Cytat|",
		"tagClose": "}}",
		"sampleText": "Treść cytatu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2e/Button_broom.png",
		"speedTip": "Oznacz zalążek artykułu",
		"tagOpen": "{{Stub",
		"tagClose": "}}",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
		"speedTip": "Wstaw szablon ujednoznaczniający",
		"tagOpen": "{{Inne znaczenia",
		"tagClose": "}}",
		"sampleText": ""
	};
}

/* EDITBUTTONS by Szynka013
var ExMenu = $('.WikiaPageHeader ul.WikiaMenuElement'),
    ExMenu_Links = '<li><a href="?veaction=edit"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-desktop "></span> VisualEditor</a></li>' +
    '<li><a href="?action=delete"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-trash-o "></span> Usuń</a></li>' +
'<li><a href="/wiki/Special:MovePage/' + wgPageName +'"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-reply "></span> Zmień nazwę</a></li>' +
'<li><a href="?action=protect"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-lock "></span> Zabezpiecz</a></li>' +
'<li><a href="?action=history"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-book "></span> Historia</a></li>' +
'<li><a href="/wiki/Special:WhatLinksHere/' + wgPageName +'"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-link "></span> Linkujące</a></li>' +
'<li><a href="?action=purge"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-clock-o "></span> Odśwież</a></li>' +
'<li><a href="?action=raw&ctype=text/javascript"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-code "></span> Surowa wersja</a></li>';
 
if (wgUserGroups != 'null') {
ExMenu.html(ExMenu_Links);
} */
 
// OSTRZEŻENIE by MaciekP42 modifications by Szynka013
function setWikiCookie( cookie_name, data ) {
	var domain = wgServer.split("//")[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
}
function getWikiCookie( cookie_name, pos ) {
	var x, y, cookie_array = document.cookie.split(";");
	for (var i=0; i < cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
			var style_objects = y.split(", ");
			return unescape(style_objects[pos]);
		}
	}
}
var wikiCodeWarn = getWikiCookie('wikiCodeWarnCookie', 0);

$(function(){
    if (wikiCodeWarn != 1) {
        if (wgNamespaceNumber == 8) {
	    var $userWelcomeBox = $.showCustomModal("Uwaga!", '<p>Uważaj! Przeglądasz stronę z kodem odpowiedzialnym za wygląd i działanie Castle Crashers Wiki. Jeśli chcesz użyczyć go na swojej stronie, zapytaj administrację! Kopiując kod bez pozwolenia możesz mieć problemy w przyszłości!</p>', {
            id: "userWelcomeBox",
            width: 600,
            buttons: [
            {
                id: "submit-not-show",
                defaultButton: false,
                message: "Anuluj",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                   window.location='https://castlecrashers.fandom.com/pl';
                }
            },
            {
                id: "submit",
                defaultButton: true,
                message: "Zapytam administratora",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                   window.location='https://castlecrashers.fandom.com/pl/wiki/Project:Administratorzy';
                }
            }
            ]
        });
	}
    }
});
 
function cancelWelcomeBox(){
    $('#userWelcomeBox').closeModal(); 
}
function setTheWikiCookies() {
    setWikiCookie('wikiCodeWarnCookie', wikiCodeWarn); 
}