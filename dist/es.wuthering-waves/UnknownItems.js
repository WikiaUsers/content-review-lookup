/**
 * Replace missing icons in the "Recursos" template with an "unknown" icon.
 */
$('.recurso__imagen a.new').each(function() {
  $(this).html('<img src="https://static.wikia.nocookie.net/honkai-star-rail/images/5/55/Desconocido.png/revision/latest/scale-to-width-down/320?cb=20230212043003&path-prefix=es" width="80">');
});