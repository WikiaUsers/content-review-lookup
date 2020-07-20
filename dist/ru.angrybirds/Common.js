(function() {
    if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
    }
})();

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0){
    if (wgCanonicalNamespace != "Special")        {
          document.write('<script type="text/javascript" src="' 
          + 'http://uk.vijskpens.wikia.com/index.php?title=MediaWiki:Onlyifediting.js' 
          + '&action=raw&ctype=text/javascript&dontcountme=s"></script>'); 
          addOnloadHook(function(){
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

function addWikifButton() {
	var toolbar = document.getElementById('toolbar');
	if (!toolbar) return;
	var i = document.createElement('img');
	i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
	i.alt = i.title = 'викификатор';
	i.onclick = Wikify;
	i.style.cursor = 'pointer';
	toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
	addOnloadHook(addWikifButton);
}
 

// **************************************************
//  Автоматическое обновление
// **************************************************
 
// AJAX-обновление некоторых страниц(выбор страниц)
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку
 
 
$(function() {
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
 
    if(titleDiv == null)
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

// Avatar Insertion
// Author: Wildream
// Для страниц Доска_почёта и Администрация
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }
 
    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';
 
        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function(data) {
                if (data) {
                    $that.empty().append(
                        $(data).find('.masthead-avatar').children('img').css({
                            'width' : width,
                            'height': 'auto'
                        })
                    );
                }
            },
            error: function() {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    });
})(this.jQuery);

/*==================================================================================================
Защита от читерства в КХЯБ (см. Блог_участника:FRAER/Игра_«Кто_хочет_яичницу_с_беконом?» )
Не даёт повторно отвечать на вопрос после проигрыша — только играть с самого начала.
==================================================================================================*/
 
function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{//Функция для записи cookie-файла — без этого нам никак. Скомунижжено отсюдова: http://ruseller.com/lessons.php?id=593
  var cookie_string = name + "=" + escape ( value );
 
  if ( exp_y )
  { var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
 
  if ( path )
        cookie_string += "; path=" + escape ( path );
 
  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
 
  if ( secure )
        cookie_string += "; secure";
 
  document.cookie = cookie_string;
}
 
function get_cookie ( cookie_name ) 
{//Функция для чтения cookie-файла — без этого нам никак. Скомунижжено отсюдова: http://ruseller.com/lessons.php?id=593
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
var have_failed=get_cookie("KXMX");
 
function KXMX_anticheat() 
{//Защищает от нечестных игроков в «Кто хочет яичницу с беконом?», избавляя возможности вернуться к проваленному вопросу и переответить
    if (wgPageName == "Участник:FRAER/1") { document.write(have_failed); } //Для проверки значения — отображает play или fail в самом-самом низу соотв. страницы
    if ((wgPageName == "Участник:FRAER/Fail")||(wgPageName == "Участник:FRAER/Fail2")) { set_cookie("KXMX", "fail"); } //Попал на Fail — всё, сдул, начинай сначала
    if (wgPageName == "Участник:FRAER/PlayGame2") { set_cookie("KXMX", "play"); } //Начал сначала — играй, как ни в чём не бывало
    if ((have_failed=="fail")&&((wgPageName == "Участник:FRAER/Q2")||(wgPageName == "Участник:FRAER/Q3")||(wgPageName == "Участник:FRAER/Q4")||(wgPageName == "Участник:FRAER/Q5")||(wgPageName == "Участник:FRAER/Q6")||(wgPageName == "Участник:FRAER/Q7")||(wgPageName == "Участник:FRAER/Q8")||(wgPageName == "Участник:FRAER/Q9")||(wgPageName == "Участник:FRAER/Q10")||(wgPageName == "Участник:FRAER/Q11")||(wgPageName == "Участник:FRAER/Q12")||(wgPageName == "Участник:FRAER/Q13")||(wgPageName == "Участник:FRAER/Q14")||(wgPageName == "Участник:FRAER/Q15")||(wgPageName == "Участник:FRAER/QW1")||(wgPageName == "Участник:FRAER/QW2")||(wgPageName == "Участник:FRAER/QW3")||(wgPageName == "Участник:FRAER/QW4")||(wgPageName == "Участник:FRAER/QW5"))) { location.replace('http://ru.angrybirds.wikia.com/wiki/User:FRAER/Fail'); } //Продувал и хочешь переответить, не начав сначала? А дзуськи! Перенаправим тебя на Fail
    }
 
KXMX_anticheat();

/* Главная тема «Референдумы» */
/* Автор: Rendann (http://ru.wikies.wikia.com/wiki/Участник:Rendann) */
/* Prohibits users without sysop rights from creating threads in the board for votes (referenda), which can only be organised by administrators according to our rules. */
$(function() {
    if (mw.config.get( 'wgPageName' ) == 'Главная_тема:Референдумы' && mw.config.get( 'wgUserGroups' ).indexOf('sysop') === -1) {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">Эта главная тема защищена. Вы можете предложить свою идею для референдума <a href="http://ru.angrybirds.wikia.com/wiki/Тема:542167">здесь</a>.</blockquote>');
    }
});

/* Рерайт скрипта Gratters */
/* Автор: Black Spaceship */
(function($, mw) {
    'use strict';
 
    function fetchGratters() {
        $.get(mw.util.wikiScript(), {
	        action: 'raw',
	        title: 'MediaWiki:Custom-Gratters'
        }).done(function(data) {
	       if (!data.length) return;
 
	       var wishes = data.split('\n'),
	           random = Math.floor(Math.random() * wishes.length),
	           wish = wishes[random].split(/\s*\|\s*(.+)/);
 
	       showGratters(wish);
        }).fail(function(){
	        console.warn('Fetching data for gratters failed');
        })
    }
 
    function showGratters(wish) {
        $('#WikiaRail').prepend(
            '<div id="newyearwishes" style="width:98%; position:relative; margin:13px auto; font-size:15px;">' +
                '<div style="background-color:white; padding:20px 10px 10px 10px; border-radius:5px; border:2px Salmon; box-shadow:0 0 10px #0094FF; min-height:45px;">' +
                    '<div style="width:100%; text-align:center;">«' + wish[1] + '»</div>' +
                    '<hr style="margin:5px 0;"/>' +
                    '<div style="text-align:right; font-style:italic; margin-right:5px;">' +
                        'Участник <a href="/ru/wiki/User:' + wish[0].replace(' ', '_') + '">' + wish[0] +'</a>' +
                        '<br />' +
                    '</div>' +
                // Top-center
                '<div style="position:absolute; width:100%; text-align:center; top:-28px; left:0;">' +
                    '<img src="https://vignette.wikia.nocookie.net/angrybirds/images/e/e4/7лет-2.png/revision/latest?cb=20190219203701&path-prefix=ru">' +
                '</div>' +
                // Top-left
                '<div style="position:absolute; top:-14px; left:-8px;">' +
                    '<img src="https://images.wikia.nocookie.net/angrybirds/ru/images/9/9a/%D0%A2%D0%BE%D1%80%D1%82%D0%B5%D0%B3_40.png">' +
                '</div>' +
                // Top-right
                '<div style="position:absolute; top:-14px; right:-10px;">' +
                    '<img src="https://images.wikia.nocookie.net/angrybirds/ru/images/7/78/%D0%A2%D0%BE%D1%80%D1%82%D0%B5%D0%B3_40_1.png">' +
                '</div>' +
            '</div>'
        );
    }
 
    function init() {
        if ($('#WikiaRail').length) {
            mw.loader.using(['mediawiki.util'], fetchGratters);
        }
    }
 
    $(init);
})(this.jQuery, this.mediaWiki);