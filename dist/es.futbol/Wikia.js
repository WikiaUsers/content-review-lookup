var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "28px",
	wikiTwitterAccount: "default"
};
importScriptPage('SocialIcons/code.js','dev');

// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
// Etiquetas de permisos adicionales 
importScript('MediaWiki:Wikia.js/userRightsIcons.js');