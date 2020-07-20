var slideNow = 1;
var slideCount = 0;
var slideInterval = 0;
var navBtnId = 0;
var translateWidth = 0;
var timerPause = false;
$(document).ready(function () {
  var Slides = 0;
  var HeightSize = 'auto';
  var Data = $('#SliderData').attr('class').split('|');
  if (Data.length == 3) {
    Slides = Data[0];
    slideInterval = Data[1];
    HeightSize = Data[2];
  }
  $('.Sld').each(function (index) {
    if (index + 1 > Slides) {
      $(this).remove();
    }
  });
  $('.NavBtn').each(function (index) {
    if (index + 1 > Slides) {
      $(this).remove();
    }
  });
  if (slideInterval < 1000) {
    slideInterval = 3000;
  }
  $('#SliderView').css('height', HeightSize);
  slideCount = $('#SliderWrapper').children().length;
  $('#SliderWrapper').css('width', 100 * slideCount + '%');
  $('.Sld').css('width', 100 / slideCount + '%');
  setTimeout(function tick() {
    if (timerPause === false) {
      nextSlide();
    }
    setTimeout(tick, slideInterval);
  }, slideInterval);
  $('#SliderView').mouseenter(function () {
    timerPause = true;
  });
  $('#SliderView').mouseleave(function () {
    timerPause = false;
  });
  $('.NavBtn').click(function () {
    var ActiveBtn = $('#NavBtns').children().eq(slideNow - 1);
    if ($('#NavBtns').hasClass('nmLeft')) {
      $('.nbActiveLeft').removeClass('nbActiveLeft');
      $(this).addClass('nbActiveLeft');
    } else {
      $('.nbActiveRight').removeClass('nbActiveRight');
      $(this).addClass('nbActiveRight');
    }
    navBtnId = $(this).index();
    if (navBtnId + 1 != slideNow) {
      translateWidth = - $('#SliderView').width() * (navBtnId);
      $('#SliderWrapper').css({
        'transform': 'translate(' + translateWidth + 'px, 0)',
        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
      });
      slideNow = navBtnId + 1;
    }
  });
  if (HeightSize != 'auto') {
    var HSlider = $('#SliderView').css('height').replace('px', '').replace('%', '');
    $('.Sld').each(function (index, value) {
      var HSlide = $('.Sld').css('height').replace('px', '').replace('%', '');
      var RMath = (HSlider - HSlide) / 2;
      $(this).find('img').css('transform', 'translateY(' + RMath + 'px)')
    });
  }
});
function nextSlide() {
  if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
    $('#SliderWrapper').css('transform', 'translate(0, 0)');
    slideNow = 1;
  } else {
    translateWidth = - $('#SliderView').width() * (slideNow);
    $('#SliderWrapper').css({
      'transform': 'translate(' + translateWidth + 'px, 0)',
      '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
      '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
    });
    slideNow++;
  }
  var ActiveBtn = $('#NavBtns').children().eq(slideNow - 1);
  if ($('#NavBtns').hasClass('nmLeft')) {
    $('.nbActiveLeft').removeClass('nbActiveLeft');
    ActiveBtn.addClass('nbActiveLeft');
  } else {
    $('.nbActiveRight').removeClass('nbActiveRight');
    ActiveBtn.addClass('nbActiveRight');
  }
}