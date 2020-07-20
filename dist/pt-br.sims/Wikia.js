/* Títulos no Perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Usuários Inativos */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Ver Código da Página */
importScriptPage('View_Source/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do anônimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Menções legais no final da página */
$(function(){
     $('#WikiaPage .WikiaPageContentWrapper').append('<div style="text-align:center; font-size:x-small; line-height:175%; padding:5px;">Este site não é recomendado ou afiliado com a Electronic Arts ou seus licenciadores.<br />Todas as marcas pertencem a seus respectivos proprietários.<br /></div>');
});