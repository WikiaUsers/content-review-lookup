/* Enlaces en el men� de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);

//Reglas del chat
 
$(function() {
    $('p.chat-name').html('<a href="/wiki/High School DxD Wiki:Pol�ticas">Normas de uso</a>');
});
 
// Etiqueta para usuarios inactivos por m�s de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');