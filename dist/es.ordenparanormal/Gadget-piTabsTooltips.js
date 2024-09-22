// para casos donde no es posible leer el texto completo de la pestaña por terminar cortando
$('ul.pi-image-collection-tabs li.pi-tab-link').each(function() {
  $this = $(this);
  $this.text($this.text().trim());
  $this.attr('title',$this.text());
});