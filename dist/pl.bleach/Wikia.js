/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary photogallery" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://images.wikia.nocookie.net/bleach/pl/images/7/74/Galeria.png" style="height:20px; vertical-align:middle;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 112 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary articlegallery" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/bleach/pl/images/f/f2/Powr%C3%B3t.gif" style="height:20px; vertical-align:middle;" /> Powrót</a>');
  }
});

/* Facebook box */
$(window).load(function(){
 
    $('.ChatModule').after('<section class="module" id="facebookmodule"><iframe style="border: 0; height: 231px; margin: 0; overflow: hidden; width: 268px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fbleach.wiki&width=268&heightcolorscheme=light&show_faces=true&header=true&stream=false&show_border=true" scrolling="no" /></section>');
});