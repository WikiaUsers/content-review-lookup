/*
 * @name                PageFooterPanel
 * @author              [[User:ClodaghelmC]]
 * @description         Supports custom .wds-collapsible-panel/s and adds a
 *                      slide animation
**/
(function($, mw) {
	'use strict';
	
    // Double-load protection
    if (window.pageFooterPanelLoaded) {
        return;
    }
    window.pageFooterPanelLoaded = true;

    /**
     * Setup structure
     */
    $(function() {
    	// Target ALL panels, including categories
        const $panel = $('.wds-collapsible-panel');
        // Relocate CUSTOM panels and place at the top of the footer container,
        // before categories
        $panel.not('.page-footer__categories').prependTo('.page-footer');
        
        // Initial state that ensures the content starts out hidden
        $panel.find('.wds-collapsible-panel__content').css('display', 'none');
        
        // Inject icon, if missing
        $panel.find('.wds-collapsible-panel__header').each(function() {
            if ($(this).find('.wds-icon').length === 0) {
                $(this).append(
                    '<svg class="wds-icon wds-icon-small">' +
                        '<use xlink:href="#wds-icons-menu-control-small"></use>' +
                    '</svg>'
                );
            }
        });
        
        /**
         * Click events
         */
        $panel.on('click', '.wds-collapsible-panel__header', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            var $panel = $(this).closest('.wds-collapsible-panel'),
                $content = $panel.find('.wds-collapsible-panel__content');
            
            if ($panel.hasClass('wds-is-collapsed')) {
            	// Opening state
                $panel.removeClass('wds-is-collapsed');
                $content.stop(true, true).slideDown(250);
            } else {
            	// Closing state
                $panel.addClass('wds-is-collapsed');
                // Override 'display: none' from CSS so animation is visible
                $content.css('display', 'block').stop(true, true).slideUp(250, function() {
                    $(this).css('display', 'none');
                });
            }
        });
    });
}(jQuery, mediaWiki));