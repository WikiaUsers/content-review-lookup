// Image slider

$(function() {
  var slideTotal = $(".cslider ul li").length;
  var slideWidth = $(".cslider ul li").width();
  var slideVideo = $(".cslider").find("figure").parent().index();
  var slideIndex = 0;
  var slideshow = setInterval(function() {
    slideIndex += 1;
    showSlide();
  }, 5500);

  function showSlide() {
    if (slideIndex > slideTotal - 1) {
      slideIndex = 0;
    }

    if (slideIndex < 0) {
      slideIndex = slideTotal - 1;
    }

    $(".cslider-thumbs img").removeClass("active");
    $(".cslider-thumbs img").eq(slideIndex).addClass('active');

    $(".cslider-caption").children().hide();
    $(".cslider").css("background-color", "#000").animate({
      height: "415px"
    }, 400);
    $(".cslider ul").stop(true, true).animate({
      left: '-' + slideWidth * slideIndex + 'px'
    }, 600).queue(function(next) {
      $(".cslider-caption").children().fadeToggle('fast');

      if (slideIndex == slideVideo) {
        $(".cslider").css("background-color", "transparent").animate({
          height: "506px"
        }, 400);
      }

      next();
    });
  }

  $(".cslider").mouseover(function() {
    clearInterval(slideshow);
  });

  $(".cslider-prev").click(function() {
    clearInterval(slideshow);
    slideIndex -= 1;
    showSlide();
  });

  $(".cslider-next").click(function() {
    clearInterval(slideshow);
    slideIndex += 1;
    showSlide();
  });

document.querySelectorAll(".cslider ul li img").forEach(function(i) {
  var thumbnail = '';
  if (i.classList.contains('lazyload')) {
    thumbnail = i.getAttribute('data-src');
  } else {
    thumbnail = i.getAttribute('src');
  }
  $(".cslider-thumbs").append("<img src=" + thumbnail + "/>").children().first().addClass("active");
});

  $(".cslider-thumbs img").click(function() {
    clearInterval(slideshow);
    slideIndex = $(this).index();
    $(".cslider-thumbs img").removeClass("active");
    $(this).addClass("active");
    showSlide(slideIndex);
  });
});