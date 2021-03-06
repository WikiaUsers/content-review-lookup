/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for The Rising of a Shield Hero Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                    .attr('href', 'https://discord.gg/ZvzTBB4')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/the-rising-of-the-shield-hero/images/5/52/Shield_Discord_Banner.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Rising of the Shield Hero Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.getUrl('The Rising of the Shield Hero Wiki:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/ZvzTBB4')
                            .addClass('wds-button')
                            .text('Get invite')
                    )
          )
          .insertBefore('#wikia-recent-activity');
    }
 
    function init() {
        //load once
        if ($('#rsw-discord').length) {
            mw.log('Discord module already loaded');
            return;
        }
        
        if ($('#WikiaRail').hasClass('loaded')) {
            addModule();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addModule);
        }
    }

    mw.log('Loading Discord module');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });

}(this.jQuery, this.mediaWiki));