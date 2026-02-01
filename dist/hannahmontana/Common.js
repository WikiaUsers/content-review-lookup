/* Any JavaScript here will be loaded for all users on every page load. */

//Rail module
window.AddRailModule = [{prepend: true}];

// This code is an edited version of CustomSlider from dev wiki (written by users "TRJ-VoRoN" and "Acirus")
// It determines image height based on aspect ratio and uses percentages instead of pixels for transitions
// This version of the code removes vertical slider options, because they won't be used

(function ($, mw) {
    'use strict';
    var SlideNow = window.SlideNow || 1;
    var SlideCount = window.SlideCount || 0;
    var SlideInterval = window.SlideInterval || 0;
    var TranslateWidth = window.TranslateWidth || 0;
    var TimerPause = window.TimerPause || !1;
    var ele;

    mw.hook('wikipage.content').add(function($content) {
			ele = {
				sld: $content.find('.Sld'),
				navBtn: $content.find('.NavBtn'),
				navBtns: $content.find('#NavBtns'),
				navBtnsLi: $content.find('#NavBtns li'),
				sliderView: $content.find('#SliderView'),
				sliderWrapper: $content.find('#SliderWrapper')
			};
      
      var Slides = 0;
      var AspectRatio = 16/9;
      var Data = (ele.sliderView.attr('class') || '').split('|');
      Slides = parseInt(Data[0], 10);
      SlideInterval = parseInt(Data[1], 10);
 
      if (SlideInterval < 1000 || SlideInterval === undefined) {
        SlideInterval = 3000;
      }
      
      SlideCount = Slides;
      
      ele.sliderWrapper.css('width', 100 * SlideCount + '%');
      ele.sld.css('width', 100 / SlideCount + '%');
	  
	  $(window).on('load', function() {
		ele.sliderViewsliderViewsliderView.css('aspect-ratio', 16 / 9);
      });
	  setTimeout(function() {
	    ele.sliderView.css('aspect-ratio', 16 / 9);
      }, 100);
	  
      setTimeout(function tick() {
        if (TimerPause === false) {
          NextSlide();
        }
        setTimeout(tick, SlideInterval);
      }, SlideInterval);
      
      ele.sliderView.mouseenter(function () {
        TimerPause = true;
      });
      ele.sliderView.mouseleave(function () {
        TimerPause = false;
      });
      
      ele.navBtn.click(function () {
        var navBtnId = $(this).index();
        SlideNow = navBtnId + 1;
        TranslateWidth = -ele.sliderView.width() * navBtnId;
		var translatePercent = -(100 / SlideCount) * navBtnId;
        ele.sliderWrapper.css('transform', 'translate(' + translatePercent + '%, 0)');
        SelectSlide($(this));
        var currentSlide = ele.sld.eq(SlideNow - 1);
      });
      
      var SSlider = 0;
      $(window).trigger('scroll');
	});
    
    function NextSlide() {
      if (SlideNow === SlideCount) {
        ele.sliderWrapper.css('transform', 'translate(0, 0)');
        SlideNow = 1;
      } else {
          TranslateWidth = -ele.sliderView.width() * (SlideNow);
		  var translatePercent = -(100 / SlideCount) * SlideNow;
          ele.sliderWrapper.css('transform', 'translate(' + translatePercent + '%, 0)');
          SlideNow++;
      }
      SelectSlide(ele.navBtns.children().eq(SlideNow - 1));
      var currentSlide = ele.sld.eq(SlideNow - 1);
	  ele.sliderView.css('aspect-ratio', 16 / 9);
	}
    
    function SelectSlide(ActiveBtn) {
      $(window).trigger('scroll');
      ele.navBtn.removeClass('nbActiveBottom');
      ActiveBtn.addClass('nbActiveBottom');
      }
})(window.jQuery, window.mediaWiki);