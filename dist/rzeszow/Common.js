/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Zobacz [[MediaWiki:common.js]] */
/*
=== Link do brudnopisów w menu osobistym ===

; autor: [[Wikipedysta:Herr Kriss]]
*/

addOnloadHook(function()
{
var elBefore = document.getElementById('pt-preferences');
var elNew = document.createElement('li');
if (wgUserName != null) {
        elNew.innerHTML='<a href="http://pl.juventus.wikia.com/index.php?title=Specjalna:Mypage/Brudnopis">Mój brudnopis</a>';
 } else
 {
        elNew.innerHTML='<a href="http://pl.juventus.wikia.com/index.php?title=Wikipedia:Brudnopis">Brudnopis</a>';
 }
elBefore.parentNode.insertBefore(elNew, elBefore);
});

// END OF MediaWiki:Monobook.js
// </pre>





/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*
== Automatyczne opisy zmian ==
; Autor (Author): [[:pl:User:Adziura|Adam Dziura]]
; Poprawki (Fixes): [[:pl:User:Nux|Maciej Jaros]]

*/

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
			'Poprawiono/dodano linki do innych wersji Juvepedii');
		przyciskiDodaj(opisBtns, 'interwiki', 'dodajOpis("interwiki")', kl,
			'Poprawiono/dodano kategorię');
		przyciskiDodaj(opisBtns, 'przypisy', 'dodajOpis("źródła/przypisy")', kl,
			'Dodanie/poprawienie przypisów lub źródeł');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'stub', 'dodajOpis("stub (zalążek)")', kl,
			'Ten artykuł to stub');
		przyciskiDodaj(opisBtns, 'disamb', 'dodajOpis("disambig (ujednoznacznienie)")', kl,
			'Poprawiono/dodano stronę ujednoznaczniającą');
		przyciskiDodaj(opisBtns, 'grafika', 'dodajOpis("grafika")', kl,
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

//Dodatkowe przyciski
//Copyright by Gudys 23 June 2008
//All rights reserved and protected by law of United States of America
//Dupa tam, chronione przez Serby ZKS SLU CHWDP Forza JUVE!!! WZU F.C.B. Shreka
//Made in Harta in Poland
//Made in Grzybownia

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",  //ścieżka do obrazka (pełna ścieżka)22x22px
        "speedTip": "Przekierowanie",    //tekst który się wyświetli gdy najedziemy na przycisk myszką
        "tagOpen": "#REDIRECT[[",        //znacznik rozpoczynający
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
     "tagOpen": "<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Grafika:Przykład.jpg|Podpis1\nGrafika:Przykład.jpg|Podpis2"};

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

/*
  Funkcje sortowania w tabelkach
*/
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
 var NavigationBarShowDefault = 0;
 
 
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
 
 addLoadEvent(createNavigationBarToggleButton);
 
 // END Dynamic Navigation Bars
 // ============================================================

function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

if(document.title.indexOf("Specjalna:Blockip") == 0) document.write('<script type="text/javascript" src="/index.php?title=U%C5%BCytkownik:Szoferka/popupmenu.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');

var NavigationBarShowDefault = 1; 

/*</pre>*/
 /**
 * Skrypt für Vorlage:Galerie
 */
