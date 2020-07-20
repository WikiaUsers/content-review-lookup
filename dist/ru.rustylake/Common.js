//PurgeButton
window.PurgeButtonText = 'Обновить';

//BackToTopButton
window.BackToTopModern = true;

//SeeMoreActivityButton
window.SeeMoreActivityButtonOld = true;

//CopyCodeButton
window.copyButtonPosition = "div.copy";
window.syntaxHighLightArea = "pre.copy";

//AjaxRC
window.ajaxSpecialPages = [
    "RecentChanges",
    "WikiActivity",
    "Watchlist",
    "Log",
    "Contributions",
    "NewPages",
    "Изображения",
    "Видео"
];
window.AjaxRCRefreshHoverText = 'Автообновление страницы';

//RailWAM
window.railWAM = {
    logPage: "Project:WAM Log"
};

//SpoilerAlert
window.SpoilerAlertJS = {
    question: 'В тексте содержатся спойлеры. Хотите прочитать?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 500
};

//Tooltip
var tooltips_list = [
    {
        classname: 'custom-tooltip-navigation',
        parse: '{|style="background:#e9e7e1;border-radius:10px;width:350px;padding:5px;"\n|-\n|[[Файл:<#pic#>|340px]]\n|-\n|<#text#>\n|}',
    }
]

//ReferencePopups
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };

//PageCreator
window.pageCreatorConfig = {
    namespaces: "all",
    useAvatar: true,
    useTimestamp: true,
    useTimeago: true,
};

//LastEdited
window.lastEdited = {
    size: false,
    comment: false,
};

//Импорт из dev.fandom.com
importArticles({
	type: 'script',
	articles: [
	    'w:dev:MediaWiki:PageCreator/code2.js',
	    'w:dev:MediaWiki:LastEdited/code.js',
	]
});

//Кнопки панели редактирования
if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/c/c8/Button_redirect.png",
		"speedTip": "Перенаправление",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Введите текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/c/c9/Button_strike.png",
		"speedTip": "Зачеркнуть",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Введите текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/1/13/Button_enter.png",
		"speedTip": "На другую строку",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/7/74/Button_comment.png",
		"speedTip": "Комментарий виден только для редакторов",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Введите свой комментарий"
	};
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png/revision/latest?cb=20080220213803",
        "speedTip": "Добавить сноску",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Название сноски"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/f2/Ref_name_button.png/revision/latest?cb=20131205151742",
        "speedTip": "Повторная сноска",
        "tagOpen": "<ref name=Название>",
        "tagClose": "</ref>",
        "sampleText": "Название повторной сноски"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = { 
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c8/Button_redirect.png/revision/latest?cb=20130630205318", 
        "speedTip": "Добавить перенаправление", 
        "tagOpen": "#Перенаправление [[", 
        "tagClose": "]]", 
        "sampleText": "Название страницы" 
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png/revision/latest?cb=20081020115941",
        "speedTip": "Ссылка на статью в Википедии",
        "tagOpen": "[[wikipedia:ru:|",
        "tagClose": "]]",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
        "speedTip": "Добавить галерею",
        "tagOpen": "<gallery>",
        "tagClose": "</gallery>",
        "sampleText":""
    }; 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png/revision/latest?cb=20070329065451",
        "speedTip": "Добавить шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Название шаблона"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anführung.png",
        "speedTip": "Добавить цитату",
        "tagOpen": "{{Цитата|",
        "tagClose": "||}}",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/b/b4/Button_category03.png/revision/latest?cb=20070329064836",
        "speedTip": "Добавить категорию",
        "tagOpen": "[[Категория:|",
        "tagClose": "]]",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/a/a4/TableStart.png/revision/latest?cb=20070927085428",
        "speedTip": "Создать таблицу",
        "tagOpen": "{|",
        "tagClose": "|}",
        "sampleText": "Начало новой таблицы"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
        "speedTip": "Ударение",
        "tagOpen": "́",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/56/Button_big.png/revision/latest?cb=20081020113952",
        "speedTip": "Крупный шрифт",
        "tagOpen": "<big>",
        "tagClose": "</big>",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/58/Button_small.png/revision/latest?cb=20081020113836",
        "speedTip": "Мелкий шрифт",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/fd/Button_underline.png/revision/latest?cb=20081020114112",
        "speedTip": "Подчёркнутый текст",
        "tagOpen": "<u>",
        "tagClose": "</u>",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c9/Button_strike.png/revision/latest?cb=20070324060207",
        "speedTip": "Зачёркнутый текст",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png/revision/latest?cb=20070329064320",
        "speedTip": "Нумерованный список",
        "tagOpen": "#",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png/revision/latest?cb=20070329064826",
        "speedTip": "Маркированный список",
        "tagOpen": "*",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/d/d5/Button_noinclude.png/revision/latest?cb=20070329065148",
        "speedTip": "Скрыть категорию шаблона в статьях",
        "tagOpen": "<noinclude>",
        "tagClose": "</noinclude>",
        "sampleText": "На место этого текста, вставьте категорию"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
        "speedTip": "Перенос строки",
        "tagOpen": "<br>",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/7/74/Button_comment.png/revision/latest?cb=20070324060240",
        "speedTip": "Скрытый комментарий",
        "tagOpen": "<!--",
        "tagClose": "-->",
        "sampleText": "Добавьте комментарий"
    };
}