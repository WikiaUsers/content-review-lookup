$(window).resize(function () {
    ChangeSlideSize();
});
var ContainersOnPage = $('.FluidSlider-container').size();
var InputsSlideCount = $('.FluidSlider-url').size();
var InputSlideIDNumber = 0;
var currentSlideDescription = 0;
$(".FluidSlider-url").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'slide-inp-' + InputSlideIDNumber);
        InputSlideIDNumber++;
    }
});
//Adding required classes and ids to slides, slidedescriptions, etc.
var ContainerSlideIDNumber = 0;
$(".FluidSlider-container").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'container-' + ContainerSlideIDNumber);
        ContainerSlideIDNumber++;
    }
});

ContainerSlideIDNumber = 0;
$(".FluidSlider-nav").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'nav-' + ContainerSlideIDNumber);
        ContainerSlideIDNumber++;
    }
});

for (ContainerCount = 0; ContainerCount < ContainersOnPage; ContainerCount++) {
for (NavsCount = 0; NavsCount < $('#nav-' + ContainerCount).children().size() - 1; NavsCount++) {
$('#container-' + ContainerCount).append('<div class="FluidSlide"></div>');
}
}

var OutputSlideIDNumber = 0;
$(".FluidSlide").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'slide-out-' + OutputSlideIDNumber);
        OutputSlideIDNumber++;
    }
});

for (tmpCount = 0; tmpCount < InputsSlideCount; tmpCount++) {
    var SlideImg = ($('#slide-inp-' + tmpCount + ' > img').length) ?
                    $('#slide-inp-' + tmpCount + ' > img').attr('src'):
                    $('#slide-inp-' + tmpCount).text();

    $('#slide-out-' + tmpCount).css('background', 'url("' + SlideImg + '") center center no-repeat');
}
//Changing slide and slide description
function ChangeSlide() {
    for (ContainerCount = 0; ContainerCount < ContainersOnPage; ContainerCount++) {
        var CurrentSlide = parseInt($('#container-' + ContainerCount).data('current-slide'), 10);
        CurrentSlide++;
        if (CurrentSlide >= $('#container-' + ContainerCount).children().size()) {
            CurrentSlide = 0;
        }
        var OldSlide = parseInt($('#nav-' + ContainerCount).data('old-description'), 10);
        $('#container-' + ContainerCount).animate({
            left: -CurrentSlide * ($('.FluidSlide').width())
        }, 300).data('current-slide', CurrentSlide);
        $("#nav-" + ContainerCount).children().eq(OldSlide).hide();
        $("#nav-" + ContainerCount).children().eq(CurrentSlide).show();
        $("#nav-" + ContainerCount).data('old-description', CurrentSlide);
    }
}

setInterval(ChangeSlide, 5000);
//Changing slide size
function ChangeSlideSize() {
    var SliderHeight = parseInt($('.WikiaArticle').width(), 10) / 2;
    $('.FluidSlider-viewpoint').css({
        'width': '100%',
        'height': SliderHeight,
        'max-height': '510px',
        'max-width': '1060px',
        'margin': '0 auto',
        'overflow': 'hidden'
    });

    $('.FluidSlide').css({
        'background-size': 'contain',
        '-o-background-size': 'contain',
        '-webkit-background-size': 'contain',
        '-moz-background-size': 'contain',
        'display': 'inline',
        'float': 'left',
        'height': SliderHeight,
        'max-height': '510px',
        'max-width': '1060px',
        'width': $('.FluidSlider-viewpoint').width()
    });
    $('.FluidSlider-container').css({
        'width': (parseInt($('.FluidSlide').width(), 10) * parseInt($('.FluidSlide').size(), 10)),
        'height': SliderHeight,
        'position': 'relative'
    });
}

setTimeout(ChangeSlideSize, 500);


/* AutoEditDropdown */
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

/*==================================================================================================
Inactive User Statuses 
==================================================================================================*/
//Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};
 
// ============================================================
// BEGIN Template:Games
// ============================================================

function addTitleGames()
{
    var titleDiv = document.getElementById("title-games");
    if (titleDiv != null && titleDiv != undefined)
    {
       var content = document.getElementById('article');
       if (!content) 
       {
         var content = document.getElementById('content');
       }

       if (content) 
       {
          var hs = content.getElementsByTagName('h1');
          var firstHeading;
          for (var i = 0; i < hs.length; i++){
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
              firstHeading=hs[i];
              break;
            }
          }
   
          var cloneNode = titleDiv.cloneNode(true);
          firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
          cloneNode.style.display = "block";
          cloneNode.style.visibility = "visible";
          if (skin != "monaco")
          {
            cloneNode.style.marginTop = "-11px";
          }
       }
    }
}

addOnloadHook( addTitleGames );

// ============================================================
// END Template:Games
// ============================================================



// ============================================================
// BEGIN collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
/* customized for Fallout wiki */

var autoCollapse = 1;
var collapseCaption = "скрыть";
var expandCaption = "показать";

function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;

    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons()
{
    var tableIndex = 0;
    var collapseIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
            Button.className = "t_show_hide";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );

            if ( !hasClass( Tables[i], "nocount" ) ) {
		collapseIndex++;
	    }
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}

