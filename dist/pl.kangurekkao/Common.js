/* <pre> */
/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* 0. Nawigacja */
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

/* 1. Link do brudnopisów w menu osobistym */
/* Autor: [[wikipedia:pl:Wikipedysta:Herr Kriss]] */

addOnloadHook(function()
{
var elBefore = document.getElementById('pt-preferences');
var elNew = document.createElement('li');
if (wgUserName != null) {
        elNew.innerHTML='<a href="http://pl.gta.wikia.com/index.php?title=Specjalna:Mypage/Brudnopis">Mój brudnopis</a>';
 } else
 {
        elNew.innerHTML='<a href="http://pl.gta.wikia.com/index.php?title=Wikipedia:Brudnopis">Brudnopis</a>';
 }
elBefore.parentNode.insertBefore(elNew, elBefore);
});

/* 2. Automatyczne opisy zmian */ 
/* Autor (Author): [[wikipedia:pl:User:Adziura|Adam Dziura]] */
/* Poprawki (Fixes): [[wikipedia:pl:User:Nux|Maciej Jaros]] */

function przyciskiOpis()
{
	// stop before starting
	if (window.przyciskiOpisDone)
		return;

	//
	// sprawdzenie, czy to jest pole edycji z opisem zmian (nie jest takie jako nagłówek)
	var el = document.getElementById('wpSummaryLabel');
	if (el)
	{
		if (el.innerHTML.indexOf('Opis zmian')==-1)
			return	// stop
		;
		
	}
	else
	{
		return;	// stop
	}
	
	//
	// dodanie elementu okalającego przyciski bezpośrednio za opisem zmian
	var el = document.getElementById('wpSummary').nextSibling;
	var opisBtns = document.createElement('span');
	opisBtns.id = 'userSummaryButtons'
	el.parentNode.insertBefore(document.createElement('br'), el)
	el.parentNode.insertBefore(opisBtns, el)
	
	//
	// dodawanie przycisków
	//var kl = 'userButtonsStyle';
	var kl = '';	// klasa jest niepotrzebna (wszystkie <a> w #userSummaryButtons ustawione poprzez CSS)
	if (opisBtns)
	{
		// drobne różne
                przyciskiDodaj(opisBtns, 'ort.', 'dodajOpis("ort.")', kl,
                        'Poprawiono błąd ortograficzny');
		przyciskiDodaj(opisBtns, 'lit.', 'dodajOpis("lit.")', kl,
			'Poprawiono literówkę');
                przyciskiDodaj(opisBtns, 'int.', 'dodajOpis("int.")', kl,
                        'Poprawiono interpunkcję');
		przyciskiDodaj(opisBtns, 'ogonki', 'dodajOpis("polskie znaki")', kl,
			'Poprawa polskich znaków');

		// opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około wikizacyjne
		przyciskiDodaj(opisBtns, 'linki-zew', 'dodajOpis("linki zewnętrzne")', kl,
			'Poprawiono/dodano linki zewnętrzne');
		przyciskiDodaj(opisBtns, 'linki-popr', 'dodajOpis("poprawa linków")', kl,
			'Poprawiono linki zewnętrzne/wewnętrzne');
		przyciskiDodaj(opisBtns, 'kat.', 'dodajOpis("kat.")', kl,
			'Poprawiono/dodano kategorię');
		przyciskiDodaj(opisBtns, 'przypisy', 'dodajOpis("źródła/przypisy")', kl,
			'Dodanie/poprawienie przypisów lub źródeł');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'stub', 'dodajOpis("stub (zalążek)")', kl,
			'Ten artykuł to stub');
		przyciskiDodaj(opisBtns, 'disamb', 'dodajOpis("disambig (ujednoznacznienie)")', kl,
			'Poprawiono/dodano stronę ujednoznaczniającą');
		przyciskiDodaj(opisBtns, 'obrazek', 'dodajOpis("obrazek")', kl,
			'Poprawiono/dodano grafikę');
		przyciskiDodaj(opisBtns, 'szablon', 'dodajOpis("szablon")', kl,
			'Poprawiono/dodano szablon');
		przyciskiDodaj(opisBtns, 'infobox', 'dodajOpis("infobox")', kl,
			'Poprawiono/uzupełnienio/dodano infobox');

		opisBtns.appendChild(document.createElement('br'));

		// drobne inne
		przyciskiDodaj(opisBtns, 'dr.meryt.', 'dodajOpis("drobne merytoryczne")', kl,
			'Drobne zmiany merytoryczne');
		przyciskiDodaj(opisBtns, 'dr.red.', 'dodajOpis("drobne redakcyjne")', kl,
			'Drobne zmiany redakcyjne');
		przyciskiDodaj(opisBtns, 'dr.tech.', 'dodajOpis("drobne techniczne")', kl,
			'Drobne zmiany techniczne');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// do użytkownika i około administracyjne
		przyciskiDodaj(opisBtns, 'witaj', 'dodajOpis("witaj")', kl,
			'Dodano powitanie dla użytkownika');
		przyciskiDodaj(opisBtns, 'test', 'dodajOpis("test")', kl,
			'Dodano ostrzeżenie dla użytkownika');
		przyciskiDodaj(opisBtns, 'delete', 'dodajOpis("[[:Kategoria:Usunąć|delete]]")', kl,
			'Zgłoszono artykuł do ekspresowego (s)kasowania');
		przyciskiDodaj(opisBtns, 'rev.', 'dodajOpis("przywrócenie poprzedniej wersji")', kl,
			'przywrócenie poprzedniej wersji');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// insze do dyskusji i głosowań
		przyciskiDodaj(opisBtns, 'głos', 'dodajOpis("głos")', kl,
			'Oddano głos');
		przyciskiDodaj(opisBtns, 'komentarz', 'dodajOpis("komentarz")', kl,
			'Dodano komentarz w dyskusji lub do głosu');
		przyciskiDodaj(opisBtns, 'aktual.', 'dodajOpis("aktualizacja strony")', kl,
			'aktualizacja strony');
		przyciskiDodaj(opisBtns, 'licencja', 'dodajOpis("dodano/zmieniono licencję")', kl,
			'Dodano/zmieniono licencję');


		// odstęp przed własnymi
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

//		document.editform.wpMinoredit.onclick = onMinorEditClick;
	}
}

