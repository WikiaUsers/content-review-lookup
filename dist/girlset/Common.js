// This code is an edited version of CustomSlider from dev wiki (written by users "TRJ-VoRoN" and "Acirus")
(function ($, mw) {
  'use strict';

  var slideTimer = null;

  mw.hook('wikipage.content').add(function ($content) {
    var $sliderView = $content.find('#SliderView');
    if (!$sliderView.length) return;

    var $sliderWrapper = $content.find('#SliderWrapper');
    var $sld = $content.find('.Sld');
    var $navBtn = $content.find('.NavBtn');
    var $navBtns = $content.find('#NavBtns');

    var data = ($sliderView.attr('class') || '').split('|');
    var slideCount = parseInt(data[0], 10) || $sld.length;
    var slideInterval = parseInt(data[1], 10);

    if (isNaN(slideInterval) || slideInterval < 1000) {
      slideInterval = 3000;
    }

    var slideNow = 1;
    var timerPaused = false;

    $sliderWrapper.css('width', 100 * slideCount + '%');
    $sld.css('width', 100 / slideCount + '%');

    function goToSlide(index) {
      var translatePercent = -(100 / slideCount) * index;
      $sliderWrapper.css('transform', 'translateX(' + translatePercent + '%)');

      $navBtn.removeClass('nbActiveRight');
      $navBtns.children().eq(index).addClass('nbActiveRight');

      $(window).trigger('scroll');
    }

    function nextSlide() {
      if (slideNow >= slideCount) {
        slideNow = 1;
        goToSlide(0);
      } else {
        goToSlide(slideNow);
        slideNow++;
      }
    }

    if (slideTimer) {
      clearInterval(slideTimer);
    }

    slideTimer = setInterval(function () {
      if (!timerPaused) {
        nextSlide();
      }
    }, slideInterval);

    $sliderView.on('mouseenter', function () {
      timerPaused = true;
    });

    $sliderView.on('mouseleave', function () {
      timerPaused = false;
    });

    $navBtn.on('click', function () {
      var navBtnId = $(this).index();
      slideNow = navBtnId + 1;
      goToSlide(navBtnId);
    });
  });
})(window.jQuery, window.mediaWiki);