$(function(){
  $('body').html('<iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/CjytAc-quyI?rel=0&autoplay=1&t=36s" frameborder="0" allowfullscreen></iframe>');
  $('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });

  $(window).resize(function(){
    $('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
  });
});