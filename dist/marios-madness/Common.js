/* Image Slider */
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
/* Selector */
mw.loader.using('mediawiki.util').then(function() {
    
function zselector( $content ) {
    var ActiveID = '';
    $(function () {
        $('[class|="cc"]').click(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '0');
            }
        });
        $('[class|="hh"]').mouseenter(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '1');
            }
        });
        $('[class|="hh"]').mouseleave(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '2');
            }
        });
        $('[class|="zz"]').each(function (i, elem) {
            if ($(this).css('display') == 'none') {
                $(this).css('opacity', 0);
            }
        });
    });
    function ZContent(classValue, effect) {
        if (classValue.split) {
            var ID = '';
            var elemClasses = classValue.split(' ');
            for (var i = 0; i < elemClasses.length; i++) {
                var elemClass = elemClasses[i];
                if (elemClass.substring(0, 3) == 'hh-' || elemClass.substring(0, 3) == 'cc-') {
                    ID = elemClass.substring(3);
                    if (effect == '0') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('cc', ID)
                        break;
                    } else if (effect == '1') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('hh', ID)
                        break;
                    } else if (effect == '2') {
                        ZEffect(ActiveID);
                        SelectElem('hh', ID);
                        break;
                    }
                }
            }
        }
    }
    function ZEffect(ID) {
        $('[class|="zz"]').each(function (i, elem) {
            if ($(this).hasClass('zz-' + ID)) {
                $(this).css('display', 'block');
                $(window).trigger('scroll');
                $(this).stop();
                $(this).animate({
                    opacity: 1,
                    queue: false
                }, 700);
            } else {
                $(this).css('display', 'none');
                $(this).stop();
                $(this).animate({
                    opacity: 0,
                    queue: false
                }, 0);
            }
        });
    }
    function SelectElem(type, ID) {
        $('[class|="cc"],[class|="hh"]').each(function (i, elem) {
            if ($(this).hasClass(type + '-' + ID)) {
                $(this).removeClass('sn');
                $(this).addClass('sy');
            } else {
                $(this).removeClass('sy');
                $(this).addClass('sn');
            }
        });
    }
}
    
    mw.hook( 'wikipage.content' ).add( zselector );
    zselector( mw.util.$content );
});