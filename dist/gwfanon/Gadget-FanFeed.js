if($('.mcf-card-wiki-articles').length) {
   $('<section class="SeeAlso"><h2>'+$('.mcf-card-wiki-articles').html()+'</section>').appendTo('#WikiaArticleFooter');
   $('.mcf-card-wiki-articles').remove();
}