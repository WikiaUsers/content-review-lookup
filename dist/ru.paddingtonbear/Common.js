//AjaxRC
window.ajaxSpecialPages = [
    "RecentChanges",
    "Watchlist",
    "Log",
    "WikiActivity"
];
window.AjaxRCRefreshText = 'Автообновление';

//Toolbar buttons
 
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png",
        "speedTip": "Перенаправление",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": ""
	};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Button_cat_ru.png",
        "speedTip": "Категория",
        "tagOpen": "[[Категория:",
        "tagClose": "]]",
        "sampleText": ""
	};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikisource/ru/0/0b/Button-quotes.png",
        "speedTip": "Кавычки",
        "tagOpen": "«",
        "tagClose": "»",
        "sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikisource/ru/a/a9/Button-dash.png",
        "speedTip": "Тире",
        "tagOpen": "—",
        "tagClose": "",
        "sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
        "speedTip": "Ударение",
        "tagOpen": "́",
        "tagClose": "",
        "sampleText": ""
	};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/commons/4/43/Button-template.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png",
        "speedTip": "Комментарий",
        "tagOpen": "<!--",
        "tagClose": "-->",
        "sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png",
        "speedTip": "Развёрнутая цитата",
        "tagOpen": "<blockquote>\n",
        "tagClose": "\n</blockquote>",
        "sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": 'https://upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
        "speedTip": 'Вставить таблицу',
        "tagOpen": '{| class="wikitable"\n|',
        "tagClose": '\n|}',
        "sampleText": '-\n! заголовок 1\n! заголовок 2\n! заголовок 3\n|-\n| строка 1, ячейка 1\n| строка 1, ячейка 2\n| строка 1, ячейка 3\n|-\n| строка 2, ячейка 1\n| строка 2, ячейка 2\n| строка 2, ячейка 3'
	};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Примечание",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": ""
	};
}