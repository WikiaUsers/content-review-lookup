if($('.headerek').length) {
   $('<div class="nowyautor">'+$('.headerek').html()+'</div>').appendTo('.page-header__top');
   $('.headerek').remove();
}