/*
Parametry:
* elUserBtns - element okalający, do którego dodać przycisk
* pTekst - tekst w środku przycisku
* pAkcja - akcja (w formie tekstowej) jaką wykonać przy naciśnięciu; może być ciągiem poleceń
* pKlasa - klasa jeśli konieczna
* pOpis - opis widoczny w dymku przy przycisku
*/
function przyciskiDodaj(elUserBtns, pTekst, pAkcja, pKlasa, pOpis)
{
	var nowyBtn = document.createElement('a');

	// atrybuty
	nowyBtn.appendChild(document.createTextNode(pTekst));
	nowyBtn.title = pOpis;
	if (pKlasa != '')
		nowyBtn.className = pKlasa
	;
	nowyBtn.onclick = new Function(pAkcja);

	// dodanie przycisku
	elUserBtns.appendChild(nowyBtn);
}

var clickedMinor = false;
function onMinorEditClick()
{
	if (this.checked && !clickedMinor)
	{
		dodajOpis("drobne");
		clickedMinor = true;
	}
}

function dodajOpis(opis)
{
	var wpS = document.editform.wpSummary;
	if (wpS.value != '' && wpS.value.charAt(wpS.value.length-2) != '/')
	{
		wpS.value += ', ' + opis
	}
	else
	{
		wpS.value += opis
	}
}

addOnloadHook(przyciskiOpis);

// END OF Onlyifediting.js
// 

/* 3. Funkcje sortowania w tabelkach */
function ts_parseFloat(num) {
        if (!num) return 0;
        num = parseFloat(num.replace(/,/g, ".").replace(/[\xa0]/g, ""));
        return (isNaN(num) ? 0 : num);
}
 
function ts_resortTable(lnk) {
        // get the span
        var span = lnk.getElementsByTagName('span')[0];
 
        var td = lnk.parentNode;
        var tr = td.parentNode;
        var column = td.cellIndex;
 
        var table = tr.parentNode;
        while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
                table = table.parentNode;
        if (!table) return;
 
        // Work out a type for the column
        if (table.rows.length <= 1) return;
 
        // Skip the first row if that's where the headings are
        var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);
 
        var itm = "";
        for (var i = rowStart; i < table.rows.length; i++) {
                if (table.rows[i].cells.length > column) {
                        itm = ts_getInnerText(table.rows[i].cells[column]);
                        itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
                        if (itm != "") break;
                }
        }
 
        sortfn = ts_sort_caseinsensitive;
        if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^[\u00a3$\u20ac]/)) // pound dollar euro
                sortfn = ts_sort_currency;
        if (itm.match(/^[\d.,\xa0]+\%?$/))
                sortfn = ts_sort_numeric;
 
        var reverse = (span.getAttribute("sortdir") == 'down');
 
        var newRows = new Array();
        for (var j = rowStart; j < table.rows.length; j++) {
                var row = table.rows[j];
                var keyText = ts_getInnerText(row.cells[column]);
                var oldIndex = (reverse ? -j : j);
 
                newRows[newRows.length] = new Array(row, keyText, oldIndex);
        }
 
        newRows.sort(sortfn);
 
        var arrowHTML;
        if (reverse) {
                        arrowHTML = '<img src="'+ ts_image_path + ts_image_down + '" alt="↓"/>';
                        newRows.reverse();
                        span.setAttribute('sortdir','up');
        } else {
                        arrowHTML = '<img src="'+ ts_image_path + ts_image_up + '" alt="↑"/>';
                        span.setAttribute('sortdir','down');
        }
 
        // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
        // don't do sortbottom rows
        for (var i = 0; i < newRows.length; i++) {
                if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") == -1)
                        table.tBodies[0].appendChild(newRows[i][0]);
        }
        // do sortbottom rows only
        for (var i = 0; i < newRows.length; i++) {
                if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") != -1)
                        table.tBodies[0].appendChild(newRows[i][0]);
        }
 
        // Delete any other arrows there may be showing
        var spans = getElementsByClassName(tr, "span", "sortarrow");
        for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '<img src="'+ ts_image_path + ts_image_none + '" alt="↓"/>';
        }
        span.innerHTML = arrowHTML;
 
        ts_alternate(table);            
}

