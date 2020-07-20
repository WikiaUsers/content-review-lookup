
/****************************************/
/*Necesario para (Plantilla:Desplegable)*/
/****************************************/
importScriptPage('ShowHide/code.js', 'dev');
/* Texto de la busqueda - by ShermanTheMythran */
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Buscar en esta wiki');
 
/* Code by Seaside98 - Displays timer - Special thanks to Runescape wiki */
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().attr('title','Hora utc de la wikia').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
    else
        $('#p-personal ul').prepend('<li class="Date" id="displayClock" style="float:right;"><a id="showdate"></a></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
});
 
/*Botones elevadores - by ShermanTheMythran*/
$('.WikiaHeader').append('<span id="button-hub" style="position: fixed; top: 0; margin-top: -14px; right: 20px; transition: margin .5s; -moz-transition: margin .5s; -webkit-transition: margin .5s; -o-transition: margin .5s;"><span class="button" id="scroll-top" title="Subir" style="border-radius: 0 0 0 100% / 0 0 0 10px; -moz-border-radius: 0 0 0 100% / 0 0 0 10px; -webkit-border-radius: 0 0 0 100% / 0 0 0 10px;">▲</span>' + '<span class="button" id="scroll-bottom" title="Bajar" style="border-radius: 0 0 100% 0 / 0 0 10px 0; -moz-border-radius: 0 0 100% 0 / 0 0 10px 0; -webkit-border-radius: 0 0 100% 0 / 0 0 10px 0;">▼</span>');
 
$('#scroll-top, .scroll-top').click(function() { $('html, body').animate({scrollTop:0}, 'slow') });
 
$('#scroll-bottom, .scroll-bottom').click(function() { $('html, body').animate({scrollTop:$(document).height()}, 'slow') });
 
 
/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Blogs</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
 
var sn = $('<div data-type="100"><a class="sprite close-notification"></a> <a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">Reunión de Administradores este Domingo</a>!</div>');
 
// 23:19, January 5, 2012 (UTC)
// <source lang="JavaScript">
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
// </source>