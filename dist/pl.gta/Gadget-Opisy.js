/*
  Z Wikipedii, źródło: [[wp:MediaWiki:Gadget-edit-summaries.js]]. Autorzy są wymienieni tamże.

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
		przyciskiDodaj(opisBtns, 'gramatyka', 'dodajOpis("gramatyka")', kl,
			'Poprawiono błędy/nieścisłości gramatyczne.');
		przyciskiDodaj(opisBtns, 'interpunkcja', 'dodajOpis("interpunkcja")', kl,
			'Poprawiono interpunkcję.');
		przyciskiDodaj(opisBtns, 'kod strony', 'dodajOpis("kod strony")', kl,
			'Poprawiono kod strony.');
		przyciskiDodaj(opisBtns, 'literówki', 'dodajOpis("literówki")', kl,
			'Poprawiono literówkę/literówki.');
		przyciskiDodaj(opisBtns, 'ortografia', 'dodajOpis("ortografia")', kl,
			'Poprawiono błąd ortograficzny/błędy ortograficzne.');
		przyciskiDodaj(opisBtns, 'typografia', 'dodajOpis("typografia")', kl,
			'Poprawiono typografię.');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		przyciskiDodaj(opisBtns, '+wstęp', 'dodajOpis("+wstęp")', kl,
			'Dodano wstęp.');
		przyciskiDodaj(opisBtns, '+opis', 'dodajOpis("+opis")', kl,
			'Dodano opis.');
		przyciskiDodaj(opisBtns, '+dod. informacje', 'dodajOpis("+dodatkowe informacje")', kl,
			'Dodano dodatkowe iformacje.');
		przyciskiDodaj(opisBtns, '+infobox', 'dodajOpis("+infobox")', kl,
			'Dodano infoboks.');
		przyciskiDodaj(opisBtns, '+obrazek', 'dodajOpis("+obrazek")', kl,
			'Dodano obrazek.');
		przyciskiDodaj(opisBtns, '+galeria', 'dodajOpis("+galeria")', kl,
			'Dodano galerię.');
		przyciskiDodaj(opisBtns, '+ciekawostki', 'dodajOpis("+ciekawostki")', kl,
			'Dodano ciekawostkę/ciekawostki.');
		przyciskiDodaj(opisBtns, '+źródła', 'dodajOpis("+źródła")', kl,
			'Dodano przypisy.');
		przyciskiDodaj(opisBtns, '+kat.', 'dodajOpis("+kat.")', kl,
			'Dodano kategorię/kategorie.');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'rewert', 'dodajOpis("rewert")', kl,
			'Wycofano edycję.');
		przyciskiDodaj(opisBtns, 'do usunięcia', 'dodajOpis("do usunięcia")', kl,
			'Oznaczono jako stronę do usunięcia.');

		if(useVE !== true)
			opisBtns.appendChild(document.createElement('br'));

		// drobne inne
		przyciskiDodaj(opisBtns, 'dr. meryt.', 'dodajOpis("drobne merytoryczne")', kl,
			'Drobne zmiany merytoryczne');
		przyciskiDodaj(opisBtns, 'dr. red.', 'dodajOpis("drobne redakcyjne")', kl,
			'Drobne zmiany redakcyjne');
		przyciskiDodaj(opisBtns, 'dr. tech.', 'dodajOpis("drobne techniczne")', kl,
			'Drobne zmiany techniczne');

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