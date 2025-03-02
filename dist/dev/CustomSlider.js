(function ($, mw) {
    'use strict';
    var SlideNow = window.SlideNow || 1;
    var SlideCount = window.SlideCount || 0;
    var SlideInterval = window.SlideInterval || 0;
    var TranslateWidth = window.TranslateWidth || 0;
    var TimerPause = window.TimerPause || !1;
    var ele;
    var isVertical = false;
    
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
      if (Data.length >= 4) {
        Slides = parseInt(Data[0], 10);
        SlideInterval = parseInt(Data[1], 10);
        HeightSize = Data[2];
        isVertical = Data[3].toLowerCase() === 'down';
      } else if (Data.length === 3) {
        Slides = parseInt(Data[0], 10);
        SlideInterval = parseInt(Data[1], 10);
        HeightSize = Data[2];
      }
      if (SlideInterval < 1000 || SlideInterval === undefined) {
        SlideInterval = 3000;
      }
      
      SlideCount = Slides;
      
      ele.sld.each(function (index) {
        if (index + 1 > SlideCount) {
          $(this).remove();
        }
      });
      ele.navBtn.each(function (index) {
        if (index + 1 > SlideCount) {
          $(this).remove();
        }
      });
      
      if (isVertical) {
        ele.sliderWrapper.css({
          'height': 100 * SlideCount + '%',
          'width': '100%'
        });
        ele.sld.css({
          'height': 100 / SlideCount + '%',
          'width': '100%'
        });
        ele.navBtns.css({
          'position': 'absolute',
          'right': '10px',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'list-style': 'none',
          'margin': '0',
          'padding': '0',
          'z-index': '10'
        });
        ele.navBtnsLi.css({
          'margin': '5px 0'
        });
      } else {
        ele.sliderWrapper.css('width', 100 * SlideCount + '%');
        ele.sld.css('width', 100 / SlideCount + '%');
      }
      
      if (HeightSize === 'auto') {
        $(window).on('load', function() {
          var currentSlide = ele.sld.eq(SlideNow - 1);
          var imgHeight = currentSlide.find('img').outerHeight(true);
          if (imgHeight > 0) {
            ele.sliderView.css('height', imgHeight + 'px');
          }
        });
        setTimeout(function() {
          var currentSlide = ele.sld.eq(SlideNow - 1);
          var imgHeight = currentSlide.find('img').outerHeight(true);
          if (imgHeight > 0) {
            ele.sliderView.css('height', imgHeight + 'px');
          }
        }, 100);
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
        var navBtnId = $(this).index();
        SlideNow = navBtnId + 1;
        if (isVertical) {
          TranslateWidth = -ele.sliderView.height() * navBtnId;
          ele.sliderWrapper.css({
            'transform': 'translate(0, ' + TranslateWidth + 'px)',
            '-webkit-transform': 'translate(0, ' + TranslateWidth + 'px)',
            '-ms-transform': 'translate(0, ' + TranslateWidth + 'px)',
          });
        } else {
          TranslateWidth = -ele.sliderView.width() * navBtnId;
          ele.sliderWrapper.css({
            'transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
          });
        }
        SelectSlide($(this));
        var currentSlide = ele.sld.eq(SlideNow - 1);
        var imgHeight = currentSlide.find('img').outerHeight(true);
        if (imgHeight > 0) {
          ele.sliderView.css('height', imgHeight + 'px');
        }
      });
      
      var SSlider = 0;
      $(window).trigger('scroll');
      
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
      if (SlideNow === SlideCount) {
        ele.sliderWrapper.css('transform', 'translate(0, 0)');
        SlideNow = 1;
      } else {
        if (isVertical) {
          TranslateWidth = -ele.sliderView.height() * (SlideNow);
          ele.sliderWrapper.css({
            'transform': 'translate(0, ' + TranslateWidth + 'px)',
            '-webkit-transform': 'translate(0, ' + TranslateWidth + 'px)',
            '-ms-transform': 'translate(0, ' + TranslateWidth + 'px)',
          });
        } else {
          TranslateWidth = -ele.sliderView.width() * (SlideNow);
          ele.sliderWrapper.css({
            'transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
          });
        }
        SlideNow++;
      }
      SelectSlide(ele.navBtns.children().eq(SlideNow - 1));
      var currentSlide = ele.sld.eq(SlideNow - 1);
      var imgHeight = currentSlide.find('img').outerHeight(true);
      if (imgHeight > 0) {
        ele.sliderView.css('height', imgHeight + 'px');
      }
    }
    
    function SelectSlide(ActiveBtn) {
      $(window).trigger('scroll');
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