if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0)
{

}
 if (mwCustomEditButtons) {
//Перенаправлення 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png", 
    "speedTip": "Перенаправлення", 
    "tagOpen": "#Перенаправлення [[", 
    "tagClose": "]]", 
    "sampleText": "назва сторінки"} 
//Template button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Назва шаблону"}
//Category button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3c/Button_cat_ru.png",
    "speedTip": "Категорія",
    "tagOpen": "[[Категорія:",
    "tagClose": "|{{PAGENAME}}]]",
    "sampleText": "Назва категорії"}
//Underline 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://images.uncyc.org/uk/6/64/Button_underline_ukr.png", 
    "speedTip": "Підкреслення", 
    "tagOpen": "<u>", 
    "tagClose": "</u>", 
    "sampleText": "Підкреслений текст"}
//Strike-Out Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images.uncyc.org/uk/4/45/Button_strike_ukr.png",
    "speedTip": "Закреслений текст",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": "Закреслений текст"}
//Нерозривний пробіл
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/4b/Button_nbsp.png",
    "speedTip": "Нерозривний пробіл",
    "tagOpen": "&nbsp;",
    "tagClose": "",
    "sampleText": ""}
//Line break button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
    "speedTip": "Розрив",
    "tagOpen": "<br/>",
    "tagClose": "",
    "sampleText": ""}
//Наголос
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
    "speedTip": "Наголос",
    "tagOpen": "́",
    "tagClose": "",
    "sampleText": ""}
//Цитата
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anführung.png",
    "speedTip": "Вставка цитати",
    "tagOpen": "{{Ц|",
    "tagClose": "||}}",
    "sampleText": "Цитата"}
//Superscript
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
    "speedTip": "Верхній індекс",
    "tagOpen": "<sup>",
    "tagClose": "</sup>",
    "sampleText": "Верхній індекс"}
//Subscript
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
    "speedTip": "Нижній індекс",
    "tagOpen": "<sub>",
    "tagClose": "</sub>",
    "sampleText": "Нижній індекс"}
//Left-Text Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/e/ea/Button_align_left.png",
    "speedTip": "Вирівняти по лівому краю",
    "tagOpen": "<div style='text-align: left; direction: ltr; margin-left: 1em;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Вирівняний ліворуч текст"}
//Center-Text Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/he/5/5f/Button_center.png",
    "speedTip": "Вирівняти по центру",
    "tagOpen": "<div style='text-align: center;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Вирівняний по центру текст"}
//Right-Text Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images.uncyc.org/uk/a/a5/Button_align_right.png",
    "speedTip": "Вирівняти по правому краю",
    "tagOpen": "<div style='text-align: right;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Вирівняний праворуч текст"}
//Прихований коментар
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/he/3/34/Button_hide_comment.png",
    "speedTip": "Прихований коментар",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Коментар"}
//Заголовок при наведенні курсору
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/74/Button_comment.png",
    "speedTip": "Курсорний заголовок",
    "tagOpen": "<span title=\"\"\>",
    "tagClose": "</span>",
    "sampleText": "Текст"}
//Великий текст
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_big_2.png",
    "speedTip": "Великий шрифт",
    "tagOpen": "<big>",
    "tagClose": "</big>",
    "sampleText": "Текст великим шрифтом"}
//Малий текст
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images.uncyc.org/uk/4/4c/Button_small_ukr.png",
    "speedTip": "Малий шрифт",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": "Текст малим шрифтом"}
//Gallery
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
    "speedTip": "Галерея",
    "tagOpen": "\n<gallery>\n",
    "tagClose": "\n</gallery>",
    "sampleText": "Файл:Назва_зображення1.jpg|Опис_зображення1\n\Файл:Назва_зображення2.jpg|Опис_зображення2"}
//Video
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
    "speedTip": "Відео з YouTube",
    "tagOpen": "\n<youtube>\n",
    "tagClose": "\n</youtube>",
    "sampleText": "title=\n\movie_url=http://www.youtube.com/watch?v=\n\embed_source_url=http://www.youtube.com/v/&fs=1\n\wrap=yes\n\width=400\n\height=300"}
//Reference link button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/c4/Button_ref.png",
    "speedTip": "Виноска",
    "tagOpen": "<ref>",
    "tagClose": "</ref>",
    "sampleText": "Посилання"}
//Reference button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/64/Buttonrefvs8.png",
    "speedTip": "Список виносок",
    "tagOpen": "\n== Виноски ==\n<references/>",
    "tagClose": "",
    "sampleText": ""}
//Colour
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/he/1/1e/Button_font_color.png",
    "speedTip": "Кольоровий текст",
    "tagOpen": "<span style='color: ColorName'>",
    "tagClose": "</span>",
    "sampleText": "Кольоровий текст"}
//Code
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/2/23/Button_code.png",
    "speedTip": "Вставка коду",
    "tagOpen": "<code>",
    "tagClose": "</code>",
    "sampleText": "Код"}
//Моноширинний шрифт
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Tt_icon.png",
    "speedTip": "Моноширинний шрифт",
    "tagOpen": "<tt>",
    "tagClose": "</tt>",
    "sampleText": "Моноширинний шрифт"}
//Посилання на шаблон
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/37/Button_tl_template.png",
    "speedTip": "Посилання на шаблон",
    "tagOpen": "{{Ш|",
    "tagClose": "}}",
    "sampleText": "Назва шаблону"}
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
  javaCode += "alert('Таблиця створена!'); "
  javaCode += 'window.close(); '
  javaCode += '}<\/script>';
 
  popup.document.write('<html><head><title>Створення таблиці</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>Введіть параметри таблиці: </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Вирівнювання&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="inputAlign" value="center" ><p>');
  popup.document.write('Кількість рядків&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Кількість стовпчиків: <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()">Вставити таблицю</a>     |');
  popup.document.write('    <a href="javascript:self.close()">Відмінити (зачинити вікно)</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}
 
/* Маленьке корегування кнопки підпису */
appendCSS('#mw-editbutton-signature { display: none; }');
if (mwCustomEditButtons) {
	mwCustomEditButtons.push({
		'imageFile': 'http://static.uncyc.org/skins/common/images/button_sig.png',
		'speedTip': 'Ваш підпис з часовою міткою',
		'tagOpen': '— ~~\~~',
		'tagClose': '',
		'sampleText': '',
		'imageId': 'editbutton-customsig'
	});
}

/* Всі додаткові скрипти включені нижче */
importScript("MediaWiki:Otherscripts.js");

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[**MAINTAINERS**]]
 */
var autoCollapse = 2;
var collapseCaption = 'сховати';
var expandCaption = 'показати';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if( !HeaderRow ) continue;
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if( !Header ) continue;
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button     = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in MediaWiki:Common.css
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();
/* {{nologo}} */
function noLogo() { if(document.getElementById('nologo'))
  document.getElementById('p-logo').style.display = 'none';
}
addOnloadHook(onPageInit);
 
function onPageInit()
{
    noLogo();
}

var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Автопоновлення',
	refreshHover = 'Включити автопоновлення сторінки',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array ("Спеціальна:RecentChanges", "Спеціальна:WikiActivity", "Спеціальна:NewFiles");
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}

var img =  {};
img["Адмирал Вуллф Юларен"] = ['<img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Lesser_Coat_of_Arms_of_Russian_Empire.svg?uselang=ru" width="110px" height="150px">'];
if (typeof img[wgTitle] != "undefined") {
$('<div style="position:absolute; left:630px; top: 38px;">' + img[wgTitle] + '</div>').appendTo('.masthead-info');
}

importScriptPage('SocialIcons/code.js', 'dev');
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "default"
};