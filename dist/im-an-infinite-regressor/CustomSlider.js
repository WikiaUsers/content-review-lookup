(function ($, mw) {
  'use strict';
  var SlideNow = 1;
  var SlideCount = 0;
  var SlideInterval = 4000;
  var TranslateWidth = 0;
  var TimerPause = false;
  var ele = {};

  mw.hook('wikipage.content').add(function($content) {
    ele = {
      sld: $content.find('.Sld'),
      sliderData: $content.find('#SliderData'),
      sliderView: $content.find('#SliderView'),
      sliderWrapper: $content.find('#SliderWrapper'),
      navBtns: $content.find('#NavBtns'),
      navBtn: $content.find('#NavBtns li')
    };

    // Parse data
    var data = (ele.sliderData.attr('class') || '').split('|');
    if (data.length >= 2) {
      SlideCount = parseInt(data[0], 10);
      SlideInterval = parseInt(data[1], 10);
    }
    if (!SlideInterval || SlideInterval < 1000) SlideInterval = 4000;

    ele.sld.each(function(i){ if (i+1 > SlideCount) $(this).remove(); });
    ele.navBtn.each(function(i){ if (i+1 > SlideCount) $(this).remove(); });

    // Responsive resize
    function updateSliderHeight() {
      var current = ele.sld.eq(SlideNow - 1);
      var img = current.find('img');
      if (img.length) {
        if (img[0].complete && img[0].naturalHeight > 0) {
          ele.sliderView.css('height', img.outerHeight(true) + 'px');
        } else {
          img.on('load', function () {
            ele.sliderView.css('height', $(this).outerHeight(true) + 'px');
          });
        }
      }
    }

    $(window).on('load resize', updateSliderHeight);
    setTimeout(updateSliderHeight, 300);

    // Auto slide loop
    setInterval(function() {
      if (!TimerPause) nextSlide();
    }, SlideInterval);

    ele.sliderView.on('mouseenter', function() { TimerPause = true; });
    ele.sliderView.on('mouseleave', function() { TimerPause = false; });

    ele.navBtn.on('click', function() {
      var index = $(this).index();
      SlideNow = index + 1;
      TranslateWidth = -ele.sliderView.width() * index;
      ele.sliderWrapper.css('transform', 'translate(' + TranslateWidth + 'px, 0)');
      selectSlide($(this));
      updateSliderHeight();
    });

    function nextSlide() {
      if (SlideNow === SlideCount) {
        ele.sliderWrapper.css('transform', 'translate(0, 0)');
        SlideNow = 1;
      } else {
        TranslateWidth = -ele.sliderView.width() * (SlideNow);
        ele.sliderWrapper.css('transform', 'translate(' + TranslateWidth + 'px, 0)');
        SlideNow++;
      }
      selectSlide(ele.navBtns.children().eq(SlideNow - 1));
      updateSliderHeight();
    }

    function selectSlide(active) {
      ele.navBtn.removeClass('nbActiveBottom');
      active.addClass('nbActiveBottom');
    }
  });
})(window.jQuery, window.mediaWiki);