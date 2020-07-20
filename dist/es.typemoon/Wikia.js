importArticles({
    type: "script",
    articles: [
       "MediaWiki:Wikia.js/Slider.js"
    ]
});

/*** Oasis sitenotice *******************************************************
 *Muestra el SiteNotice en cada pantalla de la Wikia
 *Se muestra como los avisos normales de la Wikia
 *Debe ser editado manualmente despues de editar MediaWiki:Sitenotice
    y MediaWiki:Sitenotice id

 *Creado por JBed de FF Wiki
 *Editado por RikuNoctis de TM Wiki
 ****************************************************************************/
//Cómo editar la Oasis SiteNotice:
//Ingresa a una página en Monobook usando ?useskin=monobook en la URL,
//haz click derecho y selecciona "Ver código fuente de la página" en tu browser,
//Ctrl+F, teclea "siteNoticeID".
//Aquí se encontraran 2 líneas,
//una empezando "var siteNoticeID", la otra "var siteNotice",
//copia ambas líneas y pégalas en las líneas respectivas aquí debajo. 
var siteNoticeID = "1.1";
var siteNoticeValue = "\x3cdiv id=\"localNotice\" lang=\"es\" dir=\"ltr\"\x3e\x3cp\x3e¡Bienvenido a TYPE-MOON Wiki en español!\n\x3cbr /\x3e\nPuedes empezar a contribuir editando los temas en la categoría de \x3ca href=\"/wiki/Categor%C3%ADa:Esbozos\" title=\"Categoría:Esbozos\" class=\"newcategory\"\x3eEsbozos\x3c/a\x3e o en la sección de \x3ca href=\"/wiki/Especial:P%C3%A1ginasRequeridas\" title=\"Especial:PáginasRequeridas\"\x3ePáginas Requeridas\x3c/a\x3e.\nSi necesitas ayuda con la edición, puedes visitar \x3ca href=\"/wiki/Ayuda:Edici%C3%B3n\" title=\"Ayuda:Edición\"\x3eAyuda\x3c/a\x3e.\n\x3c/p\x3e\x3c/div\x3e";
 
if(siteNoticeValue!="")
{
  var cookieValue = "";
  var cookieName = "dismissSiteNotice=";
  var cookiePos = document.cookie.indexOf(cookieName);
 
  if (cookiePos > -1)
  {
    cookiePos = cookiePos + cookieName.length;
    var endPos = document.cookie.indexOf(";", cookiePos);
    if (endPos > -1)
    {
      cookieValue = document.cookie.substring(cookiePos, endPos);
    }
    else
    {
      cookieValue = document.cookie.substring(cookiePos);
    }
  }
  if (cookieValue != siteNoticeID)
  {
    function dismissNotice()
    {
      var date = new Date();
      date.setTime(date.getTime() + 30*86400*1000);
      document.cookie = cookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
      var element = document.getElementById('mw-dismissable-notice');
      element.parentNode.removeChild(element);
    }
    var notice = document.createElement("li");
    notice.id = "mw-dismissable-notice";
    notice.innerHTML = siteNoticeValue;
    var WikiaNotif = document.getElementById("WikiaNotifications");
    if(WikiaNotif)
    {
      var belowElement = WikiaNotif.getElementsByTagName("ul")[0];
      WikiaNotif.insertBefore(notice,belowElement);
      var getNotice = document.getElementById("localNotice");
      getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
    }
    else
    {
      var barWrapper = document.getElementById("WikiaBarWrapper");
      if(barWrapper)
      {
        var WikiaNotif = document.createElement("ul");
        WikiaNotif.id = "WikiaNotifications";
        WikiaNotif.className = "WikiaNotifications";
        barWrapper.parentNode.insertBefore(WikiaNotif,barWrapper);
        WikiaNotif.appendChild(notice);
        var getNotice = document.getElementById("localNotice");
        getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
      }
    }
  }
}

importScriptPage('BackToTopButton/code.js', 'dev');