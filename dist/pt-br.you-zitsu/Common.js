/*Todos os créditos são do You-Zitsu Wiki https://you-zitsu.wikia.com. Você não está autorizado a replicar ou copiar os codigos / design sem a permissão de um administrador.*/

/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */
 
(function (window, $, mw) {
	"use strict";
 
	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];

// Configure AjaxRC
importScriptPage('AjaxRC/code.js', 'dev');
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity",
		"Special:Images"
	);
	window.AjaxRCRefreshText = 'Atualização Automática';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');


/* On Interlanguage Hover Icon */
$(function(){
 // Setup language selector
 $('#langdiv img').each(function(){
  $(this).css({'height':'auto','width':'150px'});
 });
 $('#langdiv img').hover(function(){
  $(this).animate({width:'180px'},'fast');
  $('#langdiv span').text($(this).attr('alt'));
 },function(){
  $('#langdiv span').text('You-Zitsu Wiki em Outras Línguas');
  $(this).animate({width:'150px'},'fast');
 });
});

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log/Auto-Statistics",
    loadOnPage:'Special:WikiActivity',
    autoLogForUsers:["User:Bagwis","User:Iale5000","User:Nayeonie"],
    lang:'pt-br',
    loadOnNamespace:[-1],
};

/* Replaces {{username}} with the name of the user browsing the page. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

}(window, jQuery, mediaWiki));