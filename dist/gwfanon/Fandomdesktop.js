// Template:Autor (EN: Author)
if($('.headerek').length) {
   $('<div class="nowyautor">'+$('.headerek').html()+'</div>').appendTo('.page-header__top');
   $('.headerek').remove();
}

// Template:ZobaczTeż (EN: SeeAlso)
if($('.podgłówek').length) {
   $('<div class="page-header__page-subtitle alternatywny-podgłówek">'+$('.podgłówek').html()+'</div>').appendTo('.page-header__title-wrapper');
   $('.podgłówek').remove();
}