 // <pre>

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
 
		przyciskiDodaj(opisBtns, 'grafika', 'dodajOpis("grafika")', kl,
			'Poprawiono/dodano grafikę');
		przyciskiDodaj(opisBtns, 'szablon', 'dodajOpis("szablon")', kl,
			'Poprawiono/dodano szablon');
 
		opisBtns.appendChild(document.createElement('br'));
 
		// drobne inne
		przyciskiDodaj(opisBtns, 'dr.meryt.', 'dodajOpis("drobne merytoryczne")', kl,
			'Drobne zmiany merytoryczne');
		przyciskiDodaj(opisBtns, 'dr.red.', 'dodajOpis("drobne redakcyjne")', kl,
			'Drobne zmiany redakcyjne');
		przyciskiDodaj(opisBtns, 'dr.tech.', 'dodajOpis("drobne techniczne")', kl,
			'Drobne zmiany techniczne');
 
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
 
		przyciskiDodaj(opisBtns, 'meryt.', 'dodajOpis("merytoryczne")', kl,
			'Zmiany merytoryczne');
		przyciskiDodaj(opisBtns, 'red.', 'dodajOpis("redakcyjne")', kl,
			'Zmiany redakcyjne');
		przyciskiDodaj(opisBtns, 'tech.', 'dodajOpis("techniczne")', kl,
			'Zmiany techniczne');
 
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
		// do użytkownika i około administracyjne
		przyciskiDodaj(opisBtns, 'witaj', 'dodajOpis("witaj")', kl,
			'Dodano powitanie dla użytkownika');
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

// </pre>