/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Odliczanie */
importScriptPage('Countdown/code.js', 'dev');

// Pop-up references
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

// Licencje
var options = {
        '{{Art}}': 'Grafika art',
        '{{Copyright}}': 'Grafika Copyright',
        '{{GFDL}}': 'Grafika GFDL',
        '{{PD}}': 'Grafika domeny publicznej',
        '{{Plik użytkownika}}': 'Grafika użytkownika',
        '{{Plik wymiany}}': 'Grafika innej wiki',
        '{{Screenshot}}': 'Grafika screenshot',
        '{{Wikimedia}}': 'Grafika Wikimedii',
};
importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:License.js"
   ]
});

importScriptPage('AjaxRC/code.js', 'dev');

// Brak licencji
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

// AjaxRC
ajaxPages = ["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';

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
		"imageFile": "https://images.wikia.nocookie.net/wiki/Plik:Mini-oznaczenie.png",
		"speedTip": "Dodaj mini-oznaczenie",
		"tagOpen": "{{Tt|•|",
		"tagClose": "}}",
		"sampleText": "Mini-oznaczenie"
	};
 
}

// FUNKCJA TOGGLE
var togglers = new Array();
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id) {
    var toBeToggled = togglers[id];
    if (!toBeToggled) return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++) {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string") {
            if (toggles.charAt(0) == '-') {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles) toggles = new Array(toggles);
            }
            else toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length) continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
        switch (op) {
        case "_reset":
            for (var j in toggles)
            toggles[j].style.display = toggles[j]._toggle_original_display;
            break;
        case "_show":
            for (var j in toggles)
            toggles[j].style.display = '';
            break;
        case "_hide":
            for (var j in toggles)
            toggles[j].style.display = 'none';
            break;
        case "":
        default:
            // Toggle
            for (var j in toggles)
            toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
            break;
        }
    }
}
 
function createTogglerLink(toggler, id) {
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit() {
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (typeof elem.className != 'string' || !elem.className) continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++) {
            var elemClass = elemClasses[j];
            if (!allClasses[elemClass]) allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle") continue;
 
            if (elemClass == "_togglegroup") toggleGroup = new Array();
            else if (elemClass == "_toggle") toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init") {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show") elem.style.display = '';
                else if (disp == "hide") elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler") {
                if (togglerID == -1) {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1) toBeToggled = elemClass.substring(hyphen + 1);
                else {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
    createTogglerLink(togglerElems[i], i);
}
 
function owwsitesearch(f) {
    f.q.value = 'site:http://openwetware.org/wiki/' + f.base.value + '++' + f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>