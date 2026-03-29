/**
 * @name            ContentReview-Plus
 * @author          [[User:ClodaghelmC]]
 * @description     Adds native styling and a set of quick access tools to a
 *                  script's sidebar
 */
(function (window, $, mw) {
    'use strict';
    
    // Prevent double load
    if (window.contentReviewPlusLoaded) {
        return;
    }
    window.contentReviewPlusLoaded = true;
    
    // Initialize tool array
    window.addRightSideTool = window.addRightSideTool || [];
    
    /**
     * Style widget elements and populates the tools array
     */
    var init = function () {
        var conf = mw.config.get([
            'wgNamespaceNumber',
            'wgCanonicalSpecialPageName',
            'wgPageContentModel'
        ]);
        var $title = $('.content-review__widget h2');
        var $table = $('.content-review__table');
        var $oldHelp = $('.content-review__widget__help');

        var isJSPage = (conf.wgNamespaceNumber === -1 && conf.wgCanonicalSpecialPageName === 'JSPages') ||
                       (conf.wgPageContentModel === 'javascript');
                       
        // Re-class the widget table
        if ($table.length) {
            $table.addClass('wikitable');
        }
        
        if ($title.length) {
            $title.addClass('rail-module__header has-icon');
            if (!$title.find('.wds-icon').length) {
                $title.prepend(
                    '<svg class="wds-icon wds-icon-small" style="margin-right: 6px; opacity: 0.75; vertical-align: middle;">' +
                        '<use xlink:href="#wds-icons-review-requests"></use>' +
                    '</svg>'
                );
            }
        }
        
        // Populate tools array for script-related pages
        if (($oldHelp.length || isJSPage) && !window.crpToolsAdded) {
            if ($oldHelp.length) {
                $oldHelp.remove();
            }
            
            window.addRightSideTool.push(
                {
                    id:   'crp-tool-jspages',
                    icon: 'preformat-small',
                    text: 'JavaScript pages',
                    link: 'Special:JSPages'
                },
                {
                    id:   'crp-tool-importjs',
                    icon: 'gear-small',
                    text: 'ImportJS',
                    link: 'MediaWiki:ImportJS'
                },
                {
                    id:   'crp-tool-help',
                    icon: 'question-small',
                    text: 'Help',
                    href: 'https://community.fandom.com/wiki/Help:CSS_and_JS_customization'
                }
            );
            
            window.crpToolsAdded = true;
            
            // Notify AddRightSideTool to refresh
            mw.hook('dev.addRightSideTool').add(function (manager) {
                if (manager && typeof manager.init === 'function') {
                    manager.init();
                }
            });
        }
    };
    
    mw.loader.using(['mediawiki.util', 'mediawiki.base']).then(function () {
        importArticles({
            type:     'script',
            articles: ['u:clodaghelm:MediaWiki:AddRightSideTool.js']
        }, {
            type:     'style',
            articles: ['u:clodaghelm:MediaWiki:ContentReview-Plus.css']
        });
        
        mw.hook('wikipage.content').add(init);
        mw.hook('wikia.rail.ready').add(init);
        
        init();
    });

}(window, jQuery, mediaWiki));