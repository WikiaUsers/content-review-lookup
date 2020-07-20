/* <pre><nowiki> */

var xhrSummaries, xhrReasons;

document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://absurdopedia.wikia.com/index.php?title=MediaWiki:Wikifier.js&action=raw&ctype=text/javascript&dontcountme=s\"></script>");

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
    fillEditSummaries();
    fillDeleteReasons();
    do_nihilism();
    do_edit_null();
    hide_bad_iwiki();
    sysdep_init();
    fixSearch();
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

/* Обеспечиваем нигилистические фокусы — (C) Edward (см., например, статью [[Google]]) */
function do_nihilism()
{
  nhl = document.getElementById('nihilism');
  if(nhl)
  {
    msg = nhl.innerHTML;
    document.getElementById('globalWrapper').innerHTML = "<div id='nihilism_message'>" + msg + "</div>";    
  }
}

/* Делаем ссылку «править» для нулевой секции — (C) Edward. */
function do_edit_null()
{ 
  if(document.getElementById('bodyContent').innerHTML.match('class=\"editsection\"'))
    document.getElementById('bodyContent').innerHTML = "<div class=\"editsection\" id=\"ca-edit-0\">[<a href=\"http://absurdopedia.wikia.com/index.php?title=" + document.title.substr(0, document.title.lastIndexOf(" — ")) + "&action=edit&section=0\">править</a>]</div>" + document.getElementById('bodyContent').innerHTML;
}

 function fillEditSummaries()
 {
    var label = document.getElementById("wpSummaryLabel");

    if(label == null)
    {
        return;
    }

    var comboString = "Стандартные описания:\n<select id='stdSummaries' onchange='onStdSummaryChange()'>\n  <option value=''>&lt;выберите из списка&gt;</option>";  
    var request;

    try
    {
        request = new XMLHttpRequest();
    }
    catch(e)
    {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    }

    xhrSummaries = request;
    request.open("GET", "http://absurdopedia.wikia.com/index.php?title=Шаблон:Stdsummaries&action=raw&ctype=text/plain");

    request.onreadystatechange = function()
    {
        if(xhrSummaries.readyState == 4)
        {
            var lines = xhrSummaries.responseText.split("\n");
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

 function onStdSummaryChange()
 {
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
    {
        var box = document.getElementById("wpSummary");

        var sstring = /\/\*(.*)\*\//.exec(box.value);
        if(sstring)
          box.value = sstring[0] + " " + value;
        else
          box.value = value;
    }
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

    request.open("GET", "http://absurdopedia.wikia.com/index.php?title=Шаблон:Stdreasons&action=raw&ctype=text/plain");
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

var featuredArticles = '|Магия|';

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