// Editar introducción de los artículos
EditIntroButtonText = 'Editar introducción';
importScriptPage('EditIntroButton/code.js', 'dev');
// Botón para ir arriba
importScriptPage('BackToTopButton/code.js', 'dev');
// IP de anónimos
importScriptPage('RevealAnonIP/usercode.js', 'dev');
// Slider de tiempo
importScriptPage('TimedSlider/code.js', 'dev');
// Actualizar página
PurgeButtonText = 'Actualizar página';
importScriptPage('PurgeButton/code.js', 'dev');
// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
//Navegación de usuarios 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');} 
addOnloadHook(subeEnlacesUtiles);
// Patrullaje de nuevas ediciones [ajax]
importScriptPage('AjaxPatrol/code.js', 'dev');