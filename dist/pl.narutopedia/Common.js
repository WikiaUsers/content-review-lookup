ajaxPages = ["Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki/watchlist","Specjalna:Rejestr","Specjalna:Nowe_pliki"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje zawartość tej strony';

importArticles({
    type: "script",
    articles: [
	"MediaWiki:Common.js/CEB.js",			// Custom edit buttons
	"MediaWiki:Common.js/displayTimer.js",		// DisplayTimer
	"u:pl.tes:MediaWiki:Change.js",			// Change
	"u:dev:ShowHide/code.js",			// Zawijane tabelki
	"u:starwars:MediaWiki:Functions.js",		// Functions
	"u:pl.gothic:MediaWiki:Common.js/extraRollbacks.js", // Extra Rollback Buttons - by Monchoman45
	"u:dev:AjaxRC/code.js",				// AjaxRC
	"u:dev:WallGreetingButton/code.js"		// WallGreetingButton
   ]
});

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
$('#mw-upload-form').submit(function (e) {
	return emptyLicenseAlert(this);
});

// ==================================================
// Zmiana "użytkownik wikii" na numer IP - by Monchoman45
// ==================================================
function AnonIP() {
	var list = document.getElementsByTagName('a');
	for(var i in list) {
		if(list[i].href && list[i].href.indexOf('Specjalna:Wkład/') && list[i].innerHTML == 'Użytkownik Wikii') {
			list[i].innerHTML = list[i].href.substring(list[i].href.lastIndexOf('/') + 1, list[i].href.length);
		}
	}
}
addOnloadHook(AnonIP);

// ==================================================
// Usunięcie podglądu obrazków - automatycznie otwieranie strony z plikiem
// ==================================================
window.wgEnableImageLightboxExt = false;
function changeimagelinks() {
	$('#WikiaArticle, .LatestPhotosModule, #article-comments').unbind('click.lightbox');
 
	var a = document.getElementsByTagName('a');
	for(var t = 0; t < a.length; ++t) {
		var a2 = a[t];
		var img = a2.getElementsByTagName('img');
		if(img[0] != null) {
			if (a2.href.indexOf('images.wikia.com') != -1) {
				var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
				a2.setAttribute('href',link);
			}
		}
	}
}
addOnloadHook(changeimagelinks);

// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}
addOnloadHook(foldingTabsMulti);

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}

