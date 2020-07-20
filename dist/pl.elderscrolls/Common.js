// <source lang="javascript">
// <nowiki>
// PreloadTemplates
preloadTemplates_subpage = "wzorzec";

// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
	expandedAreaContribute: true,
	expandedAreaEdit: false
};
// RevealAnonIP
window.RevealAnonIP = {
	permissions: ['bureaucrat', 'sysop']
};

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
	for(var i in wgUserGroups)
		if(wgUserGroups[i] == group) return true;
	return false;
}
// UserTag
window.UserTagsJS = {
	tags: {
		usermonth: {
			u: 'Użyt. miesiąca',
			title: 'Użytkownik miesiąca'
		},
		trinity: {
			u: 'Trinity',
			title: 'Biurokrata Elder Scrolls Wiki'
		},
		dovahwiki: {
			u: 'Dovahkiin Wiki',
			title: 'Tytuł zdobyty w konkursie "Pięciu strażników Wiki"'
		},
		champwiki: {
			u: 'Czempion Wiki',
			title: 'Tytuł zdobyty w konkursie "Pięciu strażników Wiki"'
		},
		nervarwiki: {
			u: 'Nerevaryjczyk Wiki',
			title: 'Tytuł zdobyty w konkursie "Pięciu strażników Wiki"'
		},
		herowiki: {
			u: 'Bohater Wiki',
			title: 'Tytuł zdobyty w konkursie "Pięciu strażników Wiki"'
		},
		eterwiki: {
			u: 'Wieczny czempion Wiki',
			title: 'Tytuł zdobyty w konkursie "Pięciu strażników Wiki"'
		}
	},
	modules: {
		custom: {
			'Nekta': ['dovahwiki', 'nervarwiki'],
			'DarkInquision': ['champwiki'],
			'Pepek94': ['herowiki', 'eterwiki']
		},
		inactive: 60,
		mwGroups: ['bot', 'bureaucrat', 'chatmoderator', 'founder', 'moderator', 'rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true,
		implode: {
			'trinity': ['bureaucrat', 'sysop']
		}
	}
};
importArticles({type: "script",articles:["u:halo:MediaWiki:Wikia.js/Slider.js"]});

// Scrolls Games lewy i prawy
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.cookie']);
mw.loader.using(['jquery.ui.tabs'], function() {
	var $tabs = $("#portal_slider").tabs({
		fx: {
			opacity: 'toggle',
			duration: 100
		}
	});
	$("[class^=portal_sliderlink]").click(function() { // bind click event to link
		$tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
		return false;
	});
	$('#portal_next').click(function() {
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
		return false;
	});
	$('#portal_prev').click(function() {
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
		return false;
	});
});
//===============================================================================
// Przyciski dla edytora w trybie źródłowym
//===============================================================================
if(mwCustomEditButtons && wgNamespaceNumber != 10 && wgNamespaceNumber != 828) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/5/5c/Button_h2p.png",
		"speedTip": "Nagłówek 2. poziomu",
		"tagOpen": "== ",
		"tagClose": " ==",
		"sampleText": "Tekst nagłówka"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/1/15/Button_h3p.png",
		"speedTip": "Nagłówek 3. poziomu",
		"tagOpen": "=== ",
		"tagClose": " ===",
		"sampleText": "Tekst nagłówka"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/1/1c/Button_h4p.png",
		"speedTip": "Nagłówek 4. poziomu",
		"tagOpen": "==== ",
		"tagClose": " ====",
		"sampleText": "Tekst nagłówka"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
		"speedTip": "Lista numerowana",
		"tagOpen": "# ",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
		"speedTip": "Lista punktowana",
		"tagOpen": "* ",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/0/05/Button_Anf%C3%BChrung.png",
		"speedTip": "Wstaw nawias",
		"tagOpen": "„",
		"tagClose": "”",
		"sampleText": "Tekst"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/elderscrolls/images/7/70/Button_disambig.png/revision/latest?cb=20160407152304&path-prefix=pl",
		"speedTip": "Utwórz ujednoznacznienie",
		"tagOpen": "{" + "{disambig}" + "}\n* ",
		"tagClose": "",
		"sampleText": "Ujednoznacznienie"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Utwórz przekierowanie",
		"tagOpen": "#TAM [[:",
		"tagClose": "]]",
		"sampleText": "Przekierowanie"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/elderscrolls/pl/images/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię obrazów",
		"tagOpen": "<gallery>",
		"tagClose": "\n</gallery>",
		"sampleText": "\nPrzykład.jpg|Podpis1\nPrzykład.jpg|Podpis2"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/elderscrolls/images/8/8c/Button_RedX.png/revision/latest?cb=20160407151721&path-prefix=pl",
		"speedTip": "Zgłoś stronę do usunięcia",
		"tagOpen": "{" + "{EK|",
		"tagClose": "}" + "}",
		"sampleText": "Powód usunięcia"
	};
}
// </nowiki>
// </source>