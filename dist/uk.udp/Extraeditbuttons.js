// [[ru:MediaWiki:Extraeditbuttons.js]]
// <pre><nowiki>

// This is based on the original code on Wikipedia:Tools/Editing tools
//
// The original code was on the project page and needed to be cut and paste to the user's
// monobook.js page. However, this caused problems with the quote marks. So I have moved 
// it to its own page. 
//
// I do not know a lot about Javascript so please do not ask for a complicated change
//
// See the [[:en:User:MarkS/Extra edit buttons]] for changes log

function InsertButtonsToToolBar()
{
//Перенаправлення 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png", 
    "speedTip": "Перенаправлення", 
    "tagOpen": "#Redirect [[", 
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
    "imageFile": "http://upload.wikimedia.org/wikisource/ru/a/a6/Button-cat.png",
    "speedTip": "Категорія",
    "tagOpen": "[[Категорія:",
    "tagClose": "]]",
    "sampleText": "Назва категорії"}
//Underline 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png", 
    "speedTip": "Підкреслення", 
    "tagOpen": "<u>", 
    "tagClose": "</u>", 
    "sampleText": "Підкреслений текст"}
//Strike-Out Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png",
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
//Наголос
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
    "speedTip": "Наголос",
    "tagOpen": "́",
    "tagClose": "",
    "sampleText": ""}
//Left-Text Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
    "speedTip": "Вирівняти зліва",
    "tagOpen": "<div style='text-align: left; direction: ltr; margin-left: 1em;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Вирівняний вліво текст"}
//Center-Text Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
    "speedTip": "Вирівняти по центру",
    "tagOpen": "<div style='text-align: center;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Центрований текст"}
//Line break button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
    "speedTip": "Розрив",
    "tagOpen": "<br />",
    "tagClose": "",
    "sampleText": ""}
//Superscript
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
    "speedTip": "Верхній індекс",
    "tagOpen": "<sup>",
    "tagClose": "</sup>",
    "sampleText": "Верхній індекс"}
//Subscript
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
    "speedTip": "Нижній індекс",
    "tagOpen": "<sub>",
    "tagClose": "</sub>",
    "sampleText": "Нижній індекс"}
//Small Text
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/58/Button_small.png",
    "speedTip": "Менший шрифт",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": "Текст малим шрифтом"}
//Comment
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/74/Button_comment.png",
    "speedTip": "Вставка коментаря",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Коментар"}
//Gallery
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png",
    "speedTip": "Галерея",
    "tagOpen": "\n<center><gallery>\n",
    "tagClose": "\n</gallery></center>",
    "sampleText": "Файл:Назва_зображення1.jpg|Опис_зображення1\n\Файл:Назва_зображення2.jpg|Опис_зображення2"}
//Secondary Headline
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/78/Button_head_A2.png",
    "speedTip": "Підзаголовок",
    "tagOpen": "\n===",
    "tagClose": "===",
    "sampleText": "Підзаголовок"}
//Colour
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
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
//Reference link button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
    "speedTip": "Виноска",
    "tagOpen": "<ref>",
    "tagClose": "</ref>",
    "sampleText": "Посилання"}
//Reference button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a0/Button_references_alt.png",
    "speedTip": "Виноски",
    "tagOpen": "<references/>",
    "tagClose": "",
    "sampleText": ""}
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
    "tagOpen": "{{підст:Tl|",
    "tagClose": "}}",
    "sampleText": "Назва шаблону"}
}
addOnloadHook( InsertButtonsToToolBar );

// </nowiki></pre>