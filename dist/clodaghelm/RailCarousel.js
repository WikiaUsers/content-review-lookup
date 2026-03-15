/**
 * @name:        RailCarousel
 * @author:      [[User:ClodaghelmC]]
 * @description: Reconstructs the Alice Carousel for [[w:c:dev:AddRailModule]]
 *               content
**/

(function (window, $, mw) {
    'use strict';
    
    if (window.railCarouselLoaded) return;
    window.railCarouselLoaded = true;
    
    const mainStructure = function() {
        const css = `
            .right-rail-carousel__wrapper .alice-carousel__wrapper { 
                overflow: hidden; 
                position: relative; 
                width: 300px; 
            }
            .right-rail-carousel__wrapper .alice-carousel__stage { 
                display: flex; 
                flex-direction: row; 
                flex-wrap: nowrap;
                align-items: flex-start; 
                margin: 0; 
                padding: 0; 
                list-style: none;
                transition: transform 0.4s ease;
            }
            .right-rail-carousel__wrapper .alice-carousel__slide { 
                flex: 0 0 300px; 
                width: 300px; 
                min-width: 300px; 
                max-width: 300px;
                box-sizing: border-box; 
                display: block; 
                margin-right: 20px; 
            }
            .right-rail-carousel__content {
                position: relative; 
                display: block; 
                width: 100%;
                max-height: none; 
                overflow: hidden; 
                white-space: normal;
                word-wrap: break-word; 
                box-sizing: border-box;
            }
            .right-rail-carousel__content.is-hidden { 
                max-height: 200px; 
                overflow: hidden; 
            }
        `;
        $('<style>').text(css).appendTo('head');
    };
    
    const buildCarousel = function () {
        $('.right-rail-carousel__wrapper').each(function () {
            const $wrapper = $(this);
            if ($wrapper.data('initialized')) return;
            
            const $originalSlides = $wrapper.find('.right-rail-carousel__content');
            const slideCount = $originalSlides.length;
            const threshold = 200; 
            let currentSlide = 0;
            
            const wdsArrow = '<svg viewBox="0 0 12 12" width="12" height="12"><path fill="currentColor" d="M11.707 3.293a.999.999 0 00-1.414 0L6 7.586 1.707 3.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l5-5a.999.999 0 000-1.414z"></path></svg>';
            
            $wrapper.html(
                '<div class="alice-carousel"><div class="alice-carousel__wrapper"><ul class="alice-carousel__stage"></ul></div>' +
                '<div class="alice-carousel__controls"><button class="alice-carousel__arrow arrow-prev">' + wdsArrow + '</button>' +
                '<button class="alice-carousel__arrow arrow-next">' + wdsArrow + '</button></div></div>'
            );
            
            const $stage = $wrapper.find('.alice-carousel__stage');
            
            function readMore($content, $containerTarget) {
                // Only initialize Read More if the specific class is present
                if (!$content.hasClass('is-truncated')) return;
                
                $content.addClass('is-hidden'); 
                const initialize = function() {
                    if ($content.data('initialized-readmore')) return;
                    setTimeout(function() {
                        const actualHeight = $content[0].scrollHeight;
                        if (actualHeight > threshold) {
                            $content.data('full-height', actualHeight);
                            $content.data('initialized-readmore', true);
                            const $btn = $('<div class="read-more"><button class="wds-button wds-is-secondary">READ MORE</button></div>');
                            $containerTarget.append($btn);
                            
                            $btn.on('click', 'button', function() {
                                const isExpanded = $content.hasClass('is-visible');
                                if (!isExpanded) {
                                    $content.removeClass('is-hidden').addClass('is-visible');
                                    $content.css('max-height', ($content.data('full-height') + 20) + 'px'); 
                                    $(this).text('SHOW LESS');
                                    setTimeout(function() { 
                                        if ($content.hasClass('is-visible')) $content.css('max-height', 'none'); 
                                    }, 410);
                                } else {
                                    $content.css('max-height', $content.outerHeight() + 'px');
                                    $content[0].offsetHeight; 
                                    $content.removeClass('is-visible').addClass('is-hidden');
                                    $content.css('max-height', '200px');
                                    $(this).text('READ MORE');
                                }
                                setTimeout(render, 350);
                            });
                        } else { 
                            $content.removeClass('is-hidden'); 
                        }
                    }, 250);
                };
                
                const $imgs = $content.find('img');
                if ($imgs.length > 0) {
                    let loaded = 0;
                    $imgs.one('load error', function() { 
                        if (++loaded === $imgs.length) initialize(); 
                    }).each(function() { 
                        if (this.complete) $(this).trigger('load'); 
                    });
                } else { 
                    initialize(); 
                }
            }
            
            $originalSlides.each(function () {
                const $slideLi = $('<li class="alice-carousel__slide"></li>').append($(this)).appendTo($stage);
                readMore($(this), $slideLi);
            });
            
            const render = function () {
                const offset = currentSlide * 320;
                $stage.css('transform', 'translate3d(-' + offset + 'px, 0, 0)');
                $wrapper.find('.arrow-prev').toggleClass('disabled', currentSlide === 0);
                $wrapper.find('.arrow-next').toggleClass('disabled', currentSlide === slideCount - 1);
            };
            
            $wrapper.on('click', '.alice-carousel__arrow', function () {
                if ($(this).hasClass('arrow-next') && currentSlide < slideCount - 1) currentSlide++;
                else if (currentSlide > 0) currentSlide--;
                render();
            });
            
            $(window).on('resize', render);
            $wrapper.data('initialized', true);
            render();
        });
    };
    
    mainStructure();
    
    mw.loader.using(['mediawiki.util'], function () {
        importArticles({
            type: 'style',
            article: 'u:clodaghelm:MediaWiki:RailCarousel.css'
        });
        
        if ($('#WikiaRail').hasClass('is-ready')) {
            buildCarousel();
        } else {
            mw.hook('wikia.rail.ready').add(buildCarousel);
        }
    });    
    
})(this, jQuery, mediaWiki);