/* BackToTopButton */
window.BackToTopModern = true;

importArticles({
    type: "script",
    articles: [
        "u:halo:MediaWiki:Wikia.js/Slider.js",
    ]
});

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

// Komunikat
function setCookie() {
  document.cookie = "PlHelpThread=closed; expires=0; path=/"; 
}
 
function getCookie(name)
  {
 var re = new RegExp(name + "=([^;]+)");
 var value = re.exec(document.cookie);
 return (value != null) ? unescape(value[1]) : null;
  }
 
var notifNotClosed = getCookie("PlHelpThread") != "closed";
 
      if (notifNotClosed) {
 
var message = 'Alternatywa na medal!<br/>Głosowanie trwa od 1. do 15. dnia miesiąca!<br/><a href="http://pl.ben10alternatywnehistorie.wikia.com/wiki/Ben_10_Alternatywne_Historie_Wiki:Alternatywa_na_medal#G.C5.82osowanie" class="plainlinks">Zagłosuj już teraz!</a>';
 
if($('.WikiaNotifications').length > 0) { 
          $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
       } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
       }
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
		"tagOpen": "{{Inne znaczenia",
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