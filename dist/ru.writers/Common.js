/* <pre> */
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

var mpTitle = "Заглавная страница";
var isMainPage = (document.title.substr(0, document.title.lastIndexOf(" — ")) == mpTitle);
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

if (isMainPage && !isDiff) 
{
document.write('<style type="text/css">/*<![CDATA[*/ #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
}

 /* подгрузка файла со скриптами для редактирования  *****************************************
 */
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0)
 {
        if (wgCanonicalNamespace != "Special")
        {
                document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
        }
 }

 function addLoadEvent(func) 
 {
 if (window.addEventListener) 
   window.addEventListener("load", func, false);
 else if (window.attachEvent) 
   window.attachEvent("onload", func);
}

// русификация кнопок на панели инструментов
if (wgAction == 'edit' || wgAction == 'submit') 
addOnloadHook(function(){
 if (mwEditButtons.length < 3) return;
 mwEditButtons[0].imageFile = 'http://upload.wikimedia.org/wikipedia/ru/9/9a/Button_boldru.png';
 mwEditButtons[1].imageFile = 'http://upload.wikimedia.org/wikipedia/ru/8/88/Button_italicru.png';
 mwEditButtons[2].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/0/03/Button_internal_link_ukr.png'
})

/* </pre> */