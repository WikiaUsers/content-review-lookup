/* Ícones de Rede Social */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "21px"
};
importScriptPage('SocialIcons/code.js','dev');

/* IP como nome padrão para contribuidores anônimos */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Label Inativo para usuários sem atividades há mais de 3 meses */
InactiveUsers = { 
	months: 3,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');