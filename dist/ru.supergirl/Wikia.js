
 $(function() {
  /* Gallery Button */
   if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/'+ encodeURIComponent(wgPageName) + "/Gallery" +'" title="Photo gallery"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/7/74/Galeria.png" style="vertical-align:middle;" /> Gallery</a>');
  }
 
 });