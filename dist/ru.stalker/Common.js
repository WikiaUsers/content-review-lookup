/*==================================================================================================
Inactive User Statuses 
==================================================================================================*/
//Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};


/*==================================================================================================
Счётчик для числа цитат. By Apologet 
==================================================================================================*/
function citeNum() {
    if (mw.config.get("wgPageName") == "Шаблон:Рандомная_цитата") {
        var opts = document.getElementsByClassName("cite-table"),
            num = opts.length - 1,
            tag = document.getElementById("cite-num");
        tag.innerText = "" + num;
    }
    else if (mw.config.get("wgPageName") == "Шаблон:А_вы_знали") {
        var opts2 = document.getElementsByClassName("cite-table"),
            num2 = opts2.length - 1,
            tag2 = document.getElementById("cite-num");
        tag2.innerText = "" + num2;
    }
    else if (mw.config.get("wgPageName") == "Шаблон:Анекдоты") {
        var opts3 = document.getElementsByClassName("cite-table"),
            num3 = opts3.length - 1,
            tag3 = document.getElementById("cite-num");
        tag3.innerText = "" + num3;
    }
}

citeNum();


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
    if (mw.config.get("wgPageName") == "Участник:FRAER/1") { document.write(have_failed); } //Для проверки значения — отображает play или fail в самом-самом низу соотв. страницы
    if ((mw.config.get("wgPageName") == "Участник:FRAER/Fail")||(mw.config.get("wgPageName") == "Участник:FRAER/Fail2")) { set_cookie("KXMX", "fail"); } //Попал на Fail — всё, сдул, начинай сначала
    if (mw.config.get("wgPageName") == "Участник:FRAER/Play") { set_cookie("KXMX", "play"); } //Начал сначала — играй, как ни в чём не бывало
    if ((have_failed=="fail")&&(
    (mw.config.get("wgPageName") == "Участник:FRAER/Q2")||(mw.config.get("wgPageName") == "Участник:FRAER/Q3")||(mw.config.get("wgPageName") == "Участник:FRAER/Q4")||
    (mw.config.get("wgPageName") == "Участник:FRAER/Q5")||(mw.config.get("wgPageName") == "Участник:FRAER/Q6")||(mw.config.get("wgPageName") == "Участник:FRAER/Q7")||
    (mw.config.get("wgPageName") == "Участник:FRAER/Q8")||(mw.config.get("wgPageName") == "Участник:FRAER/Q9")||(mw.config.get("wgPageName") == "Участник:FRAER/Q10")||
    (mw.config.get("wgPageName") == "Участник:FRAER/Q11")||(mw.config.get("wgPageName") == "Участник:FRAER/Q12")||(mw.config.get("wgPageName") == "Участник:FRAER/Q13")||
    (mw.config.get("wgPageName") == "Участник:FRAER/Q14")||(mw.config.get("wgPageName") == "Участник:FRAER/Q15")||(mw.config.get("wgPageName") == "Участник:FRAER/QW1")||
    (mw.config.get("wgPageName") == "Участник:FRAER/QW2")||(mw.config.get("wgPageName") == "Участник:FRAER/QW3")||(mw.config.get("wgPageName") == "Участник:FRAER/QW4")||
    (mw.config.get("wgPageName") == "Участник:FRAER/QW5")||(mw.config.get("wgPageName") == "Участник:FRAER/QR2")||(mw.config.get("wgPageName") == "Участник:FRAER/QR3")||
    (mw.config.get("wgPageName") == "Участник:FRAER/QR4")||(mw.config.get("wgPageName") == "Участник:FRAER/QR5")||(mw.config.get("wgPageName") == "Участник:FRAER/QR6")||
    (mw.config.get("wgPageName") == "Участник:FRAER/QR7")||(mw.config.get("wgPageName") == "Участник:FRAER/QR8")||(mw.config.get("wgPageName") == "Участник:FRAER/QR9")
    )) { location.replace('http://ru.stalker.wikia.com/wiki/User:FRAER/Fail'); } //Продувал и хочешь переответить, не начав сначала? А дзуськи! Перенаправим тебя на Fail
    }
 
KXMX_anticheat();