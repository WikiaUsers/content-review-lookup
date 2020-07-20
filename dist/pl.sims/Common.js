// IMPORT
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',			// IP zamiast "Użytkownik Wikii"
		'MediaWiki:Common.js/KiwiIRC.js',		// Bramka KiwiIRC
		'MediaWiki:Common.js/Facebook.js',		// Facebook
		'w:c:dev:ReferencePopups/code.js'       // Wyskakujące przypisy
    ]
});

// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Przycisk "Wkład" w menu personalnym
function UserContribsMenuItem() {
	$('.wds-global-navigation__user-menu .wds-global-navigation__dropdown-content ul.wds-list li:first-child').after('<li><a href="/wiki/Specjalna:Wkład/'+ encodeURIComponent (wgUserName) +'" class="wds-global-navigation__dropdown-link">Wkład</a></li>');
}
addOnloadHook(UserContribsMenuItem);
 
// AUTOMATYCZNE OPISY ZMIAN
/*   
    Autor (Author): [[wikipedia:pl:User:Adziura|Adam Dziura]]
   Poprawki (Fixes): [[wikipedia:pl:User:Nux|Maciej Jaros]] 
*/
// <nowiki> - ze względu na występowanie "{{EK}}"
function przyciskiOpis()
{
	// stop before starting
	if (window.przyciskiOpisDone)
		return;
 
	// sprawdzenie, czy to jest pole edycji z opisem zmian (nie jest takie jako nagłówek)
	var el = document.getElementById('wpSummaryLabel');
	if (el)
	{
		if (el.innerHTML.indexOf('Opis zmian')==-1)
			return;	// stop
	}
	else {
		return;	// stop
	}

	// dodanie elementu okalającego przyciski bezpośrednio za opisem zmian
	var el = document.getElementById('wpSummary').nextSibling;
	var opisBtns = document.createElement('span');
	opisBtns.id = 'userSummaryButtons'
	el.parentNode.insertBefore(document.createElement('br'), el)
	el.parentNode.insertBefore(opisBtns, el)

	// dodawanie przycisków
	var kl = '';
	if (opisBtns)
	{
		// opisBtns.appendChild(document.createTextNode(' ')); // odstęp
		przyciskiDodaj(opisBtns, 'drobne',       'dodajOpis("drobne")',       kl, 'Wykonano drobne zmiany');
		przyciskiDodaj(opisBtns, 'rewert',       'dodajOpis("rewert")',       kl, 'Przywrócono poprzednią wersję artykułu');
		przyciskiDodaj(opisBtns, 'remont',       'dodajOpis("remont")',       kl, 'Dokonano remontu w artykule');
		przyciskiDodaj(opisBtns, 'porządki',     'dodajOpis("porządki")',     kl, 'Uporządkowano artykuł');
		przyciskiDodaj(opisBtns, 'naprawa kodu', 'dodajOpis("naprawa kodu")', kl, 'Naprawiono kod strony');
		przyciskiDodaj(opisBtns, '{{EK}}',       'dodajOpis("+{{EK}}")',      kl, 'Oznaczono jako stronę do kasacji poprzez szablon {{EK}}');

		opisBtns.appendChild(document.createElement('br'));
 
		przyciskiDodaj(opisBtns, '+infobox',     'dodajOpis("+infobox")',       kl, 'Dodano infobox');
		przyciskiDodaj(opisBtns, '+grafika',     'dodajOpis("+grafika")',       kl, 'Dodano grafikę');
		przyciskiDodaj(opisBtns, '+galeria',     'dodajOpis("+galeria")',       kl, 'Dodano galerię');
		przyciskiDodaj(opisBtns, '+ciekawostki', 'dodajOpis("+ciekawostki")',   kl, 'Dodano ciekawostki');
		przyciskiDodaj(opisBtns, '+kategoria',   'dodajOpis("+kategoria/e")',   kl, 'Dodano kategorię/kategorie');
 
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
 
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
		nowyBtn.className = pKlasa;
	nowyBtn.onclick = new Function(pAkcja);
 
	// dodanie przycisku
	elUserBtns.appendChild(nowyBtn);
}
 
var clickedMinor = false;
function onMinorEditClick() {
	if (this.checked && !clickedMinor) {
		dodajOpis("drobne");
		clickedMinor = true;
	}
}
 
function dodajOpis(opis) {
	var wpS = document.editform.wpSummary;
	if (wpS.value != '' && wpS.value.charAt(wpS.value.length-2) != '/') {
		wpS.value += ', ' + opis
	}
	else {
		wpS.value += opis
	}
}
 
addOnloadHook(przyciskiOpis);
// </nowiki>

// {{Era}}
// Autor: User:Mirar
 
function addTitleGames() {
   var titleDiv = document.getElementById("title-games");
   if (titleDiv != null && titleDiv != undefined)
   {
      var content = document.getElementById('article');
      if (!content) {
         var content = document.getElementById('content');
      }
 
      if (content) {
         var hs = content.getElementsByTagName('h1');
         var firstHeading;
         for (var i = 0; i < hs.length; i++)
         {
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
               firstHeading=hs[i];
               break;
            }
         }
 
         var cloneNode = titleDiv.cloneNode(true);
         firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
         cloneNode.style.display = "block";
         cloneNode.style.visibility = "visible";
         if (skin != "monaco") {
            cloneNode.style.marginTop = "-11px";
         }
      }
   } 
}
 
addOnloadHook( addTitleGames );