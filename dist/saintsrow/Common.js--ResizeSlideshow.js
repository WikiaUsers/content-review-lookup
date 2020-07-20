$(document).ready(function() {
  $(".gallerytabber .wikia-slideshow").after($('<div>').addClass("center button").css({"display":"block","width": "10em"}).bind("click", function() { ResizeSlideshow(); }).html("Resize to fit"));

  if (window.whenReady) {
    window.whenReady.push("ResizeSlideshow");
  } else {
    document.onreadystatechange = function () {
      if (document.readyState == "complete") ResizeSlideshow();
    }
  }
});

function ResizeSlideshow() {
  $(".gallerytabber .wikia-slideshow-wrapper").each(function() {
    var aspectRatio = 3/4;  //the aspect ratio of the entire slideshow is always 4:3

    if ($(this).width()) {
      galleryWidth = $(this).width();
    } else {      //tabber not loaded yet - very rare.
      galleryWidth = $(".gallerytabber").width() - 12; // 2 * (5px padding + 1px border)
    }

    galleryHeight = Math.floor(galleryWidth*aspectRatio);
    $(this).css("height", galleryHeight+"px");
    $(".wikia-slideshow-images", this).css({"height": galleryHeight+"px", "width": galleryWidth+"px"});
    $(".wikia-slideshow-sprite", this).css("top", Math.floor( galleryHeight  / 2 - 30)+"px"); //same formula used by the real script.

    $(".thumbimage", this).each(function() {
      if ($(this).attr("src")) srcAttr = "src";
      else if ($(this).attr("data-src")) srcAttr = "data-src";

      if ($(this).attr(srcAttr).indexOf(escape($(this).attr("data-image-key")+"/")) == -1) return; //skip actual size.
      if ($(this).attr(srcAttr).indexOf("latest/") == -1) return; //skip actual size for vignette images.

      var baseurl = $(this).attr(srcAttr).split(escape($(this).attr("data-image-key")))[0];

      if (baseurl.indexOf("vignette") == -1) { //imgX.wikia URLs
        if (!$(this).attr("aspectRatio")) $(this).attr("aspectRatio", $(this).attr("height") / $(this).attr("width")); //store original aspect ratio
 
        if ($(this).attr("aspectRatio") > aspectRatio) { //if the image is taller than the aspect ratio allows.
          $(this).attr("height", galleryHeight ); //set height to max
          $(this).attr("width", Math.floor( galleryHeight / $(this).attr("aspectRatio") ) ); //calc width
        } else {
          $(this).attr("width", galleryWidth ); //set width to max
          $(this).attr("height", Math.floor( galleryWidth * $(this).attr("aspectRatio") ) ); //calc height
        }
        var newurl = $(this).attr("data-image-key")+"/"+$(this).attr("width")+"px-"+$(this).attr("data-image-key");

      } else { //vignetteX.wikia URLs

        $(this).attr("width", galleryWidth );
        $(this).attr("height", galleryHeight );
        //setting the width and height should be redundant at this point, but is safe because it is restricted by the max- styles

        var newurl = $(this).attr("data-image-key")
                     +"/revision/latest/thumbnail-down"
                     +"/width/"+galleryWidth
                     +"/height/"+galleryHeight;

        //using "thumbnail-down" instead of "scale-to-width" prevents images from being bigger than the original
      }

      $(this).attr(srcAttr, baseurl+escape(newurl));

    });
  });
}