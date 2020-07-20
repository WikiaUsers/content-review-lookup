// LICENCJE by Vuh
var options = {
	'{{Art}}': 'Grafika art',
	'{{Copyright}}': 'Grafika Copyrighy',
	'{{GFDL}}': 'Grafika GFDL',
	'{{PD}}': 'Grafika domeny publicznej',
	'{{Foto użytkownika}}': 'Grafika użytkownika',
	'{{Logo}}': 'Grafika innej wiki',
	'{{Screenshot}}': 'Grafika screenshot',
	'{{CopyrightedFreeUse}}': 'Grafika Copyright, wolne użycie',
};

// NIEAKTYWNY UŻYTKOWNIK
window.InactiveUsers = { text: 'nieobecny' };
 
// AJAXRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';

// IMPORT
importArticles({
    type: "script",
    articles: [
        'u:pl.ben10:MediaWiki:Quiz.js',
        'u:pl.ben10:MediaWiki:ReportErrors.js',
        'u:pl.cw-dc:MediaWiki:License.js'
    ]
});

// RANGI UŻYTKOWNIKÓW
function addMastheadTags() {
    var rights  = {},
        user    = "";

    rights["Szynka.bot"]    = ["B.O.T."];
 
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}
 
$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});
 
// PRZYCISK DO POWROTU NA GÓRĘ STRONY
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>')
};
addOnloadHook(ToTop);
 
// PRZENOSI INTERWIKI DO STOPKI NA SPECJALNA:FORUM
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
 
// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};
 
// OSTRZEŻENIE O BRAKU LICENCJI by Vuh
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
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_Nuvola_apps_ksirc.png",
		"speedTip": "Wstaw dialog",
		"tagOpen": "{{Dialog|",
		"tagClose": "}}",
		"sampleText": "Treść dialogu"
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

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20141227205417/vestroia/pl/images/6/6b/OS_button.png",
		"speedTip": "Wstaw oznaczenie oryginalnej serii",
		"tagOpen": "{{OS",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20141227205431/vestroia/pl/images/6/64/AF_button.png",
		"speedTip": "Wstaw oznaczenie Obcej Potęgi",
		"tagOpen": "{{AF",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20141227205443/vestroia/pl/images/5/5f/UA.png",
		"speedTip": "Wstaw oznaczenie Ultimate Alien",
		"tagOpen": "{{UA",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20141227205523/vestroia/pl/images/b/bd/OV_button.png",
		"speedTip": "Wstaw oznaczenie Omniverse",
		"tagOpen": "{{OV",
		"tagClose": "}}",
		"sampleText": ""
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/77/Button_Nuvola_apps_edu_phi.png",
		"speedTip": "Oznacz niepodpisaną wypowiedź",
		"tagOpen": "{{Niepodpisany|",
		"tagClose": "}}",
		"sampleText": "Autor"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6d/Button_exclamation_1.png",
		"speedTip": "Wstaw link do osobnego artykułu",
		"tagOpen": "{{Osobny artykuł|",
		"tagClose": "}}",
		"sampleText": "Nazwa artykułu"
	};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
		"speedTip": "Wstaw skrót klawiszowy",
		"tagOpen": "{{Klawisz|",
		"tagClose": "}}",
		"sampleText": "Nazwa klawisza"
	};
 
}

// EDITBUTTONS by Szynka013
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
}
 
/* OSTRZEŻENIE by MaciekP42 modifications by Szynka013
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
	    var $userWelcomeBox = $.showCustomModal("Uwaga!", '<p>Uważaj! Przeglądasz stronę z kodem odpowiedzialnym za wygląd i działanie Ben 10 Wiki. Jeśli chcesz użyczyć go na swojej stronie, zapytaj administrację! Kopiując kod bez pozwolenia możesz mieć problemy w przyszłości!</p>', {
            id: "userWelcomeBox",
            width: 600,
            buttons: [
            {
                id: "submit-not-show",
                defaultButton: false,
                message: "Anuluj",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                   window.location='http://pl.ben10.wikia.com';
                }
            },
            {
                id: "submit",
                defaultButton: true,
                message: "Zapytam administratora",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                   window.location='http://pl.ben10.wikia.com/wiki/Ben_10_Wiki:Administratorzy';
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
*/

// PODPISY ZAMIAST PERFISKÓW by Nanaki
function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Ben 10 Wiki</h2>');
    $('.ns-112 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-112 #WikiaPageHeader .header-title').append('<h2>Strona galerii</h2>');
};

// DODATKOW PRZYCISKI W NAWIGACJI by Szynka013
$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:Bitwy">Bitwy</a></li>');