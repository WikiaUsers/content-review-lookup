/**
 * @name                FauxRadio
 * @author              [[User:ClodaghelmC]]
 * @description         Simulates radio button toggle
**/
(function(window, $, mw) {
    'use strict';
    
    // Prevent script from loading twice
    if (window.fauxRadioLoaded) return;
    window.fauxRadioLoaded = true;
    
    // Import base styles
    importArticles({
        type: 'style',
        articles: [
            'u:clodaghelm:MediaWiki:FauxRadio.css'
        ]
    });
    
    // Wait for doc to be ready
    $(function() {
        var $wrapper = $('.fr-nav-wrapper');
        
        // Scope the click to the specific wrapper to allow multiple containers on one page
        $('.fr-nav-wrapper').on('click', '[data-fr-toggle]', function(e) {
            e.preventDefault();
            
            var $this = $(this),
                $wrapper = $this.closest('.fr-nav-wrapper'),
                targetId = 'fr-' + $this.attr('data-fr-toggle'),
                $targetView = $wrapper.find('#' + targetId),
                $currentView = $wrapper.find('.fr-view.active');
                
            // Simple transition
            if ($targetView.length && !$targetView.hasClass('active')) {
                $currentView.fadeOut(250, function() {
                    $(this).removeClass('active');
                    $targetView.fadeIn(250)
                               .addClass('active')
                               .css('display', 'flex');
                });
            }
        });
    });
}(this, jQuery, mediaWiki));