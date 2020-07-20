/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Messages
var listFA = {
    fa: 'Эта статья является избранной',
    fl: 'Этот список или портал является избранным',
    ga: 'Эта статья является хорошей'
};

var textFA = ' в другом языковом разделе';

$(function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');

    if (titleDiv == null)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];

    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";

    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
});

window.UserTagsJS = {
    modules: {},
    tags: {
        участникгода: {
            u: 'Участник года'
        },

    }
};

UserTagsJS.modules.custom = {
    'Никнейм_участника_года': ['участникгода'],

};

window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление страницы';

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
    if (wgCanonicalNamespace != "Special") {
        importArticle('http://uk.vijskpens.wikia.com/index.php?title=MediaWiki:Onlyifediting.js');
        addOnloadHook(function() {
            if (mwEditButtons.length < 3) return;
            mwEditButtons[0].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/fa/Button_bold_ukr.png';
            mwEditButtons[1].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_italic_ukr.png';
            mwEditButtons[2].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/0/03/Button_internal_link_ukr.png';
        });
    }
}

/* Дополнительные кнопки в классическом редакторе */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png",
        "speedTip": "Перенаправление",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "название страницы"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Название шаблона"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png/revision/latest?cb=20080220213803",
        "speedTip": "Добавить сноску",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Название сноски"
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
        "tagOpen": "<u>",
        "tagClose": "</u>",
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
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
        "speedTip": "Перенос строки",
        "tagOpen": "<br>",
        "tagClose": "",
        "sampleText": ""
    };
}