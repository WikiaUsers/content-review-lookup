/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* <pre><nowiki> */

var xhrSummaries, xhrReasons;

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

function onPageInit()
{
    createNavigationBarToggleButton(); /* [[MediaWiki:Dynavbar.js]] */

    if(typeof onPageLoad != "undefined")
    {
        onPageLoad();
    }
}

addOnloadHook(onPageInit);

/* </nowiki></pre> */