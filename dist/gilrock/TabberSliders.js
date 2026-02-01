/* a script that adds smooth slide transitions to dev-tabbers upon switching tabs. should be fully functional and optimized. */
(function() {
    'use strict';
    
    $(function() {
        initializeTabbers();
    });
    
    mw.hook('wikipage.content').add(initializeTabbers);
    
    function initializeTabbers() {
        $('.dev-tabber').each(function() {
            var $tabber = $(this);
            
            if ($tabber.data('slider-initialized')) {
                return;
            }
            $tabber.data('slider-initialized', true);
            
            var $contents = $tabber.find('.wds-tab__content');
            if ($contents.length === 0) return;
            
            var $wrapper = $tabber.find('.wds-tab__content-wrapper');
            if ($wrapper.length === 0) {
                $contents.wrapAll('<div class="wds-tab__content-wrapper"></div>');
                $wrapper = $tabber.find('.wds-tab__content-wrapper');
            }
            
            var $tabs = $tabber.find('.wds-tabs__tab');
            
            $contents.each(function() {
                var $content = $(this);
                if (!$content.data('original-height')) {
                    $content.css({
                        'position': 'relative',
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                    var height = $content.outerHeight(true);
                    $content.data('original-height', height);
                    if (!$content.hasClass('wds-is-current')) {
                        $content.css({
                            'position': 'absolute',
                            'opacity': '0',
                            'visibility': 'hidden',
                            'transform': 'translateX(100%)'
                        });
                    } else {
                        $content.css({
                            'position': 'relative',
                            'opacity': '1',
                            'visibility': 'visible',
                            'transform': 'translateX(0)'
                        });
                    }
                }
            });
            
            var $currentContent = $contents.filter('.wds-is-current');
            if ($currentContent.length) {
                var initialHeight = $currentContent.data('original-height') || $currentContent.outerHeight(true);
                $wrapper.css('height', initialHeight + 'px');
            }
            
            $tabs.off('click.slider').on('click.slider', function(e) {
                e.preventDefault();
                
                var $clickedTab = $(this);
                if ($clickedTab.hasClass('wds-is-current')) return;
                
                var newIndex = $clickedTab.index();
                var currentIndex = $tabs.filter('.wds-is-current').index();
                var $currentContent = $contents.filter('.wds-is-current');
                var $newContent = $contents.eq(newIndex);
                
                if ($currentContent.hasClass('sliding') || $newContent.hasClass('sliding')) {
                    return;
                }
                
                var currentHeight = $currentContent.data('original-height') || $currentContent.outerHeight(true);
                var newHeight = $newContent.data('original-height') || $newContent.outerHeight(true);
                
                $tabs.removeClass('wds-is-current').attr({
                    'aria-selected': 'false',
                    'tabindex': '-1'
                });
                $clickedTab.addClass('wds-is-current').attr({
                    'aria-selected': 'true',
                    'tabindex': '0'
                });
                
                $currentContent.addClass('sliding');
                $newContent.addClass('sliding');
                
                var direction = newIndex > currentIndex ? 'right' : 'left';
                
                $newContent.css({
                    'display': 'block',
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'width': '100%',
                    'visibility': 'visible',
                    'transform': direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)',
                    'opacity': '0'
                });
                
                $wrapper.css({
                    'height': currentHeight + 'px',
                    'transition': 'height 0.3s ease'
                });
                
                setTimeout(function() {
                    $wrapper.css('height', newHeight + 'px');
                }, 10);
                
                setTimeout(function() {
                    $currentContent.css({
                        'transform': direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)',
                        'opacity': '0'
                    });
                    
                    $newContent.css({
                        'transform': 'translateX(0)',
                        'opacity': '1'
                    });
                    
                    setTimeout(function() {
                        $currentContent.removeClass('wds-is-current sliding');
                        $newContent.addClass('wds-is-current').removeClass('sliding');
                        
                        $currentContent.css({
                            'display': 'none',
                            'position': 'absolute',
                            'visibility': 'hidden',
                            'transform': 'translateX(100%)',
                            'opacity': '0'
                        });
                        
                        $newContent.css({
                            'display': 'block',
                            'position': 'relative',
                            'visibility': 'visible',
                            'transform': 'translateX(0)',
                            'opacity': '1'
                        });
                        
                        $wrapper.css({
                            'height': '',
                            'transition': ''
                        });
                        
                    }, 300); 
                    
                }, 20);
            });
        });
    }
})();