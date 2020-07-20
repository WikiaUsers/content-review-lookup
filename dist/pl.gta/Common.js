/* Import rzeczy dla adminów z [[MediaWiki:Group-sysop.js]] */
if (wgUserGroups.indexOf('sysop') != -1) importScriptPage('MediaWiki:Group-sysop.js');
/* Import rzeczy dla moderatorów z [[MediaWiki:Group-rollback.js]] */
if (wgUserGroups.indexOf('rollback') != -1) importScriptPage('MediaWiki:Group-rollback.js');

/*** {{Punkt}} ***/
addOnloadHook(function() {
  $('div.punkcik').each(function() {
    var kolor   = $(this).attr('data-kolor');
    var link    = $(this).attr('data-link');
    var tekst   = $(this).attr('data-tekst');
    var w_dol   = $(this).attr('data-w-dol');
    var w_prawo = $(this).attr('data-w-prawo');
    
    // Zabezpieczenie przed próbą wstrzyknięcia kodu 
    if (kolor.includes('"') || link.includes('"') || tekst.includes('"') || w_dol.includes('"') || w_prawo.includes('"')) return;
    
    var href  = 'href="' + link + '" ';
    var style = 'style="background: ' + kolor +'; top: ' + w_dol + 'px; left: ' + w_prawo + 'px;"';
    var title = (tekst != '' ? ' title="' + tekst + '"' : '');
  
    $(this).replaceWith('<a class="punkcik" ' + href + style + title + '"></a>');
  });
});

/*** {{YouTube}} - nasza nowa wersja ***/
addOnloadHook(function() {
  $('div.judup-film').each(function() {
    var id = $(this).attr('data-id');
    var width = ($(this).attr('data-width') || 640);
    var height = ($(this).attr('data-height') || 360);

    // Zabezpieczenia / safety checks
    if (!id                    ||
        !id.match(/^[\w\-]*$/) ||
        !width.match(/^\d*$/)  ||
        !height.match(/^\d*$/) )
        return;

    // Podmiana / replacement
    $(this).replaceWith('<iframe class="judup-film" type="text/html" width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/' + id + '" frameborder="0" />');
  });
});

/*** Automatyczne uzupełnianie nicka w linkach do bramki IRC ***/
addOnloadHook(function() {
  var nick = mw.config.get('wgUserName').replace(/[\., ]/g, '_').substring(0,16);
  $(
    'div.irc a[href="https://webchat.freenode.net/#wikia-pl.gta"]'
  ).attr('href', 'https://webchat.freenode.net/#wikia-pl.gta?nick=' + nick);
});


/* TODO Zastąpić te navboksy wdudowanymi w MW. */
/* 1. Nawigacja */
// ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 // pochodzi z http://en.wikipedia.org/wiki/MediaWiki:Monobook.js
 // autorzy: http://en.wikipedia.org/w/index.php?title=MediaWiki:Monobook.js&action=history
 // licencja: GFDL
 // set up the words in your language
 var NavigationBarHide = '[ukryj]';
 var NavigationBarShow = '[pokaż]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1; 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
            
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 addOnloadHook(function(){createNavigationBarToggleButton();});
 
 // END Dynamic Navigation Bars
 // ============================================================

/* 2. Automatyczne opisy zmian */ 
/* Przeniesione do [[MediaWiki:Gadget-Opisy.js]] w zaktualizowanej formie z obsługą VE */

/* 3. Dodatkowe przyciski */
/* Autor: [[User:Gudyś|Gudyś]] */

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",  //ścieżka do obrazka (pełna ścieżka)22x22px
        "speedTip": "Przekierowanie",    //tekst który się wyświetli gdy najedziemy na przycisk myszką
        "tagOpen": "#PATRZ[[",        //znacznik rozpoczynający
        "tagClose": "]]",      //znacznik kończący
        "sampleText": "Tytuł strony"   ////tekst pomiędzy znacznikami (domyślnie zaznaczony)
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",  
        "speedTip": "Tekst przekreślony",    
        "tagOpen": "<del>",
        "tagClose": "</del>",
        "sampleText": "Tekst przekreślony"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Złamanie linii",    
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Indeks górny",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Indeks górny"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Indeks dolny",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Indeks dolny"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Mały tekst",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Mały tekst"
}; 
   mwCustomEditButtons[mwCustomEditButtons.length] = {

     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Wstaw galerię grafiki",
     "tagOpen": "\n<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Plik:Przykład.jpg|Podpis1\nPlik:Przykład.jpg|Podpis2"};

mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Długi cytat",
        "tagOpen": "<blockquote>",
        "tagClose": "</blockquote>",
        "sampleText": "Tutaj wstaw długi cytat"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Przypis",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Tutaj wstaw treść przypisu"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2a/Button_category_plus.png",
        "speedTip": "Wstaw kategorię",
        "tagOpen": "[[Kategoria:",
        "tagClose": "]]",
        "sampleText": "Nazwa kategorii"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Wstaw szablon",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Nazwa szablonu"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Wstaw tabelę",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": '! nagłówek 1\n! nagłówek 2\n! nagłówek 3\n|-\n| wiersz 1, komórka 1\n| wiersz 1, komórka 2\n| wiersz 1, komórka 3\n|-\n| wiersz 2, komórka 1\n| wiersz 2, komórka 2\n| wiersz 2, komórka 3',
};

mwCustomEditButtons.push(button);

function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

if(document.title.indexOf("Specjalna:Blockip") == 0) document.write('<script type="text/javascript" src="/index.php?title=U%C5%BCytkownik:Szoferka/popupmenu.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');

var NavigationBarShowDefault = 1; 

/* 4. Kolorowanie linków do disambigów */
/* Autor: [[wikipedia:pl:User:Beau|Beau]] */
/* Oryginalny plik 1: http://pl.wikipedia.org/wiki/MediaWiki:Gadget-lib-beau.js */
/* Oryginalny plik 2: http://pl.wikipedia.org/wiki/MediaWiki:Gadget-mark-disambigs.js */
var beau$userGroups = {};
 
if (wgUserGroups) {
	for (var i = 0; i < wgUserGroups.length; i++) {
		beau$userGroups[ wgUserGroups[i] ] = true;
	}
}
 
function beau$callAPI(query) {
	var url = wgServer + wgScriptPath + '/api.php?';
 
	for (var field in query) {
		var value = query[field];
		url += '&' + field + '=' + encodeURIComponent(value);
	}
	url += '&format=json';
	importScriptURI(url);
}
var markDisambigsGadget = {
	pageLoaded:	false,
	dataLoaded:	false,
	disambig:	{},
	uniqueLinks:	0,
	links:	0
};
 
markDisambigsGadget.request = function(clcontinue) {
	var query = {
		action:	'query',
		titles:	wgPageName,
		prop:	'categories',
		cllimit:	'max',
		gpllimit:	'max',
		generator:	'links',
		callback:	'markDisambigsGadget.processResponse'
	};
	if (clcontinue) {
		query['clcontinue'] = clcontinue;
	}
	beau$callAPI(query);
}
 
markDisambigsGadget.isDisambig = function(categories) {
	for (var key in categories) {
		if (categories[key].title == 'Kategoria:Strony ujednoznaczniające')
			return true;
	}
	return false;
}
 
markDisambigsGadget.processResponse = function(data) {
	if (! data.query)
		return;
 
	document.data = data;
	for (var pageid in data.query.pages) {
		var page = data.query.pages[pageid];
		if (page.categories && this.isDisambig(page.categories))
		{
			if (this.disambig[page.title])
				continue;
 
			this.disambig[page.title] = true;
			this.uniqueLinks++;
		}
	}
 
	if (data['query-continue'] && data['query-continue']['categories']) {
		this.request(data['query-continue']['categories']['clcontinue'])
	}
	else if (this.pageLoaded)
		this.doColor();
	else
		this.dataLoaded = true;
}
 
markDisambigsGadget.doColor = function() {
	if (! this.uniqueLinks)
		return;
 
	var links = document.getElementsByTagName('a');
	this.disambig['Wikipedia:Strona ujednoznaczniająca'] = false;
	for (var i = 0; i < links.length; i++)
	{
		var link = links[i];
 
		if (this.disambig[link.title]) {
			this.links++;
			if (link.text == 'inne znaczenia tego określenia')
				continue;
 
			if (link.parentNode && link.parentNode.className.match(/\bdisambig\b/))
				continue;
 
			link.className = 'mw-disambig';
		}
	}
}
 
 
markDisambigsGadget.init = function() {
	this.pageLoaded = true;
	if (this.dataLoaded)
		this.doColor();
}
 
