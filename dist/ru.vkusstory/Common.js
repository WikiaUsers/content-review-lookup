// Автор скрипта — Kopcap94

/*
(function($) {
    'use strict';
    var h = (new Date()).getHours(),
        s;
    if (h >= 0 && h <= 4) {
        // Время от 0:00 до 4:59 
        s = 'https://vignette.wikia.nocookie.net/vkusstory/images/0/07/Background12.JPG/revision/latest?cb=20171201123739&path-prefix=ru';
    } else if (h > 5 && h <= 16) {
        // Время от 5:00 до 16:59
        s =
            'https://vignette.wikia.nocookie.net/vkusstory/images/1/11/Background10.JPG/revision/latest?cb=20171201123703&path-prefix=ru';
    } else if (h > 16 && h <= 19) {
        // Время от 17:00 до 19:59
        s = 'https://vignette.wikia.nocookie.net/vkusstory/images/5/5c/Background11.jpg/revision/latest?cb=20171201123722&path-prefix=ru';
    } else {
        // Время от 20:00 до 23:59 
        s = 'https://vignette.wikia.nocookie.net/vkusstory/images/0/07/Background12.JPG/revision/latest?cb=20171201123739&path-prefix=ru';
    }
    $('body.skin-oasis').css({
        'background-image': 'url(' + s + ')',
        'background-repeat': 'repeat',
        'background-attachment': 'fixed'
    });
})(this.jQuery);
*/

/* + ссылка «править» для нулевой секции. */
function editZeroSection(){
 if( !wgArticleId ) return;
 mw.util.$content.find('h2')
 .children('.editsection:first')
 .clone().prependTo('#WikiaArticle')
 .css('float','right')
 .find('a')
 .attr('title', 'Править секцию: 0')
 .attr('href', wgScript + '?title='+mw.util.wikiUrlencode(wgPageName) + '&action=edit&section=0' );
} 

$(editZeroSection);
  
/* Вставка юзернейма с помощью <span class="insertusername"></span> */
(function( $, mw ) {
    if ( !$( '.insertusername' ).length ) return;
    var nick = mw.config.get( 'wgUserName' );
    $( '.insertusername' ).text( ( nick !== null ) ? nick : 'Анонимный участник' );
})( this.jQuery, this.mediaWiki );

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