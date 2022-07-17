if($('#mover').length) {
   $('<span class="upon-moving">'+$('#mover').html()+'</span>').appendTo('.page-header__actions');
   $('#mover').remove();
}
if($('.user-status').length) {
   $('<span class="upon-moving-status">'+$('.user-status').html()+'</span>').appendTo('.status-placeholder');
   $('.user-status').remove();
}