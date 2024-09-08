/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

importScriptPage('SpoilerAlert/code.js', 'dev');
 
window.railWAM = {
    logPage:"Project:WAM Log"
};

// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');
 
/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Automático';
window.AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];

// Importadas da Wiki Lucifer //

jQuery(document).ready(function($) {
    $(".lucifer-js-click td").click(function() {
        window.document.location = $(this).data("href");
    });
});
 
 
jQuery(document).ready(function($) {
    $(".lucifer-js-click .mp-character-portal").click(function() {
        window.document.location = $(this).data("href");
    });
});