addOnloadHook( createCollapseButtons );

// ============================================================
// END collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================



// ============================================================
// BEGIN demo widgets
// ============================================================

addWidgets = function() {
   var widgets = getElementsByClassName(document.getElementById('bodyContent'),'div','wikia_widget');
   for(var i = 0; i < widgets.length; i++){
      widgets[i].innerHTML = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='300' height='250' align='middle' id='wikia_widget'><param name='allowScriptAccess' value='always' /><param name='movie' value='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' /><param name='quality' value='high' /> <param name='wmode' value='transparent' /><embed src='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' FlashVars='backgroundColor=000000&backgroundImage=&borderColor=92947c&dropShadow=on&headerColor=92947c&headerAlpha=.05&headerBorderColor=000000&headline1=The Vault presents&headline1Color=CCCCCC&headline2=Most Wanted DLC Items&headline2Color=FFFFFF&clickURL=http://fallout.wikia.com&wikiURLColor=FFFFFF&wikiaLogoColor=FFFFFF&type=slideshow&slideshowImages=https://images.wikia.nocookie.net/fallout/images/8/8b/Widget_Auto-Axe.png,https://images.wikia.nocookie.net/fallout/images/f/ff/Widget_Gauss-Rifle.png,https://images.wikia.nocookie.net/fallout/images/6/6f/Widget_WidPower-Armor.png,https://images.wikia.nocookie.net/fallout/images/1/1c/Get_Shock-Sword.png&=Preview images in the widget&' quality='high' wmode='transparent' width='300' height='250' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' name='wikia_widget' /></object>";
   }
}

addOnloadHook(addWidgets);

// ============================================================
// END demo widgets
// ============================================================

/*==================================================================================================
Wikificator 
==================================================================================================*/
function addWikifButton() {
    var toolbar = document.getElementById('toolbar')
    if (!toolbar) return
    var i = document.createElement('img')
    i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
    i.alt = i.title = 'Викификатор'
    i.onclick = Wikify
    i.style.cursor = 'pointer'
    toolbar.appendChild(i)
}

if (wgAction == 'edit' || wgAction == 'submit') {
    importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
    addOnloadHook(addWikifButton)
}



/*==================================================================================================
Счётчик для числа цитат. By Apologet 
==================================================================================================*/
function citeNum() {
    if (wgPageName == "Шаблон:Рандомная_цитата") {
        var opts = document.getElementsByClassName("cite-table"),
            num = opts.length - 1,
            tag = document.getElementById("cite-num");
        tag.innerText = "" + num;
    }
    else if (wgPageName == "Шаблон:А_вы_знали") {
        var opts2 = document.getElementsByClassName("cite-table"),
            num2 = opts2.length - 1,
            tag2 = document.getElementById("cite-num");
        tag2.innerText = "" + num2;
    }
    else if (wgPageName == "Шаблон:Анекдоты") {
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
    if (wgPageName == "Участник:FRAER/1") { document.write(have_failed); } //Для проверки значения — отображает play или fail в самом-самом низу соотв. страницы
    if ((wgPageName == "Участник:FRAER/Fail")||(wgPageName == "Участник:FRAER/Fail2")) { set_cookie("KXMX", "fail"); } //Попал на Fail — всё, сдул, начинай сначала
    if (wgPageName == "Участник:FRAER/Play") { set_cookie("KXMX", "play"); } //Начал сначала — играй, как ни в чём не бывало
    if ((have_failed=="fail")&&(
    (wgPageName == "Участник:FRAER/Q2")||(wgPageName == "Участник:FRAER/Q3")||(wgPageName == "Участник:FRAER/Q4")||
    (wgPageName == "Участник:FRAER/Q5")||(wgPageName == "Участник:FRAER/Q6")||(wgPageName == "Участник:FRAER/Q7")||
    (wgPageName == "Участник:FRAER/Q8")||(wgPageName == "Участник:FRAER/Q9")||(wgPageName == "Участник:FRAER/Q10")||
    (wgPageName == "Участник:FRAER/Q11")||(wgPageName == "Участник:FRAER/Q12")||(wgPageName == "Участник:FRAER/Q13")||
    (wgPageName == "Участник:FRAER/Q14")||(wgPageName == "Участник:FRAER/Q15")||(wgPageName == "Участник:FRAER/QW1")||
    (wgPageName == "Участник:FRAER/QW2")||(wgPageName == "Участник:FRAER/QW3")||(wgPageName == "Участник:FRAER/QW4")||
    (wgPageName == "Участник:FRAER/QW5")||(wgPageName == "Участник:FRAER/QR2")||(wgPageName == "Участник:FRAER/QR3")||
    (wgPageName == "Участник:FRAER/QR4")||(wgPageName == "Участник:FRAER/QR5")||(wgPageName == "Участник:FRAER/QR6")||
    (wgPageName == "Участник:FRAER/QR7")||(wgPageName == "Участник:FRAER/QR8")||(wgPageName == "Участник:FRAER/QR9")
    )) { location.replace('http://ru.stalker.wikia.com/wiki/User:FRAER/Fail'); } //Продувал и хочешь переответить, не начав сначала? А дзуськи! Перенаправим тебя на Fail
    }
 
KXMX_anticheat();