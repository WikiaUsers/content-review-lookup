/* Guia "dep�sito" na p�gina de usu�rio */
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    $(".tabs-container > ul.tabs").html(news);
});
 
/* adiciona Dep�sito, minhas contribui��es e tal tal, na account Navigation */
 
function AddNavigationLinks() {

addOnloadHook(AddNavigationLinks);
 
/* t�tulos no perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');