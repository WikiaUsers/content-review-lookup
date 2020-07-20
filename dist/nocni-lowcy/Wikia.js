/* Facebook */
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
        $("<div id='FacebookWnd'></div>").css({
                background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
                width:242,
                height:401,
                position:'fixed',
                top:150,
                right:-210,
                zIndex:300}).appendTo("body");
        /* Zawartość */
        $('<div class="fb-like-box" data-href="https://www.facebook.com/nocnilowcywiki" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
        $("#FacebookWnd").click(function(){
                toggleFacebookWnd();
        });
});
 
function toggleFacebookWnd() {
        if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
        else $("#FacebookWnd").animate({right:"-210px"}, 700);
}

/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://vignette.wikia.nocookie.net/charmed/images/7/74/Galeria.png/revision/latest?cb=20160530213247&path-prefix=pl" style="vertical-align:text-bottom;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 112 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://vignette.wikia.nocookie.net/charmed/images/f/f2/Powrót.gif/revision/latest?cb=20160530213257&path-prefix=pl" style="vertical-align:text-bottom;" /> Powrót</a>');
  }
});