$(function() {
  $('.tools li:last-child').after('<li class="abrepanel"><a class="abrirpanel">Abrir panel</a></li>');
  $('.tools li:last-child').after('<li class="cierrapanel"><a class="cerrarpanel">Cerrar panel</a></li>');
  $('.tools .cierrapanel').hide();
  $('.tools .abrirpanel').click(function() {
    $('.WikiaSearch').after('<section class="PersonalModule module"><h1>Panel personal</h1><div class="contenido"></div></div>');
    $(function(){
      $.getJSON('/api.php?action=parse&text={{:User:' + wgUserName + '/panel}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('.PersonalModule .contenido').append(code);
      });
    });
    $('.tools .abrepanel').hide();
    $('.tools .cierrapanel').show();
  });
  $('.tools .cerrarpanel').click(function() {
    $('.tools .cierrapanel').hide();
    $('.tools .abrepanel').show();
    $('.PersonalModule').hide();
  });
});