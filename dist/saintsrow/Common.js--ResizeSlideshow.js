
if (typeof debug452 == "function") debug452("start of ResizeSlideshow");

$(function() {
  $(".gallerytabber .wikia-slideshow").after($('<button>').addClass("center button").css({"display":"block","width": "10em"}).on("click", function() { ResizeSlideshow(); }).html("Resize to fit"));

  $(".wikia-slideshow-image").on("click", function(e){e.stopPropagation();});  /* The slideshow lightbox has been broken for over a year, this enables images in the slideshow to be clicked again. */

  $(document).on('readystatechange', function() {
    if (typeof debug452 == "function") debug452("readystate (ResizeSlideshow) : '"+document.readyState+"'"); 
    if (document.readyState == "complete") initResizeSlideshow();
  });
  $(document).trigger('readystatechange');
});

window.initResizeSlideshow = function() {
  $(window).on("resize", function() { ResizeSlideshow(); })
  $(".wikia-slideshow-prev-next").on("click", function() { ResizeSlideshow(); });
  ResizeSlideshow();
}

window.ResizeSlideshow = function() {
  $(".wikia-slideshow-wrapper").each(function() {
    var aspectRatio = 3/4;  //the aspect ratio of the entire slideshow is always 4:3

    if ($(this).width()) {
      galleryWidth = $(this).width();
    } else {      //tabber not loaded yet - very rare.
      galleryWidth = $(".gallerytabber").width() - 12; // 2 * (5px padding + 1px border)
    }
    if (galleryWidth <= 0) return; //rare
    galleryHeight = Math.floor(galleryWidth*aspectRatio);
    galleryWidth = Math.floor(galleryWidth); //before now, galleryWidth is decimal.

    $(this).css("height", galleryHeight+"px");
    $(".wikia-slideshow-images", this).css({"height": galleryHeight+"px", "width": galleryWidth+"px"});
    $(".wikia-slideshow-sprite", this).css("top", Math.floor( galleryHeight  / 2 - 30)+"px"); //same formula used by the real script.

    $(".thumbimage", this).each(function() {
      var srcAttr = $(this).attr("src")?"src":"data-src";
      var srcurl = $(this).attr(srcAttr);

      $(this).next("a").attr("href", "/wiki/File:"+$(this).attr("data-image-key")); //add missing href to link.

      if (srcurl.indexOf($(this).attr("data-image-key")+"/") == -1) return; //skip actual size.
      if (srcurl.indexOf("latest/") == -1) return; //skip actual size for vignette images.

      var baseurl = srcurl.split($(this).attr("data-image-key"))[0];

      //at this point, attr("width") is decimal.  height is fine.

      $(this).attr("width", galleryWidth );
      $(this).attr("height", galleryHeight );

      var newurl = $(this).attr("data-image-key")
                     +"/revision/latest/thumbnail-down"
                     +"/width/"+galleryWidth
                     +"/height/"+galleryHeight;

      //using "thumbnail-down" instead of "scale-to-width" prevents images from being bigger than the original

      if ($(this).attr("src") != baseurl+newurl) $(this).attr("src", baseurl+newurl);
      if ($(this).attr("data-src") != baseurl+newurl) $(this).attr("data-src", baseurl+newurl);
    });
  });
}