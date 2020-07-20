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
 
// importArticles({  type: 'script',  articles: [  'u:dev:SexyUserPage/code.js'  ]  });