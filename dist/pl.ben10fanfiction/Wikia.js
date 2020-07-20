/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary photogallery" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://images.wikia.nocookie.net/ben10-fanon/pl/images/8/8f/Przycisk-Galeria.png" style="height:20px; vertical-align:middle;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 112 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary articlegallery" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/ben10-fanon/pl/images/9/99/Przycisk-Powr%C3%B3t.png" style="height:20px; vertical-align:middle;" /> Powrót</a>');
  }
});