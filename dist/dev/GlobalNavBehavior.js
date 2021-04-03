/**
 * GlobalNavBehavior
 * 
 * Allows user to define show/hide behavior of global nav on scroll.
 * (PERSONAL USE ONLY)
 * 
 * @author User:Blaster Niceshot
 * 
 * @version 1.2
 */
;(function(window, $, mw) {
    
    // Initialize globalNavBehavior object
    window.globalNavBehavior = window.globalNavBehavior || {};
    
    if (typeof window.globalNavBehavior.loaded !== 'undefined') {
                
        // Exit function to prevent second load.
        return;
    
    }
    
    window.globalNavBehavior.loaded = true;
    
    var globalNavBehavior = $.extend({
            onScrollUp: 'show',
            onScrollDown: 'hide',
            transitionDuration: 200,
            transitionType: 'ease',
        }, window.globalNavBehavior),
        gNav = $('#globalNavigation'),
        lastTransition,
        prevScrollTop = 0;
    
    // Check that option values are valid
    if (isNaN(Number(globalNavBehavior.transitionDuration))) {
        globalNavBehavior.transitionDuration = 200;
    }
    
    if ($.inArray(globalNavBehavior.transitionType, ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out']) === -1 && (/cubic-bezier\(([\d\.-]*,\s?){3}[\d\.-]*\)/).test(globalNavBehavior.transitionType.toString()) === false) {
        globalNavBehavior.transitionType = 'ease';
    }
    
    // Add initial CSS
    gNav.css({
        'position': 'absolute',
        'top': '0',
        'transition': 'top ' + globalNavBehavior.transitionDuration + 'ms ' + globalNavBehavior.transitionType,
    });
    
    // Show and hide functions
    function showGNav() {
        gNav.css('top', '0');
    }
    
    function hideGNav() {
        gNav.css('top', '-' + gNav.outerHeight() + 'px');
    }
    
    // When user scrolls
    $(window).scroll(
        function() {
            
            // Determine scroll direction
            var curScrollTop = $(this).scrollTop(),
                dir;
            
            if (curScrollTop <= 60) {
                dir = 'top';
            } else if (curScrollTop > prevScrollTop) {
                dir = 'down';
            } else if (curScrollTop < prevScrollTop) {
                dir = 'up';
            } 
                
            prevScrollTop = curScrollTop;
            
            if (gNav.length > 0) {
                if (dir === 'top' && lastTransition !== 'top') {
                    showGNav();
                } else if (dir === 'down' && lastTransition !== 'down') {
                    if (globalNavBehavior.onScrollDown === 'show') {
                        showGNav();
                    } else if (globalNavBehavior.onScrollDown === 'hide') {
                        hideGNav();
                    }
                } else if (dir === 'up' && lastTransition !== 'up') {
                    if (globalNavBehavior.onScrollUp === 'show') {
                        showGNav();
                    } else if (globalNavBehavior.onScrollUp === 'hide') {
                        hideGNav();
                    }
                }
                
                lastTransition = dir;
            }
        }
    );
    
}) (this, this.jQuery, this.mediaWiki);