/* Auto-odświeżanie wybranych stron */
ajaxPages = ["Specjalna:WikiActivity","Specjalna:Ostatnie_zmiany","Specjalna:WikiActivity/watchlist","Specjalna:Rejestr","Forum_o_grach_i_świecie_Gothic","Forum:Strona_główna","Specjalna:Nowe_pliki","Kategoria:Do_poprawy","Kategoria:Do_skategoryzowania","Kategoria:Stuby","Specjalna:Statystyka","Specjalna:Potrzebne_strony","Specjalna:Potrzebne_szablony","MediaWiki:Wikia.css","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje zawartość tej strony';
importScriptPage('AjaxRC/code.js', 'dev');
/* END Auto-odświeżanie wybranych stron */

// ==================================================
// Toggles the display of elements on a page
// ==================================================
	/*
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
        if (!elem.className)
            continue;

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

// ==================================================
// Dodanie szablonu do uploadu plików
// ==================================================
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)

// ==================================================
// Code for custom edit buttons (ō, ū characters)
// ==================================================
if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png",
		"speedTip": "Zamknij dyskusję",
		"tagOpen": "\{\{Discussion Closed|result=",
		"tagClose": "\}\}",
		"sampleText": "twój powód"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/e/e1/O_Accent_Button.png",
		"speedTip": "Dodaj znak ō",
		"tagOpen": "ō",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/d/db/U_Accent_Button.png",
		"speedTip": "Dodaj znak ū",
		"tagOpen": "ū",
		"tagClose": "",
		"sampleText": ""};
}
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
	initFunctionsJS();
	addHideButtons();
	substUsername();
}
 
function addHideButtons() {
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}
 
addOnloadHook( loadFunc ); ajaxPages = ["Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki/watchlist","Specjalna:Rejestr","Specjalna:Nowe_pliki"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje zawartość tej strony';

importArticles({
    type: "script",
    articles: [
	"MediaWiki:Common.js/CEB.js",			// Custom edit buttons
	"MediaWiki:Common.js/displayTimer.js",		// DisplayTimer
	"u:pl.tes:MediaWiki:Change.js",			// Change
	"u:dev:ShowHide/code.js",			// Zawijane tabelki
	"u:starwars:MediaWiki:Functions.js",		// Functions
	"u:pl.gothic:MediaWiki:Common.js/extraRollbacks.js", // Extra Rollback Buttons - by Monchoman45
	"u:dev:AjaxRC/code.js",				// AjaxRC
	"u:dev:WallGreetingButton/code.js"		// WallGreetingButton
   ]
});

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
$('#mw-upload-form').submit(function (e) {
	return emptyLicenseAlert(this);
});

// ==================================================
// Zmiana "użytkownik wikii" na numer IP - by Monchoman45
// ==================================================
function AnonIP() {
	var list = document.getElementsByTagName('a');
	for(var i in list) {
		if(list[i].href && list[i].href.indexOf('Specjalna:Wkład/') && list[i].innerHTML == 'Użytkownik Wikii') {
			list[i].innerHTML = list[i].href.substring(list[i].href.lastIndexOf('/') + 1, list[i].href.length);
		}
	}
}
addOnloadHook(AnonIP);

// ==================================================
// Usunięcie podglądu obrazków - automatycznie otwieranie strony z plikiem
// ==================================================
window.wgEnableImageLightboxExt = false;
function changeimagelinks() {
	$('#WikiaArticle, .LatestPhotosModule, #article-comments').unbind('click.lightbox');
 
	var a = document.getElementsByTagName('a');
	for(var t = 0; t < a.length; ++t) {
		var a2 = a[t];
		var img = a2.getElementsByTagName('img');
		if(img[0] != null) {
			if (a2.href.indexOf('images.wikia.com') != -1) {
				var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
				a2.setAttribute('href',link);
			}
		}
	}
}
addOnloadHook(changeimagelinks);

// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}
addOnloadHook(foldingTabsMulti);

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}

/* Auto-odświeżanie wybranych stron */
ajaxPages = ["Specjalna:WikiActivity","Specjalna:Ostatnie_zmiany","Specjalna:WikiActivity/watchlist","Specjalna:Rejestr","Forum_o_grach_i_świecie_Gothic","Forum:Strona_główna","Specjalna:Nowe_pliki","Kategoria:Do_poprawy","Kategoria:Do_skategoryzowania","Kategoria:Stuby","Specjalna:Statystyka","Specjalna:Potrzebne_strony","Specjalna:Potrzebne_szablony","MediaWiki:Wikia.css","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje zawartość tej strony';
importScriptPage('AjaxRC/code.js', 'dev');
/* END Auto-odświeżanie wybranych stron */

// ==================================================
// Toggles the display of elements on a page
// ==================================================
	/*
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
        if (!elem.className)
            continue;

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

// ==================================================
// Dodanie szablonu do uploadu plików
// ==================================================
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)

// ==================================================
// Code for custom edit buttons (ō, ū characters)
// ==================================================
if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png",
		"speedTip": "Zamknij dyskusję",
		"tagOpen": "\{\{Discussion Closed|result=",
		"tagClose": "\}\}",
		"sampleText": "twój powód"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/e/e1/O_Accent_Button.png",
		"speedTip": "Dodaj znak ō",
		"tagOpen": "ō",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/bleach/en/images/d/db/U_Accent_Button.png",
		"speedTip": "Dodaj znak ū",
		"tagOpen": "ū",
		"tagClose": "",
		"sampleText": ""};
}
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
	initFunctionsJS();
	addHideButtons();
	substUsername();
}
 
function addHideButtons() {
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}
 
addOnloadHook( loadFunc );