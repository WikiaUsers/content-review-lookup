/* T�tulos no Perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* Usu�rios Inativos */
InactiveUsers = { 
	months: 2,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Ver C�digo da P�gina */
importScriptPage('View_Source/code.js', 'dev');

/* Substitui o "Um contribuidor da Wikia" pelo IP do an�nimo */
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Men��es legais no final da p�gina */
$(function(){
     $('#WikiaPage .WikiaPageContentWrapper').append('<div class="gradienteV_principal" style="text-align:center; color:white; font-size:x-small; text-shadow: #555 1px 1px 3px; box-shadow: 0 0 10px 0 #888; margin:0px 10px 10px 10px; padding:5px;">Este site n�o � recomendado ou afiliado com a Electronic Arts ou seus licenciadores.<br />Todas as marcas pertencem a seus respectivos propriet�rios.<br /></div>');
});