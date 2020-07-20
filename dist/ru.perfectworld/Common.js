/* <pre><nowiki> */

var xhrSummaries, xhrReasons;

document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://ru.perfectworld.wikia.com/index.php?title=MediaWiki:Wikifier.js&action=raw&ctype=text/javascript&dontcountme=s\"></script>");

/* Импорт дополнительных скриптов. Взято с изменениями из рувики, автор Alex Smotrov */
 function importScript(page) {
     var url = wgScriptPath + '/index.php?title='
                            + encodeURIComponent(page.replace(' ','_'))
                            + '&action=raw&ctype=text/javascript&dontcountme=s';
     var s = document.createElement('script');
     s.src = url;
     s.type='text/javascript';
     document.getElementsByTagName('head')[0].appendChild(s);
 }

function onPageInit()
{
    fillDeleteReasons();
    do_nihilism();
    do_memory_eraser();
    do_edit_null();
/*    hide_bad_iwiki(); */
    sysdep_init();
    fixSearch();
    yandex_rating_banner();
    /* markFeatured(); */

    if(typeof onPageLoad != "undefined")
    {
        onPageLoad();
    }
}

/* Маскируем неправильно настроенные интервики — (C) Edward. */
function hide_bad_iwiki()
{
  for(var i = 0; i < document.links.length; i ++)
  {
    if(document.links[i].href.match("title=([A-Z][a-z]|Simple|Zh-.*?):"))
      document.links[i].innerHTML = "";
  }
}

function yandex_rating_banner()
{
  txt = document.getElementById('yandex_rating');
  if(txt)
  {
    txt.innerHTML = "<img src=\"http://www.yandex.ru/cycounter?ru.perfectworld.wikia.com\" title=\"Индекс цитирования (тИЦ) PWR\" />";
  }
}

/* Обеспечиваем фокус с {{sysdep}} — (C) Edward. */
function sysdep_init()
{
  var lo = document.getElementById('linux_only');
  var wo = document.getElementById('winds_only');
  if(navigator.userAgent.match("Linux") || navigator.userAgent.match("X11"))
  {
    if(lo) lo.style.display = "block";
    if(wo) wo.style.display = "none";
  }
  else
  {
    if(lo) lo.style.display = "none";
    if(wo) wo.style.display = "block";
  }
}

/* Обеспечиваем нигилистические фокусы — (C) Edward  */
function do_nihilism()
{
  nhl = document.getElementById('nihilism');
  if(nhl)
  {
    msg = nhl.innerHTML;
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = 'white';
    body.innerHTML = "<div id='nihilism_message'>" + msg + "</div>";    
  }
}

/* Обеспечиваем стирание памяти для "Людёй в чёрном" */
function do_memory_eraser()
{
  era = document.getElementById('erase_memory');
  if(era)
  {
    sleep(5000);
    era.style.display='none';
  }
}

/* Делаем ссылку «править» для нулевой секции — (C) Edward. */
function do_edit_null()
{ 
  if(document.getElementById('bodyContent').innerHTML.match('class=\"editsection\"'))
    document.getElementById('bodyContent').innerHTML = "<div class=\"editsection\" id=\"ca-edit-0\">[<a href=\"http://absurdopedia.wikia.com/index.php?title=" + wgPageName + "&action=edit&section=0\">править</a>]</div>" + document.getElementById('bodyContent').innerHTML;
}

 function fillDeleteReasons()
 {
    var label = document.getElementById("wpReason");
    if(label == null || !window.location.href.match("action=delete"))
        return;
    label = document.getElementById("contentSub");
    if(label == null)
        return;

    var comboString = "<select id='stdReasons' onchange='onStdReasonChange()'>\n  <option value=''>&lt;выберите из списка&gt;</option>";  
    var request;

    try
    {
        request = new XMLHttpRequest();
    }
    catch(e)
    {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    }

    request.open("GET", "http://ru.perfectworld.wikia.com/index.php?title=Шаблон:Stdreasons&action=raw&ctype=text/plain");
    xhrReasons = request;

    request.onreadystatechange = function()
    {
        if(xhrReasons.readyState == 4)
        {
            var combo = document.getElementById("stdReasons");
            var lines = xhrReasons.responseText.split("\n");
            var i;

            for(i = 0; i < lines.length; i++)
            {
                comboString += (lines[i].indexOf("-- ") == 0) ?
                  ("  <option value = '" + lines[i].substring(3) + "'>" + lines[i].substring(3) + "</option>\n") :
                  (" <optgroup label='" + lines[i] + "' />\n");
            }

            comboString += "</select>\n<br />";
            label.innerHTML = comboString + label.innerHTML;
        }
    }

    request.send(null);
 }

 function onStdReasonChange()
 {
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
        document.getElementById("wpReason").value = value;
 }

function fixSearch()
{
    var button = document.getElementById('searchSubmit');

    if(button)
        button.name = 'go';
}

var featuredArticles = '||';

