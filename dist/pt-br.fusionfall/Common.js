/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
// Veja também: MediaWiki:Wikia.js & MediaWiki:ImportJS

/* Play button */
$('#play').replaceWith('<a href="http://www.fusionfalluniverse.com/splashpage/"><div id="play"></div></a>');

/* Atualização automática */
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Watchlist', 'Log', 'Contributions'];
window.AjaxRCRefreshText = 'Atualização automática';
window.AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';