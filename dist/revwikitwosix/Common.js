/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Multi-instance CustomSlider
 *
 * Based on CustomSlider by TRJ-VoRoN and Acirus
 * Original: https://dev.fandom.com/wiki/CustomSlider
 *
 * Modified to support multiple slider instances on a single page.
 * The original script used shared/global state and page-wide element
 * lookups, which meant only one #SliderView block per page could work
 * correctly. This version scopes all state and DOM lookups per-instance
 * so any number of sliders can run independently on the same page.
 */
 
(function ($, mw) {
    'use strict';
 
    mw.hook('wikipage.content').add(function ($content) {
        $content.find('[id="SliderView"]').each(function () {
            initSlider($(this));
        });
    });
 
    function initSlider($sliderView) {
        var SlideNow = 1;
        var SlideCount = 0;
        var SlideInterval = 3000;
        var TranslateWidth = 0;
        var TimerPause = false;
        var isVertical = false;
 
        // Structural lookups instead of ID selectors - see header comment
        // for why: duplicate ids across instances make $x.find('#id')
        // unreliable in some jQuery versions.
        var $navBtnsUl = $sliderView.children('ul').has('.NavBtn').first();
        var ele = {
            sld: $sliderView.find('.Sld'),
            sliderData: $sliderView.children('div').first(),
            navBtn: $sliderView.find('.NavBtn'),
            navBtns: $navBtnsUl,
            navBtnsLi: $navBtnsUl.find('li'),
            sliderView: $sliderView,
            sliderWrapper: $sliderView.children('ul').has('.Sld').first()
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
            if (index + 1 > SlideCount) { $(this).remove(); }
        });
        ele.navBtn.each(function (index) {
            if (index + 1 > SlideCount) { $(this).remove(); }
        });
        // Refresh collections now that extras are gone
        ele.sld = ele.sliderView.find('.Sld');
        ele.navBtn = ele.sliderView.find('.NavBtn');
        ele.navBtnsLi = ele.navBtns.find('li');
 
        if (isVertical) {
            ele.sliderWrapper.css({ 'height': 100 * SlideCount + '%', 'width': '100%' });
            ele.sld.css({ 'height': 100 / SlideCount + '%', 'width': '100%' });
            ele.navBtns.css({
                'position': 'absolute', 'right': '10px', 'top': '50%',
                'transform': 'translateY(-50%)', 'list-style': 'none',
                'margin': '0', 'padding': '0', 'z-index': '10'
            });
            ele.navBtnsLi.css({ 'margin': '5px 0' });
        } else {
            ele.sliderWrapper.css('width', 100 * SlideCount + '%');
            ele.sld.css('width', 100 / SlideCount + '%');
        }
 
        function updateHeight() {
            var currentSlide = ele.sld.eq(SlideNow - 1);
            var imgHeight = currentSlide.find('img').outerHeight(true);
            if (imgHeight > 0) { ele.sliderView.css('height', imgHeight + 'px'); }
        }
 
        if (HeightSize === 'auto') {
            $(window).on('load', updateHeight);
            setTimeout(updateHeight, 100);
        } else {
            ele.sliderView.css('height', HeightSize);
        }
 
        setTimeout(function tick() {
            if (TimerPause === false) { NextSlide(); }
            setTimeout(tick, SlideInterval);
        }, SlideInterval);
 
        ele.sliderView.mouseenter(function () { TimerPause = true; });
        ele.sliderView.mouseleave(function () { TimerPause = false; });
 
        ele.navBtn.click(function () {
            var navBtnId = $(this).index();
            SlideNow = navBtnId + 1;
            moveWrapper(navBtnId);
            SelectSlide($(this));
            updateHeight();
        });
 
        $(window).trigger('scroll');
 
        if (HeightSize !== 'auto') {
            var SSliderH = ele.sliderView.outerHeight(true);
            ele.sld.each(function () {
                var HSlide = $(this).find('img').outerHeight(false);
                var RMath = (SSliderH - HSlide) / 2;
                $(this).find('img').css('transform', 'translateY(' + RMath + 'px)');
            });
        }
 
        centerNavButtons();
 
        function centerNavButtons() {
            var BtnCount = ele.navBtn.length;
            var Size, BtnSize;
            if (ele.navBtns.hasClass('nmLeft') || ele.navBtns.hasClass('nmRight')) {
                Size = ele.navBtns.outerHeight(true);
                BtnSize = ele.navBtnsLi.outerHeight(true);
                if (ele.navBtns.hasClass('nmP2')) {
                    ele.navBtnsLi.css('transform', 'translateY(' + (Size - BtnSize * BtnCount) / 2 + 'px)');
                } else if (ele.navBtns.hasClass('nmP3')) {
                    ele.navBtnsLi.css('transform', 'translateY(' + (Size - BtnSize * BtnCount) + 'px)');
                }
            } else if (ele.navBtns.hasClass('nmTop') || ele.navBtns.hasClass('nmBottom')) {
                Size = ele.navBtns.outerWidth(true);
                BtnSize = ele.navBtnsLi.outerWidth(true);
                if (ele.navBtns.hasClass('nmP2')) {
                    ele.navBtnsLi.css('transform', 'translateX(' + (Size - BtnSize * BtnCount) / 2 + 'px)');
                } else if (ele.navBtns.hasClass('nmP3')) {
                    ele.navBtnsLi.css('transform', 'translateX(' + (Size - BtnSize * BtnCount) + 'px)');
                }
            }
        }
 
        function moveWrapper(zeroBasedIndex) {
            if (isVertical) {
                TranslateWidth = -ele.sliderView.height() * zeroBasedIndex;
                ele.sliderWrapper.css({
                    'transform': 'translate(0, ' + TranslateWidth + 'px)',
                    '-webkit-transform': 'translate(0, ' + TranslateWidth + 'px)',
                    '-ms-transform': 'translate(0, ' + TranslateWidth + 'px)'
                });
            } else {
                TranslateWidth = -ele.sliderView.width() * zeroBasedIndex;
                ele.sliderWrapper.css({
                    'transform': 'translate(' + TranslateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)'
                });
            }
        }
 
        function NextSlide() {
            if (SlideNow === SlideCount) {
                ele.sliderWrapper.css('transform', 'translate(0, 0)');
                SlideNow = 1;
            } else {
                moveWrapper(SlideNow);
                SlideNow++;
            }
            SelectSlide(ele.navBtn.eq(SlideNow - 1));
            updateHeight();
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
    }
})(window.jQuery, window.mediaWiki);