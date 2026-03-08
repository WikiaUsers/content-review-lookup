/**
 * @name:        RightRailCarousel
 * @author:      [[User:ClodaghelmC]]
 * @description: Reconstructs the Alice Carousel for [[w:c:dev:AddRailModule]]
**/

/* global mw, $ */
(function (window, $, mw) {
    'use strict';
    
    if (window.RailCarouselLoaded) return;
    window.RailCarouselLoaded = true;
    
    const buildCarousel = function () {
        // Target the wrapper ... Check if it's in .page__main
        const $wrapper = $('#right-rail-carousel--wrapper');
        
        // ensure element exists and isn't already processed
        if (!$wrapper.length || $wrapper.data('initialized')) {
            return;
        }

        // block rendering if the wrapper is in .page__main
        if ($wrapper.closest('.page-Template_RailModule .page__main').length) {
            return;
        }
        
        const arrowSvg = '<svg viewBox="0 0 12 12" width="12" height="12"><path fill="currentColor" fill-rule="evenodd" d="M11.707 3.293a.999.999 0 00-1.414 0L6 7.586 1.707 3.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l5-5a.999.999 0 000-1.414z"></path></svg>';
        const $slides = $wrapper.find('.right-rail-carousel--content');
        const slideCount = $slides.length;
        
        if (slideCount === 0) return;
        
        const slideGap = 20;
        
        // Build base structure
        $wrapper.html(
            '<div class="alice-carousel">' +
                '<div class="alice-carousel__wrapper">' +
                    '<ul class="alice-carousel__stage"></ul>' +
                '</div>' +
                '<div class="alice-carousel__controls">' +
                    '<div class="alice-carousel__prev-btn"><button class="alice-carousel__arrow arrow-prev">' + arrowSvg + '</button></div>' +
                    '<div class="alice-carousel__pagination-container">' +
                        '<div class="alice-carousel__pagination"></div>' +
                    '</div>' +
                    '<div class="alice-carousel__next-btn"><button class="alice-carousel__arrow arrow-next">' + arrowSvg + '</button></div>' +
                '</div>' +
            '</div>'
        );
        
        const $container = $wrapper.find('.alice-carousel__wrapper');
        const $stage = $wrapper.find('.alice-carousel__stage');
        const $pagination = $wrapper.find('.alice-carousel__pagination');
        const $prevBtn = $wrapper.find('.alice-carousel__prev-btn');
        const $nextBtn = $wrapper.find('.alice-carousel__next-btn');
        let currentSlide = 0;
        
        // Inject slides
        $slides.each(function () {
            $('<li class="alice-carousel__slide"></li>')
                .append($(this))
                .appendTo($stage);
        });
        
        const updateUI = function () {
            if ($pagination.children().length === 0) {
                let pages = (slideCount <= 6) ? Array.from({ length: slideCount }, (_, i) => i) : [0, 1, '...', slideCount - 2, slideCount - 1];
                
                pages.forEach(p => {
                    if (p === '...') {
                        $('<span class="alice-carousel__pagination-ellip">...</span>')
                            .appendTo($pagination);
                    } else {
                        $('<span class="alice-carousel__pagination-num"></span>')
                            .text(p + 1)
                            .data('page', p)
                            .on('click', function () {
                                currentSlide = p;
                                render();
                            })
                            .appendTo($pagination);
                    }
                });
            }
            
            // highlight active page
            $pagination.find('.alice-carousel__pagination-num').each(function () {
                $(this).toggleClass('active', $(this).data('page') === currentSlide);
            });
            
            // toggle arrow visibility
            $prevBtn.toggleClass('hidden', currentSlide === 0);
            $nextBtn.toggleClass('hidden', currentSlide === slideCount - 1);
        };

        const render = function () {
            const viewWidth = $container.width();
            const offset = currentSlide * (viewWidth + slideGap);
            
            $stage.css({
                'transform': 'translate3d(-' + offset + 'px, 0px, 0px)'
            });
            
            updateUI();
        };

        const navigate = function (direction) {
            if (direction === 'next' && currentSlide < slideCount - 1) {
                currentSlide++;
            } else if (direction === 'prev' && currentSlide > 0) {
                currentSlide--;
            }
            render();
        };

        // Event listeners
        $wrapper.on('click', '.alice-carousel__arrow', function () {
            navigate($(this).hasClass('arrow-next') ? 'next' : 'prev');
        });
        
        $(window).on('resize', render);
        
        // initialize position
        $wrapper.data('initialized', true);
        render();
    };

    mw.loader.using(['mediawiki.util']).then(function () {
        importArticles({
            type: 'style',
            article: 'MediaWiki:RightRailCarousel.css'
        });
        
        mw.hook('wikia.rail.ready').add(buildCarousel);
        
        if ($('#WikiaRail').hasClass('is-ready')) {
            buildCarousel();
        }
    });
}(this, jQuery, mediaWiki));