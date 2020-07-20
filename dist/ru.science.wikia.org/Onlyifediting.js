/* 
==== Вставка стандартных описаний изменений ====
Из польской Википедии.
* Autor (Author): [[:pl:User:Adziura|Adam Dziura]]
* Poprawki (Fixes): [[:pl:User:Nux|Maciej Jaros]]
* Localized by: [[User:Edward Chernenko]]
* Proofed by: [[User:Afinogenoff ]]
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

==== Дополнительные кнопки на панель инструментов ====
<pre>
*/
//============================================================
// Extra toolbar options
//============================================================
//********WRITTEN BY User:MarkS********
//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.

// This is based on the original code on Wikipedia:Tools/Editing tools

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

//============================================================
// Table generator
//============================================================

/**
 *
 * English: Generate an array using Mediawiki syntax
 *
 * @author: fr:user:dake (language conversion and  new options added by en:user:Voice of All)
 * @version: 0.1
 */
 
function generateTableau(nbCol, nbRow, border, styleHeader, styleLine, exfield, align, padding)
{
        var code = "\n";

        if (padding==false) padding=0;
        else if (padding==true) padding=1;

        code += '{| align="' + align + '" class="standard"\n';
        code += '|+\n';

        for (var i=1;i<nbCol+1;i++) code += '! |Столбец ' + i + '\n';

        var items = 0;
        for (var j=0;j<nbRow;j++) {
                code += '|-----\n'
               
                for (var i=0;i<nbCol;i++) code += '| ячейка\n';
        }
        
        code += '|+\n';
        code += '|}\n';
        insertTags('','', code); 
}

/**
 *
 * English: Open a popup with parameters to generate an array. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
 
function popupTable()
{
  var popup = window.open('','name','height=180,width=300,scrollbars=yes');
  
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = 0; '
  javaCode += 'var styleHeader = false; '
  javaCode += 'var styleLine = false; '
  javaCode += 'var exfield = false; '
  javaCode += 'var align = document.paramForm.inputAlign.value; '
  javaCode += 'var padding = false; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine,exfield,align,padding); '
  javaCode += "alert('Таблица создана!'); "
  javaCode += 'window.close(); '
  javaCode += '}<\/script>';
  
  popup.document.write('<html><head><title>Создание таблицы</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>Введите параметры таблицы: </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Выравнивание: <input type="text" name="inputAlign" value="center" ><p>');
  popup.document.write('Количество строк: <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Количество столбцов: <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()"> Вставить таблицу</a>     |');
  popup.document.write('    <a href="javascript:self.close()">Отмена (закрыть окно)</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}

//Ressemble à la fonction de /skins-1.5/commons/wikibits.js pour insérer un autre lien que insertTags
function marque_tab()
{
 var toolbar = document.getElementById('toolbar');
 if (!toolbar) return false;
 
 var textbox = document.getElementById('wpTextbox1');
 if (!textbox) return false;
 
 if (!document.selection && textbox.selectionStart == null)
 return false;
 
 var image = document.createElement("img");
 image.width = 23;
 image.height = 22;
 image.src = 'http://upload.wikimedia.org/wikipedia/commons/0/04/Button_array.png';
 image.border = 0;
 image.alt = 'Таблица';
 image.title = 'Создать таблицу';
 image.style.cursor = "pointer";
 image.onclick = function() {
   popupTable();
   return false;
 }
 toolbar.appendChild(image);

 var image2 = document.createElement("img");
 image2.width = 69;
 image2.height = 22;
 image2.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
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