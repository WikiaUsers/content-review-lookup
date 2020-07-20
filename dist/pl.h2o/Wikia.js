/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://vignette.wikia.nocookie.net/charmed/images/7/74/Galeria.png/revision/latest?cb=20160530213247&path-prefix=pl" style="vertical-align:text-bottom;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 112 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://vignette.wikia.nocookie.net/charmed/images/f/f2/Powrót.gif/revision/latest?cb=20160530213257&path-prefix=pl" style="vertical-align:text-bottom;" /> Powrót</a>');
  }
});