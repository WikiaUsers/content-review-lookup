/* Botón (Red Social) Compartir */

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};

importScriptPage('SocialIcons/code.js','dev');

// Etiqueta para usuarios inactivos por más de 3 meses

InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');