addOnloadHook(function() {
  if (document.URL.match(/printable/g)) return;
 
  function toggleImageFunction(group,  remindex, shwindex) {
    return function() {
      document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
      document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
      return false;
    };
  }
 
  var divs=document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length ; i++) {
    if (divs[i].className != "ImageGroup") continue;
    UnitNode=undefined;
    search=divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length ; j++) {
      if (search[j].className != "ImageGroupUnits") continue;
      UnitNode=search[j];
      break;
    }
    if (UnitNode==undefined) continue;
    units=Array();
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className=="center") units.push(temp);
    }
    for (j = 0 ; j < units.length ; j++) {
      currentimage=units[j];
      currentimage.id="ImageGroupsGr"+i+"Im"+j;
      var imghead = document.createElement("div");
      var leftlink = document.createElement("a");
      var rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.innerHTML="◀";
      }
      if (j != units.length - 1) {
        rightlink.href = "#";
        rightlink.onclick = toggleImageFunction(i, j, j+1);
        rightlink.innerHTML="▶";
      }
      var comment = document.createElement("tt");
      comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
      with(imghead) {
        style.fontSize="110%";
        style.fontweight="bold";
        appendChild(leftlink);
        appendChild(comment);
        appendChild(rightlink);
      }
      if (units.length>1) currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
});
 /** Main Page layout fixes *********************************************************
  *
  *  Description:        Various layout fixes for the main page, including an
  *                      additional link to the complete list of languages available
  *                      and the renaming of the 'Article' to to 'Main Page'.
  *  Maintainers:        [[User:AzaToth]], [[User:R. Koot]]
  */
 
 function mainPageRenameNamespaceTab() {
     try {
         var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
         if ( Node.textContent ) {      // Per DOM Level 3
             Node.textContent = 'Strona główna';
         } else if ( Node.innerText ) { // IE doesn't handle .textContent
             Node.innerText = 'Strona główna';
         } else {                       // Fallback
             Node.replaceChild( Node.firstChild, document.createTextNode( 'Strona główna' ) ); 
         }
     } catch(e) {
         // bailing out!
     }
 }
 
 function mainPageAppendCompleteListLink() {
     try {
         var node = document.getElementById( "p-lang" )
                            .getElementsByTagName('div')[0]
                            .getElementsByTagName('ul')[0];
 
         var aNode = document.createElement( 'a' );
         var liNode = document.createElement( 'li' );
 
         aNode.appendChild( document.createTextNode( 'Kompletna lista' ) );
         liNode.appendChild( aNode );
         liNode.className = 'interwiki-completelist';
         node.appendChild( liNode );
      } catch(e) {
        // lets just ignore what's happened
        return;
     }
 }
 
 if ( wgTitle == 'Strona główna' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
        addOnloadHook( mainPageRenameNamespaceTab );
 }
 
 if ( wgTitle == 'Strona główna' && wgNamespaceNumber == 0 ) {
        addOnloadHook( mainPageAppendCompleteListLink );
 }
/*</pre>
==Cookies==
<pre>*/
function SetCookie(cookieName, cookieValue) {
 var today = new Date();
 var expire = new Date();
 var nDays = 30;
 expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";expires="+expire.toGMTString();
}
  
