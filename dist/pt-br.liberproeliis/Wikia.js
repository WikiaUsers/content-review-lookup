/* Adiciona o label "inativo" nos perfis de quem n�o edita h� no m�ximo 2 meses */
InactiveUsers = { 
	months: 1,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');