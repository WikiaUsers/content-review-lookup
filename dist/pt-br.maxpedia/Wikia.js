/* Guia "depósito" na página de usuário */
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    $(".tabs-container > ul.tabs").html(news);
});
 
/* adiciona Depósito, minhas contribuições e tal tal, na account Navigation */
 
function AddNavigationLinks() {

addOnloadHook(AddNavigationLinks);
 
/* títulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');