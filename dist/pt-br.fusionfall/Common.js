/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
// Veja tamb�m: MediaWiki:Wikia.js & MediaWiki:ImportJS

/* Play button */
$('#play').replaceWith('<a href="http://www.fusionfalluniverse.com/splashpage/"><div id="play"></div></a>');

/* Atualiza��o autom�tica */
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Watchlist', 'Log', 'Contributions'];
window.AjaxRCRefreshText = 'Atualiza��o autom�tica';
window.AjaxRCRefreshHoverText = 'Atualiza a p�gina automaticamente';