if (wgNamespaceNumber >= -1 &&  !document.location.href.match(/printable=yes/)) {
 
	markDisambigsGadget.request();
	addOnloadHook(function() { markDisambigsGadget.init() });
}

/* 5. Przesunięcie linków [ edytuj ] przy sekcjach
; Autor: Copyright 2006, Marc Mongenet
; Opis: Wyszukuje <span class="editsection"> i przesuwa na koniec ich rodzica (nagłówka sekcji) wyświetlając ''inline'' ze zmniejszoną czcionką.
; Licencja: 
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 
http://www.gnu.org/licenses/gpl.html
*/
addOnloadHook(function() {
 try {
	if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
	var spans = document.getElementsByTagName("span");
	for (var s = 0; s < spans.length; ++s) {
		var span = spans[s];
		if (span.className == "editsection") {
			span.style.cssText = 'float: none; font-size: x-small; font-weight: normal; vertical-align: top;';
			span.parentNode.appendChild(document.createTextNode(" "));
			span.parentNode.appendChild(span);
		}
	}
 } catch (e) { /* błąd */ }
});

/*
==== 6. Dodanie linka [edytuj] dla sekcji nagłówkowej ====
; Pomysł: [[:en:User:Pile0nades]]
; Wykonanie: Maciej Jaros [[:pl:User:Nux]]
; Licencja: [http://opensource.org/licenses/gpl-license.php GNU General Public License v2]
*/
// Liczba nagłówków drugiego, trzeciego i czwartego stopnia
// jakie muszą się pojawić w artykule, żeby pojawił się link
var addEditTopLinkNumHeaders = 1; // dla 1 => dla jednego i więcej się pojawi
function addEditTopLink() {
	//
	// somehow it gets run twice on some pages - stop that
	if (window.addEditTopLinkDone) {
		return;
	}
	window.addEditTopLinkDone = true;
 
	//
	// if this is preview page or there is no edit tab, stop
	

	if ( typeof(wgIsArticle) != 'undefined'  &&  !wgIsArticle ) {
		return;
	}
 
 
	//
	// if there are no edit-section links then stop
	var spans = document.getElementById("bodyContent").getElementsByTagName("span");
	var i;
	for (i = 0; i < spans.length; i++) {
		if (spans[i].className == 'editsection') {
			break;
		}
	}
	if (i>=spans.length) {
		return;
	}
 
	//
	// additional checkup to stop
	var test = document.getElementById("bodyContent").getElementsByTagName("h2").length +
		document.getElementById("bodyContent").getElementsByTagName("h3").length +
		document.getElementById("bodyContent").getElementsByTagName("h4").length;
	// note that there is always siteSub (h3)
	if (test<=addEditTopLinkNumHeaders) {
		return;
	}
 
	//
	// get first header element
	var fst_h1 = document.getElementById("content").getElementsByTagName("h1")[0];
 
	//
	// Creating elements
	//
	// create div
	var div = document.createElement("DIV");
	div.className = 'editsection';
	// create link
	var link = document.createElement("A");
	link.href = document.getElementById("ca-edit").getElementsByTagName("a")[0].href + '&section=0';
	link.setAttribute('title', 'edytuj sekcję nagłówkową artykułu');
	link.appendChild(document.createTextNode('edytuj'));
	// append link and stuff to div
	div.appendChild(document.createTextNode('['));
	div.appendChild(link);
	div.appendChild(document.createTextNode(']'));
 
	//
	// Insert edit div into h1 and content of h1 to div (it has to be like that so that FF doesn't select the edit link on double click)
	//
	var div_h1 = document.createElement("div");
	// move children
	while(fst_h1.childNodes.length)
	{
		div_h1.appendChild(fst_h1.firstChild)
	}
	fst_h1.appendChild(div);	// edit link
	fst_h1.appendChild(div_h1);	// previous h1 content
}
if (skin=='vector' || skin=='monobook')
{
	$(document).ready(addEditTopLink);
}