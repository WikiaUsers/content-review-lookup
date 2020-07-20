//Link to strony administracji na karcie "Na Wiki" w menu nawigacji
$(document).ready(function() {
 $('.WikiHeaderRestyle > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Kuroko_no_Basuke_Wiki:Administratorzy">Administracja</a></li>');
});

/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary photogallery" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://images.wikia.nocookie.net/bleach/pl/images/7/74/Galeria.png" style="height:20px; vertical-align:middle;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 112 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary articlegallery" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/bleach/pl/images/f/f2/Powr%C3%B3t.gif" style="height:20px; vertical-align:middle;" /> Powrót</a>');
  }
});