if($('#mover').length) {
   $('<span class="upon-moving">'+$('#mover').html()+'</span>').appendTo('.page-header__actions');
   $('#mover').remove();
}