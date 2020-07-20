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
whenRailReadyStop = 1;
$(function whenRailReady() {
        if ($('#WikiaRail section').length > 0) {
                $('#WikiaRail section.module:last').after('<section style="padding: 0;" class="module" id="facebookmodule"><iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FNaruto-Wikia%2F528345840537500&amp;width&amp;height=62&amp;colorscheme=light&amp;show_faces=false&amp;header=true&amp;stream=false&amp;show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:62px;" allowTransparency="true"></iframe></section>');
         } else {
                if (whenRailReadyStop < 60) {
                        setTimeout(function() {
                                whenRailReady();
setTimeout(function() {
 
},5000);
                        },1000);
                }
                whenRailReadyStop++;
        }
});