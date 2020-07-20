(function () { 
    var SlideNow = window.SlideNow || 1;
    var SlideCount = window.SlideCount || 0;
    var SlideInterval = window.SlideInterval || 0;
    var TranslateWidth = window.TranslateWidth || 0;
    var TimerPause = window.TimerPause || !1;
    $(document).ready(function () {
      var Slides = 0;
      var HeightSize = 'auto';
      var Data = ($('#SliderData').attr('class') || '').split('|');
      if (Data.length == 3) {
        Slides = Data[0];
        SlideInterval = Data[1];
        HeightSize = Data[2];
      }
      if (SlideInterval < 1000 || SlideInterval === undefined) {
        SlideInterval = 3000;
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
      $('#SliderView').css('height', HeightSize);
      SlideCount = $('#SliderWrapper').children().length;
      $('#SliderWrapper').css('width', 100 * SlideCount + '%');
      $('.Sld').css('width', 100 / SlideCount + '%');
      setTimeout(function tick() {
        if (TimerPause === false) {
          NextSlide();
        }
        setTimeout(tick, SlideInterval);
      }, SlideInterval);
      $('#SliderView').mouseenter(function () {
        TimerPause = true;
      });
      $('#SliderView').mouseleave(function () {
        TimerPause = false;
      });
      $('.NavBtn').click(function () {
        SelectSlide($(this));
        var navBtnId = $(this).index();
        if (navBtnId + 1 != SlideNow) {
          TranslateWidth = - $('#SliderView').width() * (navBtnId);
          $('#SliderWrapper').css({
            'transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
          });
          SlideNow = navBtnId + 1;
        }
      });
      var SSlider = 0;
         $(window).trigger('scroll');// trigger image lazy loader
      if (HeightSize != 'auto') {
        SSlider = $('#SliderView').outerHeight(true);
        $('.Sld').each(function (index, value) {
          var HSlide = $(this).find('img').outerHeight(false);
          var RMath = (SSlider - HSlide) / 2;
          $(this).find('img').css('transform', 'translateY(' + RMath + 'px)');
        });
      }
      var BtnCount = $('.NavBtn').length;
      var SBtn = 0;
      if ($('#NavBtns').hasClass('nmLeft')) {
        SSlider = $('#NavBtns').outerHeight(true);
        SBtn = $('#NavBtns li').outerHeight(true);
        if ($('#NavBtns').hasClass('nmP2')) {
          $('#NavBtns li').css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if ($('#NavBtns').hasClass('nmP3')) {
          $('#NavBtns li').css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      } else if ($('#NavBtns').hasClass('nmRight')) {
        SSlider = $('#NavBtns').outerHeight(true);
        SBtn = $('#NavBtns li').outerHeight(true);
        if ($('#NavBtns').hasClass('nmP2')) {
          $('#NavBtns li').css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if ($('#NavBtns').hasClass('nmP3')) {
          $('#NavBtns li').css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      } else if ($('#NavBtns').hasClass('nmTop')) {
        SSlider = $('#NavBtns').outerWidth(true);
        SBtn = $('#NavBtns li').outerWidth(true);
        if ($('#NavBtns').hasClass('nmP2')) {
          $('#NavBtns li').css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if ($('#NavBtns').hasClass('nmP3')) {
          $('#NavBtns li').css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      } else if ($('#NavBtns').hasClass('nmBottom')) {
        SSlider = $('#NavBtns').outerWidth(true);
        SBtn = $('#NavBtns li').outerWidth(true);
        if ($('#NavBtns').hasClass('nmP2')) {
          $('#NavBtns li').css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
        } else if ($('#NavBtns').hasClass('nmP3')) {
          $('#NavBtns li').css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) + 'px)');
        }
      }
    });
    function NextSlide() {
      if (SlideNow == SlideCount || SlideNow <= 0 || SlideNow > SlideCount) {
        $('#SliderWrapper').css('transform', 'translate(0, 0)');
        SlideNow = 1;
      } else {
        TranslateWidth = - $('#SliderView').width() * (SlideNow);
        $('#SliderWrapper').css({
          'transform': 'translate(' + TranslateWidth + 'px, 0)',
          '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
          '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
        });
        SlideNow++;
      }
      SelectSlide($('#NavBtns').children().eq(SlideNow - 1));
    }
    function SelectSlide(ActiveBtn) {
        $(window).trigger('scroll');// trigger image lazy loader
      $('.NavBtn').removeClass('nbActiveLeft');
      $('.NavBtn').removeClass('nbActiveRight');
      $('.NavBtn').removeClass('nbActiveTop');
      $('.NavBtn').removeClass('nbActiveBottom');
      if ($('#NavBtns').hasClass('nmRight')) {
        ActiveBtn.addClass('nbActiveRight');
      } else if ($('#NavBtns').hasClass('nmTop')) {
        ActiveBtn.addClass('nbActiveTop');
      } else if ($('#NavBtns').hasClass('nmBottom')) {
        ActiveBtn.addClass('nbActiveBottom');
      } else {
        ActiveBtn.addClass('nbActiveLeft');
      }
    }
}());