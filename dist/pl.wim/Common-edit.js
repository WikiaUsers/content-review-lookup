//
// W tym pliku znajdują się skrypty, które są używane tylko na stronach edycji
//

/*
== Informacja o nie wpisaniu opisu zmian ==
; Autorzy (Authors): [[:pl:User:Adziura|Adam Dziura]], [[:pl:User:Nux|Maciej Jaros]]
; Wyłączenie (disable): window.NoSummaryWarningDone = true;
<pre>
*/

addOnloadHook(function()
{
	if (window.NoSummaryWarningDone)
		return;

	var button = document.getElementById('wpSave');
	if (button)
		button.onclick = FormValidation
	;
});
	
function FormValidation()
{
	var input_el = document.getElementById('wpSummary');
	var summary = input_el.value;
	
	// user has been warned
	if (input_el.warningSet)
		return true;

	// empty or nothing but section comment
	if (summary == '' || summary.substring(summary.indexOf('*/'))=='*/ ')
	{
		// ignore redirects - there is autosummary
		var wpTextbox1 = document.getElementById('wpTextbox1');
		if (wpTextbox1.value.match(/^#(?:REDIRECT|PRZEKIERUJ|TAM|PATRZ)/i))
			return true;
		
		// do not check titles of sections on non-talk pages
		if (wgNamespaceNumber % 2 == 0 && input_el.form.wpSection.value == 'new') 
			return true;

		// set warning, do not submit form
		input_el.warningSet = true;
		input_el.className = 'warning';
		document.getElementById('wpSummaryLabel').className = 'warning';
		return false;
	}	
	return true;
}

/*
</pre>

== Automatyczne opisy zmian ==
; Autor (Author): [[:pl:User:Adziura|Adam Dziura]]
; Poprawki (Fixes): [[:pl:User:Nux|Maciej Jaros]]
<pre>
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
		if (el.innerHTML.indexOf('opis zmian')==-1)
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
		przyciskiDodaj(opisBtns, 'interwiki', 'dodajOpis("[[Pomoc:Interwiki|interwiki]]")', kl,
			'Poprawiono/dodano linki do innych wersji Wikipedii');
		przyciskiDodaj(opisBtns, 'kat.', 'dodajOpis("kat.")', kl,
			'Poprawiono/dodano kategorię');
		przyciskiDodaj(opisBtns, 'wikizacja', 'dodajOpis("[[Wikipedia:Terminologia#W|wikizacja]]")', kl,
			'Wikizacja artykułu (dodanie linków wewnętrznych, podział na sekcje itp.)');
		przyciskiDodaj(opisBtns, 'przypisy', 'dodajOpis("źródła/przypisy")', kl,
			'Dodanie/poprawienie przypisów lub źródeł');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'disamb', 'dodajOpis("disambig (ujednoznacznienie)")', kl,
			'Poprawiono/dodano stronę ujednoznaczniającą');
		przyciskiDodaj(opisBtns, 'grafika', 'dodajOpis("grafika")', kl,
			'Poprawiono/dodano grafikę');
		przyciskiDodaj(opisBtns, 'szablon', 'dodajOpis("szablon")', kl,
			'Poprawiono/dodano szablon');
		przyciskiDodaj(opisBtns, 'infobox', 'dodajOpis("infobox")', kl,
			'Poprawiono/uzupełniono/dodano infobox');

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

		przyciskiDodaj(opisBtns, 'npa', 'dodajOpis("[[WP:NPA|npa]]")', kl,
			'Zgłoszono artykuł jako podejrzany o naruszenie praw autorskich');
		przyciskiDodaj(opisBtns, 'wer', 'dodajOpis("[[WP:WER|Potrzebne źródło]]")', kl,
			'Potrzebne wiarygodne źródło');
		przyciskiDodaj(opisBtns, 'dnu', 'dodajOpis("[[Wikipedia:Poczekalnia DNU|Poczekalnia DNU]]")', kl,
			'Zgłoszono artykuł do usunięcia');
		przyciskiDodaj(opisBtns, 'ek', 'dodajOpis("[[Kategoria:Ekspresowe kasowanko|ek]]")', kl,
			'Zgłoszono artykuł do ekspresowego (s)kasowania');
		przyciskiDodaj(opisBtns, 'rev.', 'dodajOpis("przywrócenie poprzedniej wersji")', kl,
			'przywrócenie poprzedniej wersji');
		przyciskiDodaj(opisBtns, 'integracja', 'dodajOpis("integracja (autorzy: [[Wikipedysta:]], [[Wikipedysta:]]...")', kl,
			'Integracja artykułu z innym - podaj autorów wklejanego tekstu!');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// insze do dyskusji i głosowań
		przyciskiDodaj(opisBtns, 'głos', 'dodajOpis("głos")', kl,
			'Oddano głos');
		przyciskiDodaj(opisBtns, 'komentarz', 'dodajOpis("komentarz")', kl,
			'Dodano komentarz w dyskusji lub do głosu');

		// odstęp przed własnymi
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
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

var disableEditButtons = false;

addOnloadHook(function() {
	if (! disableEditButtons)
		importScript('MediaWiki:Gadget-edit-buttons.js');
});