/* Any JavaScript here will be loaded for all users on every page load. */
 


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = '  ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' sekund(y) ';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minut(y) ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' godzin(y) ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' dni ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

/*
--------------------------------------
DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA
--------------------------------------
*/

 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
     "speedTip": "Wyrównaj tekst do lewej",
     "tagOpen": "<left>",
     "tagClose": "</left>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
     "speedTip": "Wyrównaj tekst do prawej",
     "tagOpen": "<right>",
     "tagClose": "</right>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Wyśrodkuj tekst",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
     "speedTip": "Wyjustuj tekst",
     "tagOpen": "<p align=justify>",
     "tagClose": "</p>",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/89/Button_bigger.png",
     "speedTip": "Powiększ czcionkę",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Powiększony tekst"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0d/Button_smaller.png",
     "speedTip": "Pomniejsz czcionkę",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Pomniejszony tekst"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png",
     "speedTip": "Przekreśl tekst",
     "tagOpen": "<strike>",
     "tagClose": "</"+ "strike>",
     "sampleText": "Skreślony tekst"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Podkreśl tekst",
     "tagOpen": "<u>",
     "tagClose": "</"+ "u>",
     "sampleText": "Podkreślony tekst"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/8d/Button_rouge.png",
     "speedTip": "Zmień kolor tekstu",
     "tagOpen": "<font color=DarkOrchid>",
     "tagClose": "</font>",
     "sampleText": "Kolorowy tekst (zmień kod koloru lub zapisz jego angielską nazwę) "};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
     "speedTip": "Wstaw indeks górny",
     "tagOpen": "<sup>",
     "tagClose": "</"+ "sup>",
     "sampleText": "Indeks górny"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
     "speedTip": "Wstaw indeks dolny",
     "tagOpen": "<sub>",
     "tagClose": "</"+ "sub>",
     "sampleText": "Indeks dolny"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
     "speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
     "tagOpen": "<!--",
     "tagClose": "-->",
     "sampleText": "Treść komentarza"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Dodaj kod",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Zakodowany tekst"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Wstaw szablon",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nazwa szablonu"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
     "speedTip": "Wstaw szaro-zieloną tabelę",
     "tagOpen": '{| {' + '{Tabelka|alineacion=col1izq col2cen col3der|}}\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "!| Nagłówek 1\n!| Nagłówek 2\n!| Nagłówek 3\n|-\n|| komórka 1, kolumna 1\n|| komórka 1, kolumna 2\n|| komórka 1, kolumna 3\n|-\n|| komórka 2, kolumna 1\n|| komórka 2, kolumna 2\n|| komórka 2, kolumna 3"};
   
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Zalinkuj użytkownika",
     "tagOpen": "[[Użytkownik:",
     "tagClose": "|Nick_użytkownika]]",
     "sampleText": "Nick_użytkownika"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
     "speedTip": "Dodaj szablon ujednoznaczniający",
     "tagOpen": "{{Strona ujednoznaczniająca",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
     "speedTip": "Zgłoś usunięcie tego artykułu",
     "tagOpen": "{{EK",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
     "speedTip": "Dodaj kategorię",
     "tagOpen": "[[Kategoria:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nazwa kategorii"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Button_star_better.png",
     "speedTip": "Oznacz ten artykuł jako wzorowy",
     "tagOpen": "{{Wzorowy artykuł",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
     "speedTip": "Wstaw galerię zdjęć",
     "tagOpen": "\n<gallery spacing=small columns=3 position=center widths=206 orientation=landscape captionalign=center>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Plik:Przykład.jpg|Podpis1\nPlik:Przykład.jpg|Podpis2\nPlik:Przykład.jpg|Podpis3\n<!-- Możesz zmienić sposób przycinania grafik zmieniając orientation=landscape na orientation=square, orientation=portrait lub na orientation=none. -->"};

 }

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              User:Porter21 (fallout.wikia.com)                   ### */
/* ######################################################################## */
 
var indicator = 'https://images.wikia.nocookie.net/dragonage/images/c/c5/AJAX_icon.gif';
var ajaxPages = new Array("Specjalna:Ostatnie_zmiany", "Specjalna:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-odświeżanie';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Kliknij, by lista automatycznie się aktualizowała';
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;
 
function setCookie(c_name,value,expiredays) {
   var exdate=new Date()
   exdate.setDate(exdate.getDate()+expiredays)
   document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
 
function getCookie(c_name) {
   if (document.cookie.length>0) {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1) { 
         c_start=c_start + c_name.length+1 
         c_end=document.cookie.indexOf(";",c_start)
         if (c_end==-1) c_end=document.cookie.length
         return unescape(document.cookie.substring(c_start,c_end))
      } 
   }
   return ""
}
 
function preloadAJAXRL() {
   ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
   appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader > h1"):$(".firstHeading");
   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
   $("#ajaxLoadProgress").ajaxSend(function (event, xhr, settings){
      if (location.href == settings.url) $(this).show();
   }).ajaxComplete (function (event, xhr, settings){
      if (location.href == settings.url) $(this).hide();
   });
   $("#ajaxToggle").click(toggleAjaxReload);
   $("#ajaxToggle").attr("checked", ajaxRLCookie);
   if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
   if ($("#ajaxToggle").attr("checked") == true) {
      setCookie("ajaxload-"+wgPageName, "on", 30);
      doRefresh = true;
      loadPageData();
   } else {
      setCookie("ajaxload-"+wgPageName, "off", 30);
      doRefresh = false;
      clearTimeout(ajaxTimer);
   }
}
 
function loadPageData() {
   cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
   $(cC).load(location.href + " " + cC + " > *", function (data) { 
      if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
   });
}
addOnloadHook(function(){ for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL() } } );

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
		przyciskiDodaj(opisBtns, 'linki-zew.', 'dodajOpis("linki zewnętrzne")', kl,
			'Poprawiono/dodano linki zewnętrzne');
		przyciskiDodaj(opisBtns, 'linki-popr.', 'dodajOpis("poprawa linków")', kl,
			'Poprawiono linki zewnętrzne/wewnętrzne');
		przyciskiDodaj(opisBtns, 'kategoria', 'dodajOpis("kat.")', kl,
			'Poprawiono/dodano kategorię');
		przyciskiDodaj(opisBtns, 'przypisy', 'dodajOpis("źródła/przypisy")', kl,
			'Dodanie/poprawienie przypisów lub źródeł');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'zalążek', 'dodajOpis("rozbudowa")', kl,
			'Ten artykuł to stub');
		przyciskiDodaj(opisBtns, 'ujednoznacznienie', 'dodajOpis("disambig (ujednoznacznienie)")', kl,
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
		przyciskiDodaj(opisBtns, 'licencja ', 'dodajOpis("dodano/zmieniono licencję ")', kl,
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

/* 6. Przesunięcie linków [ edytuj ] przy sekcjach
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
			span.style.cssText = 'float:none; font-size:x-small; font-weight: normal;';
			span.parentNode.appendChild(document.createTextNode(" "));
			span.parentNode.appendChild(span);
		}
	}
 } catch (e) { /* błąd */ }
});

/*
==== 7. Dodanie linka [edytuj] dla sekcji nagłówkowej ====
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
	// Styling
	//
	div.style.cssText = 'padding:.7em 0 0 1.0em; float:right; font-size:x-small;';
 
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