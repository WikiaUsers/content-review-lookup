/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */

$('ul.pi-image-collection-tabs li.pi-tab-link').each(function() {
  $this = $(this);
  $this.text($this.text().trim());
  $this.attr('title',$this.text());
});