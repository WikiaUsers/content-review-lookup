// pra casos onde n�o � poss�vel ler o texto completo da aba por acabar cortando
$('ul.pi-image-collection-tabs li.pi-tab-link').each(function() {
  $this = $(this);
  $this.text($this.text().trim());
  $this.attr('title',$this.text());
});