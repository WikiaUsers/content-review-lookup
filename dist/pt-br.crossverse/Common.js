/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
// Aplica glitch na primeira palavra de cada div com .fandom-glitchbox
$(document).ready(function() {
  $('.fandom-glitchbox').each(function() {
    var $box = $(this);
    var text = $box.attr('data-text'); // primeira palavra que vai ter glitch
    if (!text) return;

    // Cria os elementos internos
    var $shadow1 = $('<span class="glitch-shadow1"></span>').text(text);
    var $shadow2 = $('<span class="glitch-shadow2"></span>').text(text);
    var $main = $('<span class="glitch-main"></span>').text(text);

    // Wrapper da primeira palavra
    var $wrapper = $('<span class="glitch-word"></span>').append($shadow1, $shadow2, $main);

    // Substitui a primeira palavra no HTML original
    var html = $box.html();
    var rest = html.replace(text, '').trim();
    $box.empty().append($wrapper).append(' ' + rest);
  });
});