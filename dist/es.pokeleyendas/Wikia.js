/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
 
/* No modificar, galería */
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