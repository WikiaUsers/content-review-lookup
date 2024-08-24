/* Colores en las infobox port�tiles (w:c:webarebears) */
(function(){
    var infobox = $('.portable-infobox');
    if (infobox.length) {
        var color = '',
        classNames = infobox.attr('class').split(' ');
        for (var i = 0; i < classNames.length; i++) {
            if (classNames[i].indexOf('pi-theme-_') !== -1) {
                color = classNames[i].replace('pi-theme-_', '');
                break;
            }
        }
 
        if (color) {
            infobox.css('border', '1px solid #' + color);
            infobox.find('h2').css('background-color', '#' + color);
 
        }
    }
})();

/***************************************************/

importArticles({
    type: "script",
    articles: [
       "MediaWiki:Wikia.js/Slider.js",
       'u:dev:BackToTopButton/code.js'
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
//C�mo editar la Oasis SiteNotice:
//Ingresa a una p�gina en Monobook usando ?useskin=monobook en la URL,
//haz click derecho y selecciona "Ver c�digo fuente de la p�gina" en tu browser,
//Ctrl+F, teclea "siteNoticeID".
//Aqu� se encontraran 2 l�neas,
//una empezando "var siteNoticeID", la otra "var siteNotice",
//copia ambas l�neas y p�galas en las l�neas respectivas aqu� debajo. 
var siteNoticeID = "1.1";
var siteNoticeValue = '�Bienvenido a Wiki Key!';

function dismissNotice() {
    var date = new Date();
    date.setTime(date.getTime() + 30 * 86400 * 1000);
    document.cookie = cookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
    var element = document.getElementById('mw-dismissable-notice');
    element.parentNode.removeChild(element);
}

if (siteNoticeValue !== "") {
    var cookieValue = "";
    var cookieName = "dismissSiteNotice=";
    var cookiePos = document.cookie.indexOf(cookieName);

    if (cookiePos > -1) {
        cookiePos = cookiePos + cookieName.length;
        var endPos = document.cookie.indexOf(";", cookiePos);
        if (endPos > -1) {
            cookieValue = document.cookie.substring(cookiePos, endPos);
        } else {
            cookieValue = document.cookie.substring(cookiePos);
        }
    }
    if (cookieValue != siteNoticeID) {
        var notice = document.createElement("li");
        notice.id = "mw-dismissable-notice";
        notice.innerHTML = siteNoticeValue;
        var WikiaNotif = document.getElementById("WikiaNotifications");
        if (WikiaNotif) {
            var belowElement = WikiaNotif.getElementsByTagName("ul")[0];
            WikiaNotif.insertBefore(notice, belowElement);
            var getNotice = document.getElementById("localNotice");
            getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
        } else {
            var barWrapper = document.getElementById("WikiaBarWrapper");
            if (barWrapper) {
                var WikiaNotif = document.createElement("ul");
                WikiaNotif.id = "WikiaNotifications";
                WikiaNotif.className = "WikiaNotifications";
                barWrapper.parentNode.insertBefore(WikiaNotif, barWrapper);
                WikiaNotif.appendChild(notice);
                var getNotice = document.getElementById("localNotice");
                getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
            }
        }
    }
}