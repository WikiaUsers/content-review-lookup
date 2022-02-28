
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
                '<div class="wishes">' +
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