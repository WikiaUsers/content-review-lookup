/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Automático';
window.AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Registro",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];
 
  /********************************/
  /* Tooltips for the media icons */
  /********************************/
 
  $('#media-icons a').tooltip();
  
  
  // Expand All
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag === 0){
        $('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
        expandAllFlag = 1;
        $expandAll.text('Collapse All');
    } else {
        $('.mw-collapsible .mw-collapsible-toggle-expanded').click();
        expandAllFlag = 0;
        $expandAll.text('Expand All');
    }
});
// END of Expand All