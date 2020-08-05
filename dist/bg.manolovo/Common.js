/* <pre><nowiki> */

/*importScript('MediaWiki:Common.js/edit.js');*/

/* Editor additional buttons */
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/manolovo/bg/images/c/c9/Button_strike.png",
     "speedTip": "Зачертан текст",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Зачертан текст"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/manolovo/bg/images/f/fd/Button_underline.png",
     "speedTip": "Подчертан текст",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Подчертан текст"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203182139/manolovo/bg/images/c/c8/Button_redirect.png",
     "speedTip": "Пренасочване",
     "tagOpen": "#пренасочване [[",
     "tagClose": "]]\n\n[[Категория:Пренасочвания]]",
     "sampleText": "Статия"
   };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20120203182219/manolovo/bg/images/1/16/Button_reflink_alternate.png",
        "speedTip": "Бележка",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Бележка"
    };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203181836/manolovo/bg/images/1/13/Button_enter.png",
     "speedTip": "Нов ред",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203182021/manolovo/bg/images/f/f6/Button_html_comment.png",
     "speedTip": "Коментар (видим само при редактиране)",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Коментар"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203181754/manolovo/bg/images/1/1c/Button_advanced_image.png",
     "speedTip": "Картинка",
     "tagOpen": "[[Картинка:",
     "tagClose": "]]",
     "sampleText": "Картинка1.jpg"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203181916/manolovo/bg/images/1/12/Button_gallery.png",
     "speedTip": "Глерия",
     "tagOpen": '<gallery captionalign="left">\n',
     "tagClose": "\n</gallery>",
     "sampleText": "Картинка1.jpg|Текст1\nКартинка2.jpg|Текст2"
   };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20120203182343/manolovo/bg/images/4/4a/Button_table.png",
        "speedTip": "Таблица",
        "tagOpen": '{| class="wikitable"\n|',
        "tagClose": "\n|}",
        "sampleText": "-\n! хедър 1\n! хедър 2\n! хедър 3\n|-\n| ред 1, клетка 1\n| ред 1, клетка 2\n| ред 1, клетка 3\n|-\n| ред 2, клетка 1\n| ред 2, клетка 2\n| ред 2, клетка 3"
    };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/manolovo/bg/images/2/2d/Button_ndash.png",
     "speedTip": "Тире (средна чертица)",
     "tagOpen": "–",
     "tagClose": "",
     "sampleText": ""
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/manolovo/bg/images/0/0b/Btn-quotes.png",
     "speedTip": "Кавички",
     "tagOpen": "„",
     "tagClose": "“",
     "sampleText": "Текст в кавички"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/manolovo/bg/images/b/b0/Button_i.png",
     "speedTip": "ѝ (ударено и)",
     "tagOpen": "ѝ",
     "tagClose": "",
     "sampleText": ""
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/manolovo/bg/images/9/92/Button_udarenie.png",
     "speedTip": "Ударение",
     "tagOpen": "",
     "tagClose": "&#768;",
     "sampleText": ""
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203182505/manolovo/bg/images/c/cb/Button_wikipedia.png",
     "speedTip": "Връзка към Уикипедия",
     "tagOpen": "[[Wikipedia:bg:",
     "tagClose": "]]",
     "sampleText": "Заглавие"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203124145/manolovo/bg/images/c/c0/Button_link.png",
     "speedTip": "Връзка",
     "tagOpen": "[[",
     "tagClose": "]]",
     "sampleText": "Връзка"
   };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120203182057/manolovo/bg/images/9/97/Button_LINKT1.png",
     "speedTip": "Шаблон",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Шаблон"
   }

}

/*Function to insert a value at the current cursor position*/
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

function substUsername() {
	$('.insertusername').html(wgUserName);
}
$( substUsername );

/* </nowiki></pre> */