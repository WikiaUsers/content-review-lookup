/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);

// Tags detallados en perfiles
// 
// *************************************************
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "Muro" || wgCanonicalNamespace == "Usuario_Blog" || wgPageName.indexOf("Especial:Contribuciones") != -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "25px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');