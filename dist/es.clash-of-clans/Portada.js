$(function() {
  var defensivos = $('.edificios .desc .defensivos').html(),
      ejercito   = $('.edificios .desc .ejército').html(),
      recursos   = $('.edificios .desc .recursos').html(),
      otros      = $('.edificios .desc .otros').html(),
      uno        = $('.tropas .desc .uno').html(),
      dos        = $('.tropas .desc .dos').html(),
      tres       = $('.tropas .desc .tres').html(),
      oscuras    = $('.tropas .desc .oscuras').html(),
      heroes     = $('.tropas .desc .héroes').html();
  $('.edificios tr + tr').hide();
  $('.desc div').hide();
  $('.edificios th').click(function() {
    $('.edificios tr + tr').toggle('slow', 'swing');
  });
  $('.edificios .defensivos').click(function() {
    $('.edificios .division td').removeClass('color');
    $('.edificios .division .defensivos').addClass('color');
    $('.edificios .desc').html(defensivos);
  });
  $('.edificios .ejército').click(function() {
    $('.edificios .division td').removeClass('color');
    $('.edificios .division .ejército').addClass('color');
    $('.edificios .desc').html(ejercito);
  });
  $('.edificios .recursos').click(function() {
    $('.edificios .division td').removeClass('color');
    $('.edificios .division .recursos').addClass('color');
    $('.edificios .desc').html(recursos);
  });
  $('.edificios .otros').click(function() {
    $('.edificios .division td').removeClass('color');
    $('.edificios .division .otros').addClass('color');
    $('.edificios .desc').html(otros);
  });
  $('.tropas tr + tr').hide();
  $('.tropas th').click(function() {
    $('.tropas tr + tr').toggle('slow', 'swing');
  });
  $('.tropas .uno').click(function() {
    $('.tropas .division td').removeClass('color');
    $('.tropas .division .uno').addClass('color');
    $('.tropas .desc').html(uno);
  });
  $('.tropas .dos').click(function() {
    $('.tropas .division td').removeClass('color');
    $('.tropas .division .dos').addClass('color');
    $('.tropas .desc').html(dos);
  });
  $('.tropas .tres').click(function() {
    $('.tropas .division td').removeClass('color');
    $('.tropas .division .tres').addClass('color');
    $('.tropas .desc').html(tres);
  });
  $('.tropas .oscuras').click(function() {
    $('.tropas .division td').removeClass('color');
    $('.tropas .division .oscuras').addClass('color');
    $('.tropas .desc').html(oscuras);
  });
  $('.tropas .héroes').click(function() {
    $('.tropas .division td').removeClass('color');
    $('.tropas .division .héroes').addClass('color');
    $('.tropas .desc').html(heroes);
  });
});