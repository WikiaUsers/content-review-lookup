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
// Reference pop-ups
importScriptPage('ReferencePopups/code.js', 'dev');

/* Checklist interativo da Predefinição:Caixa Dica — sem dependências externas */
mw.hook('wikipage.content').add(function ($content) {
    var items = $content[0].querySelectorAll('.dica-check');
    items.forEach(function (item) {
        if (item.dataset.dicaBound) return; // evita ligar o evento duas vezes
        item.dataset.dicaBound = '1';
        item.setAttribute('role', 'checkbox');
        item.setAttribute('aria-checked', 'false');
        item.setAttribute('tabindex', '0');

        function toggle() {
            var marcado = item.classList.toggle('dica-check--marcado');
            item.setAttribute('aria-checked', marcado ? 'true' : 'false');
        }

        item.addEventListener('click', toggle);
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
});