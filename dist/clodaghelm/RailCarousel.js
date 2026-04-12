/**
 * @name                RailCarousel
 * @author              [[User:ClodaghelmC]]
 * @description         Reconstructs the Alice Carousel for
 *                      [[w:c:dev:AddRailModule]] content
**/
(function(window, $, mw) {
    'use strict';
    
    /**
     * Main object
     * @class railCarousel
     */
    var railCarousel = {
        // Configuration options
        options: $.extend({
            threshold: 200,
            duration: 400
        }, window.railCarousel || {}),
        
        // Navigation arrows
        icon: '<svg viewBox="0 0 12 12" width="12" height="12"><path fill="currentColor" d="M11.707 3.293a.999.999 0 00-1.414 0L6 7.586 1.707 3.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l5-5a.999.999 0 000-1.414z"></path></svg>',
        
        /**
         * Initializes everything
         */
        init: function() {
            // Double-load and conflict protection
            if (window.railCarouselLoaded || $('.rail-carousel__wrapper .alice-carousel').length > 0) {
                return;
            }
            // This syncs the slide's transition speed with the CSS
            mw.util.addCSS(':root { --carousel-speed: ' + this.options.duration + 'ms !important; }');
            this.styles();
            this.build();
        },
        
        /**
         * Stylesheet for the carousel
         */
        styles: function() {
            importArticle({
                type: 'style',
                article: 'u:clodaghelm:MediaWiki:RailCarousel.css'
            });
        },
        
        /**
         * Finds and builds all carousel instances 
         */
        build: function() {
            var self = this;
            // We only look for the wrapper IF it is a descendant of .railModule.
            // This prevents the script from firing on article pages or template previews.
            $('.railModule .rail-carousel__wrapper').each(function() {
                var $wrapper = $(this);
                if ($wrapper.data('initialized')) return;
                
                var $slides = $wrapper.find('.rail-carousel__content'),
                    slideCount = $slides.length,
                    currentSlide = 0;
                    
                // Create shell
                $wrapper.html(
                    '<div class="alice-carousel">' +
                        '<div class="alice-carousel__wrapper">' +
                            '<ul class="alice-carousel__stage"></ul>' +
                        '</div>' +
                        '<div class="alice-carousel__controls">' +
                            '<button class="alice-carousel__arrow arrow-prev">' + self.icon + '</button>' +
                            '<button class="alice-carousel__arrow arrow-next">' + self.icon + '</button>' +
                        '</div>' +
                    '</div>'
                );
                
                var $stage = $wrapper.find('.alice-carousel__stage'),
                    // Helper to truncate a slide back while navigating
                    resetSlides = function() {
                        $stage.find('.is-visible').each(function() {
                            var $content = $(this);
                            // Set height explicitly before shrinking
                            $content.css('max-height', $content.outerHeight() + 'px');
                            $content[0].offsetHeight; // Trigger reflow
                            
                            $content.removeClass('is-visible').addClass('is-hidden')
                                    .css('max-height', self.options.threshold + 'px');
                            $content.siblings('.read-more').find('button').text('READ MORE');
                        });
                    },
                    slideLayout = function(isExpanding) {
                        if (!isExpanding) {
                            resetSlides(); // Triggers on every slide change, unless expanding
                        }
                        self.position($wrapper, currentSlide, slideCount, $stage);
                    };
                    
                // Populate slides
                $slides.each(function(idx, el) {
                    var $li = $('<li class="alice-carousel__slide"></li>')
                        .append($(el))
                        .appendTo($stage);
                    self.truncate($(el), $li, slideLayout);
                });
                
                // Controls
                $wrapper.on('click', '.alice-carousel__arrow', function(e) {
                    var $btn = $(e.currentTarget);
                    if ($btn.hasClass('arrow-next') && currentSlide < slideCount - 1) {
                        currentSlide++;
                    } else if ($btn.hasClass('arrow-prev') && currentSlide > 0) {
                        currentSlide--;
                    }
                    slideLayout();
                });
                
                $(window).on('resize', function() { slideLayout(); });
                
                // Mark as ready
                $wrapper.data('initialized', true);
                slideLayout();
            });
        },
        
        /**
         * Handles the "Read More" truncation
         * @param {jQuery} $content The slide content
         * @param {jQuery} $container The slide container
         * @param {Function} callback Layout update function
         */
        truncate: function($content, $container, callback) {
            var self = this;
            if (!$content.hasClass('is-truncated')) return;
            
            $content.addClass('is-hidden');
            
            var setup = function() {
                if ($content.data('initialized-readmore')) return;
                
                setTimeout(function() {
                	// Wait for the animation to finish before clearing the max-height
                    var actualHeight = $content[0].scrollHeight;
                    
                    if (actualHeight > self.options.threshold) {
                        $content.data('full-height', actualHeight).data('initialized-readmore', true);
                        var $btn = $('<div class="read-more"><button class="wds-button wds-is-secondary">READ MORE</button></div>');
                        $container.append($btn);
                        
                        $btn.on('click', 'button', function(e) {
                            var expanded = $content.hasClass('is-visible');
                            if (!expanded) {
                                $content.removeClass('is-hidden').addClass('is-visible')
                                        .css('max-height', ($content.data('full-height') + 20) + 'px');
                                $(e.currentTarget).text('SHOW LESS');
                                setTimeout(function() { 
                                    if ($content.hasClass('is-visible')) $content.css('max-height', 'none'); 
                                    if (typeof callback === 'function') callback(true);
                                }, self.options.duration + 10); // config + 10ms buffer
                            } else {
                                $content.css('max-height', $content.outerHeight() + 'px');
                                $content[0].offsetHeight; 
                                $content.removeClass('is-visible').addClass('is-hidden').css('max-height', self.options.threshold + 'px');
                                $(e.currentTarget).text('READ MORE');
                                if (typeof callback === 'function') callback(false);
                            }
                        });
                    } else if (actualHeight > 0) {
                        $content.removeClass('is-hidden');
                    }
                }, self.options.duration); // config for initial measure delay
            };
            
            // Image check:
            // Wait for images to ensure height is calculated correctly
            var $imgs = $content.find('img');
            if ($imgs.length > 0) {
                var loaded = 0;
                // Wait for every image to finish (or fail)
                $imgs.one('load error', function() {
                    if (++loaded === $imgs.length) {
                    	// If images did(n't) load, calculate the height
                        setup();
                    }
                }).each(function() {
                    if (this.complete) $(this).trigger('load');
                });
            } else {
                setup();
            }
        },
        
        /**
         * Updates the visual position of the carousel
         */
        position: function($wrapper, current, total, $stage) {
            var offset = current * 100;
            $stage.css('transform', 'translate3d(-' + offset + '%, 0, 0)');
            $wrapper.find('.arrow-prev').prop('disabled', current === 0).toggleClass('disabled', current === 0);
            $wrapper.find('.arrow-next').prop('disabled', current === total - 1).toggleClass('disabled', current === total - 1);
        }
    };
    
    // Register globally for debugging if needed
    window.dev = window.dev || {};
    window.dev.railCarousel = railCarousel;
    
    // Loader
    mw.loader.using(['mediawiki.util']).then(function() {
        var init = railCarousel.init.bind(railCarousel);
        
        mw.hook('AddRailModule.module').add(function() {
            init(); 
        });

        if ($('.railModule .rail-carousel__wrapper').length) {
            init();
        }
    });
    
}(this, jQuery, mediaWiki));