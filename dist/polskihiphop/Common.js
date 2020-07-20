/* <pre> */
/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* 1. Automatyczne opisy zmian */
/* Autor (Author): [[wikipedia:pl:User:Adziura|Adam Dziura]] */
/* Poprawki (Fixes): [[wikipedia:pl:User:Nux|Maciej Jaros]] */
/* Zmiana treści przycisków: [[User:Maciek...000|Maciek...000]] */

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
		// ważniejsze
                przyciskiDodaj(opisBtns, 'drobne', 'dodajOpis("dr.")', kl,
                        'Drobne zmiany');
		przyciskiDodaj(opisBtns, 'poprawki', 'dodajOpis("poprawki")', kl,
			'Różne poprawki');
                przyciskiDodaj(opisBtns, 'remont', 'dodajOpis("remont")', kl,
                        'Wykonanie remontu');
		przyciskiDodaj(opisBtns, 'rewert', 'dodajOpis("rewert")', kl,
			'Przywrócenie wcześniejszej wersji');
		przyciskiDodaj(opisBtns, 'linki', 'dodajOpis("poprawa linków")', kl,
			'Poprawa linków');
		przyciskiDodaj(opisBtns, 'naprawa kodu', 'dodajOpis("naprawa kodu")', kl,
			'Naprawa kodu strony');

		// opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// obrazki
		przyciskiDodaj(opisBtns, '+okładka', 'dodajOpis("+okładka")', kl,
			'Dodanie okładki do albumu');
		przyciskiDodaj(opisBtns, '+zdjęcie', 'dodajOpis("+zdjęcie")', kl,
			'Dodanie zdjęcia artysty');
		przyciskiDodaj(opisBtns, 'obrazek', 'dodajOpis("obrazek")', kl,
			'Dodanie/usunięcie innego obrazka');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// szablony
		przyciskiDodaj(opisBtns, 'delete', 'dodajOpis("[[:Kategoria:Strony do ekspresowego skasowania|delete]]")', kl,
			'Zgłoszenie strony do usunięcia');
		przyciskiDodaj(opisBtns, '+disamb', 'dodajOpis("dodanie szablonu Disambig")', kl,
			'Dodanie szablonu Disambig');
		przyciskiDodaj(opisBtns, 'stub', 'dodajOpis("stub (zalążek)")', kl,
			'Oznaczenie artykułu jako zalążek');
		przyciskiDodaj(opisBtns, 'szablon', 'dodajOpis("szablon")', kl,
			'Poprawa szablonu lub dodanie innego');

		opisBtns.appendChild(document.createElement('br'));

		// dodawanie/usuwanie
		przyciskiDodaj(opisBtns, '+kat', 'dodajOpis("dodanie kategorii")', kl,
			'Dodanie kategorii');
		przyciskiDodaj(opisBtns, '-kat', 'dodajOpis("usunięcie kategorii")', kl,
			'Usunięcie kategorii');
		przyciskiDodaj(opisBtns, '±kat', 'dodajOpis("zmiany w kategoryzacji")', kl,
			'Większe zmiany w kategoriach');
		przyciskiDodaj(opisBtns, '+przypisy', 'dodajOpis("dodanie przypisów")', kl,
			'Dodanie przypisów');
		przyciskiDodaj(opisBtns, '+infobox', 'dodajOpis("dodanie infoboxu")', kl,
			'Dodanie infoboxu');
		przyciskiDodaj(opisBtns, '-redir', 'dodajOpis("ominięcie przekierowania")', kl,
			'Usunięcie linku do strony przekierowującej');
		przyciskiDodaj(opisBtns, '-disamb', 'dodajOpis("ominięcie ujednoznacznienia")', kl,
			'Usunięcie linku do strony ujednoznaczniającej');
		przyciskiDodaj(opisBtns, '-redlink', 'dodajOpis("ominięcie redlinka")', kl,
			'Usunięcie linku do nieistniejącej strony');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// inne
		przyciskiDodaj(opisBtns, 'test', 'dodajOpis("test")', kl,
			'Testowanie');
		przyciskiDodaj(opisBtns, 'ostrzeżenie', 'dodajOpis("ostrzeżenie")', kl,
			'Dodanie ostrzeżenia dla użytkownika');
		przyciskiDodaj(opisBtns, 'komentarz', 'dodajOpis("komentarz")', kl,
			'Dodanie komentarza w dyskusji lub na forum');
		przyciskiDodaj(opisBtns, 'licencja', 'dodajOpis("dodanie/zmienienie licencji")', kl,
			'Dodanie/zmienienie licencji');


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

/* 2. Przesunięcie linków [ edytuj ] przy sekcjach
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
==== 3. Dodanie linka [edytuj] dla sekcji nagłówkowej ====
; Pomysł: [[wikipedia:User:Pile0nades]]
; Wykonanie: Maciej Jaros [[wikipedia:pl:User:Nux]]
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

/* </pre> */