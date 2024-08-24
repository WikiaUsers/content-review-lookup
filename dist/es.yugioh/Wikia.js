var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');

/*
*Código para mostrar etiqueta de usuario inactivo,
*Créditos: http://dev.wikia.com/wiki/InactiveUsers
*The original idea to this snippet comes from Sam Wang.
*/

InactiveUsers = {
  text: 'inactivo',
  months: 2
};
importScriptPage('InactiveUsers/code.js', 'dev');