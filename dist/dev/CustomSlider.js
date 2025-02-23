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
            sliderData: $content.find('#SliderData'),
            navBtn: $content.find('.NavBtn'),
            navBtns: $content.find('#NavBtns'),
            navBtnsLi: $content.find('#NavBtns li'),
            sliderView: $content.find('#SliderView'),
            sliderWrapper: $content.find('#SliderWrapper')
        };
      
      var Slides = 0;
      var HeightSize = 'auto';
      var Data = (ele.sliderData.attr('class') || '').split('|');
      if (Data.length === 3) {
        Slides = Data[0];
        SlideInterval = Data[1];
        HeightSize = Data[2];
      }
      if (SlideInterval < 1000 || SlideInterval === undefined) {
        SlideInterval = 3000;
      }
      
      ele.sld.each(function (index) {
        if (index + 1 > Slides) {
          $(this).remove();
        }
      });
      ele.navBtn.each(function (index) {
        if (index + 1 > Slides) {
          $(this).remove();
        }
      });
      
      // Setting the initial height and basic styles
      SlideCount = ele.sliderWrapper.children().length;
      ele.sliderWrapper.css('width', 100 * SlideCount + '%');
      ele.sld.css('width', 100 / SlideCount + '%');
      
      // Function for setting the height of SliderView to the height of the current image
      function setSliderHeight() {
        var currentSlide = ele.sld.eq(SlideNow - 1);
        var imgHeight = currentSlide.find('img').outerHeight(true); // Take margins and paddings into account 
        ele.sliderView.css('height', imgHeight + 'px');
      }
      
      // Setting the initial height
      if (HeightSize === 'auto') {
        $(window).on('load', setSliderHeight);
        setTimeout(setSliderHeight, 100); // Checking after loading the page
      } else {
        ele.sliderView.css('height', HeightSize);
      }
      
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
        SelectSlide($(this));
        var navBtnId = $(this).index();
        if (navBtnId + 1 !== SlideNow) {
          TranslateWidth = - ele.sliderView.width() * (navBtnId);
          ele.sliderWrapper.css({
            'transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
          });
          SlideNow = navBtnId + 1;
          setSliderHeight(); // Update the height when moving to a different slide
        }
      });
      
      var SSlider = 0;
      $(window).trigger('scroll'); // trigger image lazy loader
      
      if (HeightSize !== 'auto') {
        SSlider = ele.sliderView.outerHeight(true);
        ele.sld.each(function () {
          var HSlide = $(this).find('img').outerHeight(false);
          var RMath = (SSlider - HSlide) / 2;
          $(this).find('img').css('transform', 'translateY(' + RMath + 'px)');
        });
      }
      
      var BtnCount = ele.navBtn.length;
      var SBtn = 0;
      if (ele.navBtns.hasClass('nmLeft')) {
        SSlider = ele.navBtns.outerHeight(true);
        SBtn = ele.navBtnsLi.outerHeight(true);
        if (ele.navBtns.hasClass('nmP2')) {
          ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if (ele.navBtns.hasClass('nmP3')) {
          ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      } else if (ele.navBtns.hasClass('nmRight')) {
        SSlider = ele.navBtns.outerHeight(true);
        SBtn = ele.navBtnsLi.outerHeight(true);
        if (ele.navBtns.hasClass('nmP2')) {
          ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if (ele.navBtns.hasClass('nmP3')) {
          ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      } else if (ele.navBtns.hasClass('nmTop')) {
        SSlider = ele.navBtns.outerWidth(true);
        SBtn = ele.navBtnsLi.outerWidth(true);
        if (ele.navBtns.hasClass('nmP2')) {
          ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if (ele.navBtns.hasClass('nmP3')) {
          ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      } else if (ele.navBtns.hasClass('nmBottom')) {
        SSlider = ele.navBtns.outerWidth(true);
        SBtn = ele.navBtnsLi.outerWidth(true);
        if (ele.navBtns.hasClass('nmP2')) {
          ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if (ele.navBtns.hasClass('nmP3')) {
          ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      }
    });
    
    function NextSlide() {
      if (SlideNow === SlideCount || SlideNow <= 0 || SlideNow > SlideCount) {
        ele.sliderWrapper.css('transform', 'translate(0, 0)');
        SlideNow = 1;
      } else {
        TranslateWidth = - ele.sliderView.width() * (SlideNow);
        ele.sliderWrapper.css({
          'transform': 'translate(' + TranslateWidth + 'px, 0)',
          '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
          '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
        });
        SlideNow++;
      }
      SelectSlide(ele.navBtns.children().eq(SlideNow - 1));
      setSliderHeight(); // Update the height when automatically moving to a different slide
    }
    
    function SelectSlide(ActiveBtn) {
      $(window).trigger('scroll'); // trigger image lazy loader
      ele.navBtn.removeClass('nbActiveLeft');
      ele.navBtn.removeClass('nbActiveRight');
      ele.navBtn.removeClass('nbActiveTop');
      ele.navBtn.removeClass('nbActiveBottom');
      if (ele.navBtns.hasClass('nmRight')) {
        ActiveBtn.addClass('nbActiveRight');
      } else if (ele.navBtns.hasClass('nmTop')) {
        ActiveBtn.addClass('nbActiveTop');
      } else if (ele.navBtns.hasClass('nmBottom')) {
        ActiveBtn.addClass('nbActiveBottom');
      } else {
        ActiveBtn.addClass('nbActiveLeft');
      }
    }
})(window.jQuery, window.mediaWiki);