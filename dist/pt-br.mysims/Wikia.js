/* títulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');