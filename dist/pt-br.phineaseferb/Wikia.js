/* �cones de Rede Social */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "21px"
};
importScriptPage('SocialIcons/code.js','dev');

/* IP como nome padr�o para contribuidores an�nimos */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Label Inativo para usu�rios sem atividades h� mais de 3 meses */
InactiveUsers = { 
	months: 3,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');