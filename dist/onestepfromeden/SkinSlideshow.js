$('.slideshow-container').append("<svg height=\"0px\" width=\"0px\">" +
"<filter id=\"player2\" color-interpolation-filters=\"RGBa\">" +
"<feColorMatrix type=\"matrix\"" +
"values=\"-0.134  0.854  1.061 0.000  0 -0.493  1.037  0.963 0.000  0 -0.366  0.671  0.744 0.000  0 0.000  0.000  0.000 1.000  0\" />" +
"</filter>" +
"</svg>");

var toggled = false;
var slideIndex = 0;
showSlides(slideIndex);

$('.p2-toggle').click(function() {
  $('.p1-image').toggle();
  $('.p2-image').toggle();
  if(toggled)
  {
    $('.p2-toggle').css("background-color", "transparent");
  }
  else
  {
    $('.p2-toggle').css("background-color", "#666688");
  }
  toggled = !toggled;
});

$(".slideshow-dot").each(function(index){
  $(this).click(function(){currentSlide(index);})
});

$(".slideshow-prev").click(function(){plusSlides(-1);});
$(".slideshow-next").click(function(){plusSlides(1);});

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slideshow-slide");
  var dots = document.getElementsByClassName("slideshow-dot");
  if (n > slides.length-1) {slideIndex = 0}
  if (n < 0) {slideIndex = slides.length-1}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" slideshow-active", "");
  }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " slideshow-active";
}