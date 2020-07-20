/*
 * Custom sidebar module loader.
 */
;(function ($, mw) {
    'use strict';
    
    // add module for latest update
    // modified from <http://dev.wikia.com/wiki/AddRailModule>
    function addLatestUpdate() {
        (window.ARMModules || ['Template:RailModule']).forEach(function(el) {
            $.get(mw.util.wikiScript('api'), {
                action: 'parse',
                text: '{' + '{' + el + '}}',
                title: mw.config.get('wgPageName'),
                format: 'json'
            }).done(function(d) {
                var $section = $('<section>', {
                    'id': 'rsw-update',
                    'class': 'rsw-custom-module rail-module',
                    html: d.parse.text['*']
                }).insertBefore('#wikia-recent-activity');
                mw.hook('wikipage.content').fire($section);
            });
        });
    }

    function init() {
        // load once
        
        if ($('#WikiaRail').hasClass('loaded')) {
            addLatestUpdate();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addLatestUpdate);
        }
    }

    mw.log('Loading RuneScape Wiki custom modules');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });

}(this.jQuery, this.mediaWiki));