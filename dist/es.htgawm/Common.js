
// Any JavaScript here will be loaded for all users on every page load.
$(function () {
    var conf = mw.config.get([
            'wgAction',
            'wgNamespaceNumber'
        ]);
 
	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <https://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if (conf.wgNamespaceNumber === 1201 && $('.mw-geshi').length) {
		mw.loader.load('ext.geshi.local');
	}
 
	if (
            conf.wgAction === 'edit' &&
            conf.wgNamespaceNumber === 0
        ) {
            // causing some duplication bugs atm, will revisit soon TM
            // importScript('MediaWiki:CodeEditor.js');
	}
});

(function ($, mw) {
    'use strict';

    mw.hook('wikipage.content').add(function ($content) {

        if ($content.data('customSliderInitialized')) return;
        $content.data('customSliderInitialized', true);

        var SlideNow = window.SlideNow || 1;
        var SlideCount = window.SlideCount || 0;
        var SlideInterval = window.SlideInterval || 0;
        var TranslateWidth = window.TranslateWidth || 0;
        var TimerPause = window.TimerPause || false;
        var ele;
        var isVertical = false;

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

        if (!SlideInterval || SlideInterval < 1000) {
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
                height: 100 * SlideCount + '%',
                width: '100%'
            });

            ele.sld.css({
                height: 100 / SlideCount + '%',
                width: '100%'
            });

            ele.navBtns.css({
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                listStyle: 'none',
                margin: '0',
                padding: '0',
                zIndex: '10'
            });

            ele.navBtnsLi.css({
                margin: '5px 0'
            });

        } else {
            ele.sliderWrapper.css('width', 100 * SlideCount + '%');
            ele.sld.css('width', 100 / SlideCount + '%');
        }

        if (HeightSize === 'auto') {
            $(window).on('load', function () {
                var currentSlide = ele.sld.eq(SlideNow - 1);
                var imgHeight = currentSlide.find('img').outerHeight(true);
                if (imgHeight > 0) {
                    ele.sliderView.css('height', imgHeight + 'px');
                }
            });

            setTimeout(function () {
                var currentSlide = ele.sld.eq(SlideNow - 1);
                var imgHeight = currentSlide.find('img').outerHeight(true);
                if (imgHeight > 0) {
                    ele.sliderView.css('height', imgHeight + 'px');
                }
            }, 100);
        } else {
            ele.sliderView.css('height', HeightSize);
        }

        function SelectSlide(ActiveBtn) {
            $(window).trigger('scroll');

            ele.navBtn.removeClass('nbActiveLeft nbActiveRight nbActiveTop nbActiveBottom');

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

        function NextSlide() {
            if (SlideNow === SlideCount) {
                ele.sliderWrapper.css('transform', 'translate(0, 0)');
                SlideNow = 1;
            } else {
                if (isVertical) {
                    TranslateWidth = -ele.sliderView.height() * SlideNow;
                    ele.sliderWrapper.css('transform', 'translate(0,' + TranslateWidth + 'px)');
                } else {
                    TranslateWidth = -ele.sliderView.width() * SlideNow;
                    ele.sliderWrapper.css('transform', 'translate(' + TranslateWidth + 'px,0)');
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

        setTimeout(function tick() {
            if (!TimerPause) {
                NextSlide();
            }
            setTimeout(tick, SlideInterval);
        }, SlideInterval);

        ele.sliderView.on('mouseenter', function () {
            TimerPause = true;
        });

        ele.sliderView.on('mouseleave', function () {
            TimerPause = false;
        });

        ele.navBtn.on('click', function () {
            var navBtnId = $(this).index();
            SlideNow = navBtnId + 1;

            if (isVertical) {
                TranslateWidth = -ele.sliderView.height() * navBtnId;
                ele.sliderWrapper.css('transform', 'translate(0,' + TranslateWidth + 'px)');
            } else {
                TranslateWidth = -ele.sliderView.width() * navBtnId;
                ele.sliderWrapper.css('transform', 'translate(' + TranslateWidth + 'px,0)');
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

            ele.navBtnsLi.css('transform', 'translateY(' + ((SSlider - SBtn * BtnCount) / 2) + 'px)');
        } else if (ele.navBtns.hasClass('nmRight')) {
            SSlider = ele.navBtns.outerHeight(true);
            SBtn = ele.navBtnsLi.outerHeight(true);

            ele.navBtnsLi.css('transform', 'translateY(' + ((SSlider - SBtn * BtnCount) / 2) + 'px)');
        } else if (ele.navBtns.hasClass('nmTop')) {
            SSlider = ele.navBtns.outerWidth(true);
            SBtn = ele.navBtnsLi.outerWidth(true);

            ele.navBtnsLi.css('transform', 'translateX(' + ((SSlider - SBtn * BtnCount) / 2) + 'px)');
        } else if (ele.navBtns.hasClass('nmBottom')) {
            SSlider = ele.navBtns.outerWidth(true);
            SBtn = ele.navBtnsLi.outerWidth(true);

            ele.navBtnsLi.css('transform', 'translateX(' + ((SSlider - SBtn * BtnCount) / 2) + 'px)');
        }

    });

})(window.jQuery, window.mediaWiki);