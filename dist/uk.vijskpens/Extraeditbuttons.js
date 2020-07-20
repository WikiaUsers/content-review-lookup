// <pre><nowiki>
/* УВАГА: Цеј код було вимкнено у MediaWiki.Common.js через неполадки ў стилі «Monobook». */
// This is based on the original code on Wikipedia:Tools/Editing tools
//
// See the [[:en:User:MarkS/Extra edit buttons]] for changes log

function InsertButtonsToToolBar()
{
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
    "tagClose": "]]",
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
addOnloadHook( InsertButtonsToToolBar );

// </nowiki></pre>
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