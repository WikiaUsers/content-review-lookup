/* C�digo Javascript colocado aqui ser� carregado para todos os utilizadores em cada carregamento de p�gina */

$('ul.pi-image-collection-tabs li.pi-tab-link').each(function() {
  $this = $(this);
  $this.text($this.text().trim());
  $this.attr('title',$this.text());
});