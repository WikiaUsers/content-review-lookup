/* Auto-odświeżanie wybranych stron */
ajaxPages = [
    "Specjalna:WikiActivity",
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:WikiActivity/watchlist",
    "Specjalna:Rejestr",
    "Forum_o_grach_i_świecie_Gothic",
    "Forum:Strona_główna",
    "Specjalna:Nowe_pliki",
    "Kategoria:Do_poprawy",
    "Kategoria:Do_skategoryzowania",
    "Kategoria:Stuby",
    "Specjalna:Statystyka",
    "Specjalna:Potrzebne_strony",
    "Specjalna:Potrzebne_szablony",
    "MediaWiki:Wikia.css",
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:Aktywność_na_wiki"
];
AjaxRCRefreshText       = 'Auto-odświeżanie';
AjaxRCRefreshHoverText  = 'Automatycznie aktualizuje zawartość tej strony';
/* END Auto-odświeżanie wybranych stron */

importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/CEB.js',                           // Custom edit buttons
        'MediaWiki:Common.js/displayTimer.js',                  // DisplayTimer
        'u:pl.tes:MediaWiki:Change.js',                         // Change
        'u:dev:ShowHide/code.js',                               // Zawijane tabelki
        'u:starwars:MediaWiki:Functions.js',                    // Functions
        'u:pl.gothic:MediaWiki:Common.js/extraRollbacks.js',    // Extra Rollback Buttons
        'u:dev:AjaxRC/code.js',                                 // AjaxRC
        'u:dev:WallGreetingButton/code.js',                     // WallGreetingButton
        'u:dev:MediaWiki:Toggler.js'
    ]
});

function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
	if (window.emptyLicenseWarningDelivered) return true;
	if ($('#wpLicense').val() === '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true;
		return false;
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
//  Folding Multi Wiki Tabs (experimental)
// ==================================================
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length===0) return;

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

// ==================================================
// Dodanie szablonu do uploadu plików
// ==================================================
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
$(function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'special:upload') { return; }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
});

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
 
		if( button !== null && button.length > 0 ) {
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
 
	if( content !== null && content.length > 0 ) {
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