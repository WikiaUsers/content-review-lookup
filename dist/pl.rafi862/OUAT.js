
// IMPORT
importArticles({
    type: "script",
    articles: [
      "w:c:dev:RevealAnonIP/code.js",          //RevealAnonIP
      "w:c:dev:WallGreetingButton/code.js",    //WallGreetingButton
      "w:c:dev:DISPLAYTITLE/code.js",          //DISPLAYTITLE
      "w:c:dev:SearchSuggest/code.js",         //SearchSuggest
      "w:c:dev:ShowHide/code.js",              //ShowHide
      "w:c:dev:DynamicImages/code.js",         //DynamicImages
      "w:c:dev:ExtendedNavigation/code.js",    //ExtendedNavigation
    ]
});

// TOLLTIPS
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});

// LOCK OLD FORUMS
importArticles({
    type: "script",
    articles: [
	"u:spolecznosc:MediaWiki:LockForums.js"
   ]
});

// PRZENOSI INTERWIKI DO STOPKI NA SPECJALNA:FORUM
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
 
// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};
 
// SZABLON:USERNAME - KONFIGURACJA
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

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

// FUNKCJA TOGGLE
// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
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
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
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
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (typeof elem.className != 'string' || !elem.className) continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
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
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>

// WARNINGPOP
$('.warning.unstable').click(function() {
    $(this).slideToggle();
});

// EDITBUTTONS
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