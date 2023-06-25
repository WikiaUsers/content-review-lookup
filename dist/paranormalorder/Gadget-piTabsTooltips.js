// in cases it's not possible to read the full tab text
$('ul.pi-image-collection-tabs li.pi-tab-link').each(function() {
  $this = $(this);
  $this.text($this.text().trim());
  $this.attr('title',$this.text());
});