// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'En busca de la leyenda' };
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('HideRail/code.js', 'dev');

/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
 
importScriptPage('SocialIcons/code.js','dev');