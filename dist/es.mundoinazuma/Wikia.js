//Notificación/
$('body').after('<ul class="WikiaNotifications" id="WikiaNotifications"><li style="font-family:Open Sans;font-size:13px;"><div data-type="2">Entra en nuestro nuevo Foro</div></li></ul>');

//Reversor/
(function () {
        "use strict";
        var userRightsList = {
            "Ruto2002": ["Reversor"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());

 
(function () {
        "use strict";
        var userRightsList = {
            "NataliaELF13": ["Retirado"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
// Enlaces en el menú de usuario /
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Blogs</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
/* No modificar, galería  Obtenido junto con el botón volver de DC wiki*/
// Botón galería
$(document).ready(function() { 
  $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary photogallery" href="/wiki/Galería:'+ encodeURIComponent(wgPageName) +'" title="Ver la galería de imágenes"><img src="https://images.wikia.nocookie.net/ben10/es/images/e/e2/Photogallery.png" style="height:20px; vertical-align:middle;" /> Galería</a>');
});
 
// Botón volver
$(document).ready(function() { 
  $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary articlegallery" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Volver al artículo original"><img src="https://images.wikia.nocookie.net/ben10/es/images/4/4f/Volver.gif" style="height:20px; vertical-align:middle;" /> Volver</a>');
});
 
// 23:19, January 5, 2012 (UTC)
// <source lang="JavaScript">
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
// </source>

//Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');