/* 4. Dodatkowe przyciski */
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

/* 5. Dodatkowe wyszukiwarki poniżej standardowej */
if (wgCanonicalSpecialPageName == "Search") {
        addOnloadHook(SpecialSearchEnhanced);
}

function SpecialSearchEnhanced() 
{
    if (document.forms['powersearch'])
    var searchForm = document.forms['powersearch'];
    if (document.forms['search'])
    var searchForm = document.forms['search'];
    if (searchForm.lsearchbox) {
        var searchBox = searchForm.lsearchbox;
    } else {
        var searchBox = searchForm.search;
    }

    var searchValue = searchBox.value
    var safeSearchValue = searchValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    var node = document.createElement('div');

    var SearchEnhancedText = '<p/><br/>Przeszukując GTA Wiki możesz skorzystać z wbudowanej wyszukiwarki (jest powyżej), lub korzystać z wyszukiwarek poniżej. Wbudowana wyszukiwarka jest dosyć prosta, bardziej efektywne są zewnętrzne wyszukiwarki. Korzystając z zewnętrznych wyszukiwarek trzeba liczyć się z tym, że nowe artykuły nie będą od razu zindeksowane po stworzeniu.';
    
    var googleSearch =  '<p/><table width=100%><tr valign=top><td align=left>';
        googleSearch += '<form method=get action="http://www.google.pl/search">';
        googleSearch += '<input type=text name=q value="' + safeSearchValue + '">';
        googleSearch += '<input type=hidden name=hl value=pl>';
        googleSearch += '&#32;<select name=sitesearch>';
        googleSearch += '<option value="gta.wikia.com"> Angielska GTA Wiki </option>';
        googleSearch += '<option value="es.gta.wikia.com"> Hiszpańska GTA Wiki </option>';
        googleSearch += '<option value="de.gta.wikia.com"> Niemiecka GTA Wiki </option>';
        googleSearch += '<option value="nl.gta.wikia.com"> Holenderska GTA Wiki </option>';
        googleSearch += '<option value="pl.gta.wikia.com"> Polska GTA Wiki </option>';
        googleSearch += '<option value="wikigta.org"> WikiGTA </option>';
        googleSearch += '<option value="pl.wikipedia.org"> Polska Wikipedia </option>';
        googleSearch += '<option value="wikipedia.org"> Wszystkie Wikipedie </option>';
        googleSearch += '<option value=""> Cały internet </option>';
        googleSearch += '</select>&#32;<input type=submit value="Szukaj w Google">';
        googleSearch += '</form></td>';

    var yahooSearch =  '<td>&nbsp;</td><td align=center>';
        yahooSearch += '<form method=get action="http://search.yahoo.com/search">';
        yahooSearch += '<input type=text name=p value="' + safeSearchValue + '">';
        yahooSearch += '<input type=hidden name=vs value=pl.gta.wikia.com>';
        yahooSearch += '&#32;<input type=submit value="Szukaj w Yahoo">';
        yahooSearch += '</form></td></tr></table><br/>';

    node.innerHTML = node.innerHTML + SearchEnhancedText + googleSearch + yahooSearch;
  	
    var nonefound = document.getElementById("nonefound")
    if (nonefound) {      
        nonefound.innerHTML = nonefound.innerHTML + '<div>' + node.innerHTML + '</div>';
        
    } else {     
        searchForm.parentNode.insertBefore(node, searchForm.nextSibling);
    }
}

/* </pre> */