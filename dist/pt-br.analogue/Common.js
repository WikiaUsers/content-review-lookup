/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

/* tabs*/
$(document).ready(function() {
  $('.collapsible-header').click(function() {
    $(this).parent('.collapsible').toggleClass('collapsed');
  });
});