/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* tabs*/
$(document).ready(function() {
  $('.collapsible-header').click(function() {
    $(this).parent('.collapsible').toggleClass('collapsed');
  });
});