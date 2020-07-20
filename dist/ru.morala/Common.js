/* <pre> */
 
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
 
importScript("MediaWiki:Dynavbar.js");
if(wgAction)
{
    if(wgAction == 'edit' || wgAction == 'submit')
    {
        importScript("MediaWiki:Edit.js");
    }
}
importScript("MediaWiki:SHJS.js");
importScript("MediaWiki:ProtectGlobal.js");
 
if(wgUserGroups)
{
    if(wgUserGroups.indexOf('sysop') != -1)
        importScript("MediaWiki:Sysop.js");
}
 
function onPageInit()
{
    do_nihilism();
    do_memory_eraser();
    editZeroSection();
    hide_bad_iwiki();
    sysdep_init();
    fixSearch();
    yandex_rating_banner();
    rewrite_title();
    UserNameReplace();
    noLogo();
    defaultUploadInfo();
 
    createNavigationBarToggleButton(); /* [[MediaWiki:Dynavbar.js]] */
 
    if(typeof onPageLoad != "undefined")
    {
        onPageLoad();
    }
}
 
/* Маскируем неправильно настроенные интервики — Edward. */
function hide_bad_iwiki()
{
  for(var i = 0; i < document.links.length; i ++)
  {
    if(document.links[i].href.match("title=(Km|Lo|Ms|Oc|Nn):"))
      document.links[i].innerHTML = "";
  }
}
 
/* Индекс цитирования (тИЦ) */
function yandex_rating_banner()
{
  txt = document.getElementById('yandex_rating');
  if(txt)
  {
    txt.innerHTML = '<a href="http://yaca.yandex.ru/yca/cat/Entertainment/Humor/Puns/"><img src="http://www.yandex.ru/cycounter?absurdopedia.wikia.com" title="Индекс цитирования (тИЦ) Абсурдопедии" /></a>';
  }
}
 
/* Обеспечиваем фокус с {{sysdep}} — Edward. */
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
 
/* Обеспечиваем нигилистические фокусы — Edward (см., например, статью [[Google]]) */
function do_nihilism()
{
  nhl = document.getElementById('nihilism');
  if(nhl && !document.location.href.match("diff") && ( wgPageName == 'Ловушка' || wgPageName == 'Нигилизм'))
  {
    msg = nhl.innerHTML;
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = 'white';
    body.innerHTML = "<div id='nihilism_message'" + (nhl.style.top == "0px" ? " style='top: 0px; left: 0px;'" : "") + ">" + msg + "</div>";    
  }
}
 
/* Заставляем работать шаблон {{title}} (удалить этот код, когда заработает {{DISPLAYTITLE}}) */
function rewrite_title()
{
  if(wgAction == "view")
  {
    p = document.getElementById('correctTitle');
    if(p)
    {
      document.getElementById('firstHeading').innerHTML = p.innerHTML;
      document.getElementById('wrongTitle').style.display = "none";
    }
  }
}
 
/* Обеспечиваем стирание памяти для «Людёй в чёрном» */
function do_memory_eraser()
{
  era = document.getElementById('erase_memory');
  if(era)
  {
    setTimeout("era.style.display='none'", 5000);
  }
}
 
/* + ссылка «править» для нулевой секции. */
function editZeroSection(){
 var body = document.getElementById('bodyContent')
 if (!body) return
 var h2s = body.getElementsByTagName('H2')
 var h2 = h2s[0]
 if (!h2) return
 if (h2.parentNode.id == 'toctitle') h2 = h2s[1]
 if (!h2) return
 var span = h2.firstChild
 if (!span || span.className != 'editsection') return
 var zero = span.cloneNode(true)
 body.insertBefore(zero, body.firstChild)
 var a = zero.getElementsByTagName('a')[0]
 if (a.href.indexOf('&section=T') == -1 )  a.title = a.title.replace(/:.*$/,': 0')
 else a.title = 'Править секцию: 0'
 a.setAttribute('href', wgScript + '?title='+encodeURIComponent(wgPageName) + '&action=edit&section=0')
}
 
function fixSearch()
{
    var button = document.getElementById('searchSubmit');
 
    if(button)
        button.name = 'go';
}
 
/* Вставка юзернейма с помощью <span class="insertusername"></span> */
function UserNameReplace()
{
	if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null)
		return;
 
        var bc = document.getElementById('bodyContent');
        if(!bc) return;
        var spans = document.getElementsByTagName('span');
        if(!spans) return;
        var i;
        for(i = 0; i < spans.length; i ++) 
        {
           if(spans[i].className == 'insertusername')
             spans[i].innerHTML = wgUserName;
	}
}
 
addOnloadHook(UserNameReplace);
 
/* Прописываем для нужных страниц индивидуальные стили */
/* Записи имеют вид <имя страницы>:<имя стиля>. При этом должна существовать страница [[MediaWiki:Skin/<имя стиля>]], которая и будет включена. Записи разделяются через запятую.*/
reskin = {
    "ААААААААА!": "Aaaa.css"
}
 
/* Применяем для нужных страниц индивидуальные стили. Код нагло стырен из Анциклопедии */
if (reskin[wgPageName] != undefined && wgIsArticle == true) {
     skinName = (reskin[wgPageName].length > 0) ? reskin[wgPageName] : wgPageName + '.css';
     document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }
 
/* {{nologo}} */
function noLogo() { if(document.getElementById('nologo'))
  document.getElementById('p-logo').style.display = 'none';
}
 
function defaultUploadInfo()
{
  var rewrite = document.getElementById('wpForReUpload');
  if(!rewrite) return;
  if(rewrite.value == 1) return;
 
  var d = document.getElementById('wpUploadDescription');
  if(d) {
    if(!d.value.match(/\[\[(Категория|Category):/)) {
      d.value += "\n\n\n[[Категория:Некатегоризованные изображения]]";
    }
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
 
/* </pre> */



 // *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
 //  </span>
 //  <span class="nocountdown">Javascript disabled.</span>
 
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   //set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);
 
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************