/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/7/74/Galeria.png" style="vertical-align:middle;" /> Galeria</a>');
  }
});

window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://vignette.wikia.nocookie.net/pl.sims/images/c/c2/TS4_Placeholder_Lama.png/revision/latest',
    },

window.BackToTopModern = true);