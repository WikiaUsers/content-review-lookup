// Enlaces en el menú de usuario 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);

// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');