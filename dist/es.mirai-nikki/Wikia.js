// Enlaces en el menú de usuario 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
 
//Reglas del chat
 
$(function() {
    $('p.chat-name').html('<a href="/wiki/Naruto_Wiki:Políticas">Normas de uso</a>');
});
 
// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
// Etiquetas de permisos adicionales 
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// Tags detallados en perfiles
// 
// *************************************************
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "Muro" || wgCanonicalNamespace == "Usuario_Blog" || wgPageName.indexOf("Especial:Contribuciones") != -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}
 
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');