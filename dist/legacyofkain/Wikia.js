importScriptPage('MediaWiki:Infobox.js', 'legacyofkain');

.wikia-gallery-add {
   display: none !important;
}


$(document).ready(function() {
   // put all your jQuery goodness in here.

   //nosgothslide

   $(".nosgothslide > div:gt(0)").hide();

setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
},  3000);


   $('#referenceToggle').click(function(){
      $('.c-references').slideToggle(500);
   });
  
   //$('.WikiHeader h1 img').addClass('removeMe');
   //$('.removeMe').hide();
   //$('.WikiHeader h1').append('<a href="/" alt="The Legacy of Kain Wiki"><img //style="-webkit-user-select: none" //src="https://images.wikia.nocookie.net/legacyofkain/images/6/6d/New_logo_wikia_fnl.png"></a>')

   $('table.kaintable tr').after('<div style="background:#0A0A0A; height:1px; display:block; clear:both; position:absolute; width:90%;"></div>');

   $('.wikia-menu-button, .control-button').mouseover(function(){
      $(this).find('.WikiaMenuElement').slideDown(500);
   });

   $('.wikia-menu-button, .control-button').mouseleave(function(){
      $(this).find('.WikiaMenuElement').slideUp(500);
   });

});

$('.page-share page-share-facebook').click(function() {
    window.location.assign($(this).data('https://www.facebook.com/legacyofkainwiki/'));
});