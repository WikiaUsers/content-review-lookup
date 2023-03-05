/* Novos botões na barra de ferramentas */
/** Botão Redirecionamento **/
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
 'Redirecionamento',
 '#REDIRECIONAMENTO [[',
 ']]',
 'nome do destino',
 'mw-editbutton-redirect');
/* põe a última aba como aberta por padrão em infoboxes específicas */
mw.hook('wikipage.content').add(function() {
  if (!$('.portable-infobox.type-last-tab').length) return;
  var pi_wdsTabs = $('.type-last-tab .pi-image-collection .wds-tabs');
  $(pi_wdsTabs).animate({ scrollLeft: pi_wdsTabs.width() }, 200);
  $('.type-last-tab .pi-image-collection.wds-tabber .wds-tabs__tab').last().click();
});