function markFeatured()
{
 var body, lnk, mm, article, mark, i;
 if (!(body = document.getElementById('bodyContent'))) return;
 var links = body.getElementsByTagName('A');
 for (i=0; i<links.length; i++)
 {
   lnk = links[i];
   if (!lnk.title || lnk.href.match('#')) continue;
   article = '|' + decodeURIComponent(lnk.title) + '|';
   if(featuredArticles.indexOf(article) < 0) continue;
   
   mark = document.createElement('img');
   mark.src = "https://images.wikia.nocookie.net/absurdopedia/images/3/33/Small_skew_star.gif";
   mark.title = "Это избранная статья";
   lnk.parentNode.insertBefore(mark, lnk);
 }
}



addOnloadHook(onPageInit);

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
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
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
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
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  } 
  addOnloadHook( createNavigationBarToggleButton );

/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','Моя страница пользователя');
ta['pt-anonuserpage'] = new Array('.','Страница пользователя для моего IP');
ta['pt-mytalk'] = new Array('n','Моя страница обсуждений');
ta['pt-anontalk'] = new Array('n','Страница обсуждений для моего IP');
ta['pt-preferences'] = new Array('','Мои настройки');
ta['pt-watchlist'] = new Array('l','Список страниц моего наблюдения');
ta['pt-mycontris'] = new Array('y','Список страниц, которые я редактировал');
ta['pt-login'] = new Array('o','Здесь можно зарегистрироваться в системе, но это необязательно');
ta['pt-anonlogin'] = new Array('o','Здесь можно зарегистрироваться в системе, но это необязательно');
ta['pt-logout'] = new Array('o','Отказаться от регистрации');
ta['ca-talk'] = new Array('t','Обсуждение статьи');
ta['ca-edit'] = new Array('e','Эту статью можно изменять. Перед сохранением изменений, пожалуйста, нажмите кнопку предварительного просмотра для визуальной проверки результата');
ta['ca-addsection'] = new Array('+','Добавить комментарий к обсуждению');
ta['ca-viewsource'] = new Array('e','Эта страница защищена от изменений, но вы можете посмотреть и скопировать её исходный текст');
ta['ca-history'] = new Array('h','Журнал изменений страницы');
ta['ca-protect'] = new Array('=','Защитить страницу от изменений');
ta['ca-delete'] = new Array('d','Удалить эту страницу');
ta['ca-undelete'] = new Array('d','Восстановить исправления страницы, сделанные до того, как она была удалена');
ta['ca-move'] = new Array('m','Переименовать страницу');
ta['ca-watch'] = new Array('w','Добавить эту страницу в ваш список наблюдения');
ta['ca-unwatch'] = new Array('w','Удалить эту страницу из вашего списка наблюдения');
ta['search'] = new Array('f','Искать это слово');
ta['p-logo'] = new Array('','Заглавная страница');
ta['n-mainpage'] = new Array('z','Перейти на заглавную страницу');
ta['n-portal'] = new Array('','О проекте, о том, что вы можете сделать, где что находится');
ta['n-currentevents'] = new Array('','Список текущих событий');
ta['n-recentchanges'] = new Array('r','Список последних изменений');
ta['n-randompage'] = new Array('x','Посмотреть случайную страницу');
ta['n-help'] = new Array('','Справочник по проекту «{{SITENAME}}»');
ta['n-sitesupport'] = new Array('','Поддержите проект');
ta['t-whatlinkshere'] = new Array('j','Список всех страниц, которые ссылаются на эту страницу');
ta['t-recentchangeslinked'] = new Array('k','Последние изменения в страницах, которые ссылаются на эту страницу');
ta['feed-rss'] = new Array('','Трансляция в формате RSS для этой страницы');
ta['feed-atom'] = new Array('','Трансляция в формате Atom для этой страницы');
ta['t-contributions'] = new Array('','Список страниц, которые изменял этот участник');
ta['t-emailuser'] = new Array('','Отправить письмо этому участнику');
ta['t-upload'] = new Array('u','Загрузить изображения или мультимедиа-файлы');
ta['t-specialpages'] = new Array('q','Список служебных страниц');
ta['t-print']=new Array('', 'Версия без кнопок, пригодная для распечатки');
ta['t-permalink'] = new Array('', 'Ссылка на текущую версию этой статьи');
ta['ca-nstab-main'] = new Array('c','Содержание статьи');
ta['ca-nstab-user'] = new Array('c','Персональная страница участника');
ta['ca-nstab-media'] = new Array('c','Мультимедиа-файл');
ta['ca-nstab-special'] = new Array('','Это служебная страница, она недоступна для редактирования');
ta['ca-nstab-wp'] = new Array('a','Страница проекта');
ta['ca-nstab-image'] = new Array('c','Страница изображения');
ta['ca-nstab-mediawiki'] = new Array('c','Страница сообщения MediaWiki');
ta['ca-nstab-template'] = new Array('c','Страница шаблона');
ta['ca-nstab-help'] = new Array('c','Страница справки');
ta['ca-nstab-category'] = new Array('c','Страница категории');

/* </nowiki></pre> */