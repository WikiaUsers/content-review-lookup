/*==================================================================================================
Защита от читерства в КХМХ (см. Блог_участника:FRAER/Игра_«Кто_хочет_много_хабара?» )
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
{//Защищает от нечестных игроков в «Кто хочет много хабара?», избавляя возможности вернуться к проваленному вопросу и переответить
    if (wgPageName == "Участник:FRAER/1") { document.write(have_failed); } //Для проверки значения — отображает play или fail в самом-самом низу соотв. страницы
    if ((wgPageName == "Участник:FRAER/Fail")||(wgPageName == "Участник:FRAER/Fail2")) { set_cookie("KXMX", "fail"); } //Попал на Fail — всё, сдул, начинай сначала
    if (wgPageName == "Участник:FRAER/Play") { set_cookie("KXMX", "play"); } //Начал сначала — играй, как ни в чём не бывало
    if ((have_failed=="fail")&&((wgPageName == "Участник:FRAER/Q2")||(wgPageName == "Участник:FRAER/Q3")||(wgPageName == "Участник:FRAER/Q4")||(wgPageName == "Участник:FRAER/Q5")||(wgPageName == "Участник:FRAER/Q6")||(wgPageName == "Участник:FRAER/Q7")||(wgPageName == "Участник:FRAER/Q8")||(wgPageName == "Участник:FRAER/Q9")||(wgPageName == "Участник:FRAER/Q10")||(wgPageName == "Участник:FRAER/Q11")||(wgPageName == "Участник:FRAER/Q12")||(wgPageName == "Участник:FRAER/Q13")||(wgPageName == "Участник:FRAER/Q14")||(wgPageName == "Участник:FRAER/Q15")||(wgPageName == "Участник:FRAER/QW1")||(wgPageName == "Участник:FRAER/QW2")||(wgPageName == "Участник:FRAER/QW3")||(wgPageName == "Участник:FRAER/QW4")||(wgPageName == "Участник:FRAER/QW5"))) { location.replace('http://ru.stalker.wikia.com/wiki/User:FRAER/Fail'); } //Продувал и хочешь переответить, не начав сначала? А дзуськи! Перенаправим тебя на Fail
    }

KXMX_anticheat();