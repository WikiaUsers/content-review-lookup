/**
 * @name            AddRightSideTool
 * @author          [[User:ClodaghelmC]]
 * @description     Integrates tools into the right rail
 */
(function (window, $, mw) {
    'use strict';
    
    // Prevent double load
    window.dev = window.dev || {};
    if (window.dev.addRightSideToolLoaded) {
        return;
    }
    window.dev.addRightSideToolLoaded = true;
    
    var manager = {
        /**
         * Locates the right rail and triggers tool creation
         */
        init: function () {
            var $rightRail = $('.page-side-tools__right');
            
            if (!$rightRail.length) {
                mw.hook('wikia.rail.ready').add(manager.init);
                return;
            }
            
            // Standardize toggle if it exists
            $('.right-rail-toggle')
                .addClass('page-side-tool')
                .attr('data-wds-tooltip-position', 'left')
                .removeAttr('style');
                
            // Process the global array
            if (window.addRightSideTool && Array.isArray(window.addRightSideTool)) {
                window.addRightSideTool.forEach(function (tool) {
                    manager.create(tool, $rightRail);
                });
            }
        },
        
        /**
         * Builds the tool element and appends it to the container
         * @param {Object} options Tool configuration
         * @param {jQuery} $container The right rail element
         */
        create: function (options, $container) {
            if (!options.id || $('.' + options.id).length) {
                return;
            }
            
            var href = options.href || (options.link ? mw.util.getUrl(options.link) : '#');
            
            var $tool = $('<a>', {
                'class': 'page-side-tool page-right-side-tool ' + options.id,
                'href': href,
                'style': 'position: relative;'
            }).append(
                $('<svg class="wds-icon wds-icon-small">' +
                    '<use xlink:href="#wds-icons-' + (options.icon || 'gear-small') + '"></use>' +
                '</svg>')
            );
            
            var $tooltip = $('<div>', {
                'class': 'wds-tooltip is-left',
                'text': options.text,
                'style': 'display: none; ' +
                         'position: absolute; ' +
                         'right: 100%; ' +
                         'top: 50%; ' +
                         'transform: translateY(-50%); ' +
                         'margin-right: 6px; ' +
                         'white-space: nowrap;'
            });
            
            $tool.append($tooltip)
                .on('mouseenter', function () {
                    $tooltip.show();
                })
                .on('mouseleave', function () {
                    $tooltip.hide();
                });
                
            $container.append($tool);
        }
    };
    
    // Expose for external use
    window.dev.addRightSideTool = manager;
    
    mw.loader.using(['mediawiki.util']).then(function () {
        // Reset the toggle
        mw.util.addCSS(
            '.right-rail-toggle.page-side-tool { ' +
                'padding: 0; ' +
                'top: 0; ' +
                'position: relative; ' +
            '}'
        );
        
        manager.init();
        
        mw.hook('wikia.rail.ready').add(manager.init);
        // Fire hook
        mw.hook('dev.addRightSideTool').fire(manager);
    });
    
}(window, jQuery, mediaWiki));