function GetCookie(name) {
	var i =0;
	while (i < document.cookie.length) {
		if (document.cookie.substr(i,name.length) == name) {
			var valend = document.cookie.indexOf(";",i+name.length+1);
			if (valend == -1) {
				valend = document.cookie.length;
			}
			return unescape(document.cookie.substring(i+name.length+1,valend));
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
}

/* </pre>
==addLoadEvent==
<pre> */
function addLoadEvent(func) {
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}
/* </pre>
==Only If Editing==
<pre> */

 //Vordefinition für eigene Sonderzeichenleiste
 MyChar = new Array();
 MyCharText = new Array();
 MyCharEnd = new Array();
 MyCharDefault = new Array();


 //Im Bearbeitungsmodus?
 var isEditing = document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0;

// ============================================================
 // BEGIN import Onlyifediting-functions (z.B. für Dropdown-Leiste zum Einfügen von Sonderzeichen)


 // Optionen für das Sonderzeichenmenü in [[MediaWiki:Edittools]]
 // wird in [[MediaWiki:Monobook.js]] ganz unten eingebunden
 
 // Diese Variablen können in den Benutzer-Javascripts angepasst werden
/* </pre>

===InsertTagsValue===
<pre> */

 //Autoinkrement-Tags
 function insertTagsValue(uchar, ucharend, uchardefault, ucharnr) {
 
	var txtarea = document.editform.wpTextbox1;
 
	// IE
	if (document.selection && !is_gecko) {
		var theSelection = document.selection.createRange().text;
 
	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		var replaced = false;
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		if (endPos-startPos)
			replaced = true;
		var scrollTop = txtarea.scrollTop;
		var theSelection = (txtarea.value).substring(startPos, endPos);
	}
	
	if (theSelection == "") {

		if(!(lastVal = GetCookie("CharDefaultValue-"+ ucharnr))) lastVal ="0";
		theSelection= parseInt(lastVal)+parseInt(uchardefault.substr(1));
		theSelection= theSelection.toString();
	}
 
	SetCookie("CharDefaultValue-"+ ucharnr,theSelection);
	insertTags(uchar,ucharend,theSelection);
 }
/* </pre>
===chooseCharSubset===
<pre> */

 // CharSubset-Auswahl
 function chooseCharSubset(ss) {
    s = parseInt( ss );
    if ( isNaN(s) ) s = 0;
	if (SpecCharsAccesskeys.length==0) {
		if (is_opera) SpecCharsAccesskeys = new Array("!","\"","§","$","%","&","/","(",")","=");
		else SpecCharsAccesskeys = new Array("1","2","3","4","5","6","7","8","9","0","!","\"","§","$","%","&","/","(",")","=");
	}
	if (s>=0) {
		var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
		for (var i = 0; i < l.length ; i++) {
			if (i==s) {
				l[i].style.display = 'inline';  
				SetArrayAccessKeys(l[i].getElementsByTagName('a'),SpecCharsAccesskeys);
			} else l[i].style.display =  'none';
		}
	  SetCookie('CharSubset', s);
	} 
 }

/* </pre>

===SetArrayAccessKeys===
<pre> */

// Ein Array von Accesskeys an ein Array von Elementen
 function SetArrayAccessKeys(elements, keys) {
 	for (var i =0; i < elements.length;i++) {
		if (i < keys.length) {
			elements[i].setAttribute("accessKey",keys[i]);
			elements[i].setAttribute("title","alt-"+keys[i]);
		} else {
			elements[i].setAttribute("accessKey","");
			elements[i].setAttribute("title","");
		}
	}
 }





/* </pre>
===AddMyChars===
<pre> */

 //Vorfunktion für eigene Sonderzeichenleiste, nutzt globale Variablen
 function AddMyChars() {
  if (MyChar[0]) AddMyCharsDo(MyChar, MyCharEnd, MyCharText, MyCharDefault);
 }

 //Eigene Sonderzeichenliste
 function AddMyCharsDo(thechar, thecharend, thechartext, thechardefault) {
	var specialcharslist = document.getElementById('specialchars');
 
	var addtext = "<p class=\"specialbasic\" id=\"Eigene\" title=\"Eigene\" style=\"display: none;\">\n\r";
	addtext += "Eigene Zeichen:\n\r";
	addtext += "<font style=\"text-decoration: none;\" face=\"Arial Unicode MS,Lucida Sans Unicode,MS Mincho,Arial,sans-serif\">";
  
	for (var i = 0; i < thechar.length; i++) {
		if (!thecharend[i]) thecharend[i]="";
		if (!thechardefault[i]) thechardefault[i]="";
		jsfunction ="insertTags('" + thechar[i] + "','" + thecharend[i] + "','" +  thechardefault[i] +"')";
		//Autoinkrement-Funktion einsetzen
		if (thechardefault[i].charAt(0) == "+" && !isNaN(parseInt(thechardefault[i].substr(1)))) {
			jsfunction = "insertTagsValue('" + thechar[i] + "','" + thecharend[i] + "','" +  thechardefault[i] + "','" + i +"')";
		}
		if (!thechartext[i]) thechartext[i] = thechar[i]+" "+thecharend[i];
		addtext += "<a href=\"javascript:" +jsfunction +"\">" + thechartext[i] + "</a>\n\r";
	}
	addtext += "</font></p>";
	specialcharslist.innerHTML = addtext+specialcharslist.innerHTML;
 }





/* </pre>
===addCharSubsetMenu===
<pre> */

/*
DANGER-MOUSE NOTE: This code is <<<VERY>>> sensitive to [[MediaWiki:Edittools]] changes!  Make sure there are no <span>s only <div>s.  Make sure there is no <p></p> at top!
*/

 SpecCharsAccesskeys = new Array();

// Combined cross-browser features of [[:zh:MediaWiki:Monobook.js]]...
function addCharSubsetMenu() {
         var SpecCharsMove = true;
	 var edittools = document.getElementById('editpage-specialchars');
	 if (edittools) {
		 var name;
		 var menu=document.createElement("select");
		 menu.style.display="inline";
		 var line = edittools.getElementsByTagName('p');
		 for (var i = 0; i < line.length ; i++) {
			if (line[i].className == "specialbasic" || line[i].className == "speciallang") {
			 if (line[i].title) name=line[i].title;
			 else name = line[i].id;
			 menu.options[menu.options.length]=new Option(name);
			}
		 }

		 menu.onchange=function() {chooseCharSubset(this.selectedIndex);} ;
		if (SpecCharsMove) {
		 edittools.insertBefore(menu,edittools.firstChild);
		} else {
		 edittools.insertAfter(menu,edittools.firstChild);
		}

		var stdsubset = 0;
		if (GetCookie ("CharSubset")) stdsubset = parseInt( GetCookie ("CharSubset") );
		if ( isNaN(stdsubset) ) stdsubset = 0;
		menu.options[stdsubset].selected = true;
		chooseCharSubset(stdsubset);

	//Gleicher Tabindex für alle Elemente der Toolbar
	var charlinks = document.getElementById('toolbar').getElementsByTagName('a');
	for (var i=0; i < charlinks.length; i++) {
		charlinks[i].setAttribute("tabindex",8);
	}
      } //end if (edittools)
 }

/* </pre>

===elementMoveto===
<pre> */

 //from [[:zh:MediaWiki:Monobook.js]]
 function elementMoveto(node, refNode, pos) {
	 if(node && refNode) {
		 var parent = refNode.parentNode;
		 if (pos && pos == 'after') refNode=refNode.nextSibling;
		 try {
		     parent.insertBefore(node, refNode);
		 } catch (DOMException) {};
	 }
 }



/* </pre>
===fixToolbar===
<pre> */

 //from [[:zh:MediaWiki:Monobook.js]]
 function fixToolbar(){
	 var wpEditToolbar = document.getElementById("toolbar");
	 var dropdownListEditTools = document.getElementById("dropdownListEditTools");
	 elementMoveto(dropdownListEditTools , wpEditToolbar , 'after' );
	 if (dropdownListEditTools) dropdownListEditTools.style.display="block";
	 var editspecialchars = document.getElementById("editpage-specialchars");
	 elementMoveto( editspecialchars, wpEditToolbar, 'after' ); 	 
 }




/* </pre>
===customizeWikipedia===
<pre>  */

 // Menü-Einfügung
 function customizeWikipedia() {
	AddMyChars();
	addCharSubsetMenu();
        fixToolbar();
 }

 
 addLoadEvent(customizeWikipedia);
 addLoadEvent(ProofReading);

 
 // END import Onlyifediting-functions
 // ============================================================

addLoadEvent( LinkFA );
addLoadEvent( createNavigationBarToggleButton );
addLoadEvent( interwikiExtra );
addLoadEvent( BilingualLink );
addLoadEvent( PageNumbers );
addLoadEvent( Annotations );
addLoadEvent( LineBreaks );
addLoadEvent( ProofReadLink );