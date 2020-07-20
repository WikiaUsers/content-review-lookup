/* 
==== Вставка стандартных описаний изменений ====
Из польской Википедии.
* Autor (Author): [[Wikipedia:pl:User:Adziura|Adam Dziura]]
* Poprawki (Fixes): [[Wikipedia:pl:User:Nux|Maciej Jaros]]
* Localized by: [[Wikipedia:ru:User:.:Ajvol:.]]
* Proofed by: [[Wikipedia:ru:User:ACrush]]
* Spoiled by: [[Wikipedia:ru:User:CodeMonk]]
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
		if (el.innerHTML.indexOf('ие изменений')==-1)
			return	// stop
		;
		
	}
	else
	{
		return;	// stop
	}
	
	//
	// dodanie elementu okalającego przyciski bezpośrednio za opisem zmian
      // создание контейнера с кнопками стандартных описаний изменений
	var el = document.getElementById('wpSummary').nextSibling;
	var opisBtns = document.createElement('span');
	opisBtns.id = 'userSummaryButtonsA'
	el.parentNode.insertBefore(document.createElement('br'), el)
	el.parentNode.insertBefore(opisBtns, el)
	
	//
	// dodawanie przycisków
      // добавление 
	//var kl = 'userButtonsStyle';
	var kl = '';	// klasa jest niepotrzebna (wszystkie <a> w #userSummaryButtonsA ustawione poprzez CSS)
	if (opisBtns)
	{
		// drobne różne
                przyciskiDodaj(opisBtns, 'викиф.', 'dodajOpis("викификация")', kl,
			'Произведена викификация');
		przyciskiDodaj(opisBtns, 'оформл.', 'dodajOpis("оформление")', kl,
			'Улучшено оформление');
		przyciskiDodaj(opisBtns, 'стиль', 'dodajOpis("стилевые правки")', kl,
			'Поправлен стиль изложения');
		przyciskiDodaj(opisBtns, 'орфогр.', 'dodajOpis("орфография")', kl,
			'Поправлена орфография и пунктуация');
		przyciskiDodaj(opisBtns, 'интервики', 'dodajOpis("интервики")', kl,
			'Исправлены межъязыковые ссылки (интервики)');
		przyciskiDodaj(opisBtns, 'кат.', 'dodajOpis("категория")', kl,
			'Исправлена категоризация');
		przyciskiDodaj(opisBtns, 'шаб.', 'dodajOpis("шаблон")', kl,
			'Добавлен / изменён шаблон');
		przyciskiDodaj(opisBtns, 'к удал.', 'dodajOpis("к удалению")', kl,
			'Страница предложена к удалению');
		przyciskiDodaj(opisBtns, 'доп.', 'dodajOpis("дополнение")', kl,
			'Добавлены новые сведения');
		przyciskiDodaj(opisBtns, 'иллюстрация', 'dodajOpis("иллюстрация")', kl,
			'Размещена иллюстрация');
		przyciskiDodaj(opisBtns, 'обнов.', 'dodajOpis("обновление данных")', kl,
			'Обновлены устаревшие данные');
		przyciskiDodaj(opisBtns, 'откат', 'dodajOpis("откат")', kl,
			'Предыдущее изменение отменено (откат)');
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
function przyciskiDodaj(elUserBtns, pTekst, pAkcja, pKlasa, pOpis) {
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

function dodajOpis(opis) {
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

/* 
</pre>

==== Викификатор ====
<pre>
*/
 document.write('<script type="text/javascript" src="' 
              + 'http://ru.lotr.wikia.com/index.php?title=MediaWiki:Wikificator.js' 
              + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');

/* 
</pre>

==== Дополнительные кнопки на панель инструментов ====
<pre>
*/
//============================================================
// Extra toolbar options
//============================================================
//********WRITTEN BY User:MarkS********
//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.

// This is based on the original code on Wikipedia:Tools/Editing tools

/* а оно надо?

function InsertButtonsToToolBar()
{
//Перенаправление
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png",
    "speedTip": "Перенаправление",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "название страницы"}
//Категория
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikisource/ru/a/a6/Button-cat.png",
    "speedTip": "Категория",
    "tagOpen": "[[Категория:",
    "tagClose": "]]\n",
    "sampleText": "название категории"}
//Комментарий
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
    "speedTip": "Комментарий",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Комментарий"}
//Цитата
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
    "speedTip": "Развёрнутая цитата",
    "tagOpen": "<blockquote>\n",
    "tagClose": "\n</blockquote>",
    "sampleText": "Развёрнутая цитата одним абзацем"}
}

addOnloadHook( InsertButtonsToToolBar );

*/


 var image2 = document.createElement("img");
 image2.width = 69;
 image2.height = 22;
 image2.src = 'https://images.wikia.nocookie.net/lotr/ru/images//d/d1/Button-wikifikator.png';
 image2.border = 0;
 image2.alt = 'Викификатор';
 image2.title = 'Викификатор';
 image2.style.cursor = "pointer";
 image2.onclick = function() {
   Wikify();
   return false;
 }
 toolbar.appendChild(image2);
}

addOnloadHook(marque_tab);

// END OF Onlyifediting.js
// </pre>