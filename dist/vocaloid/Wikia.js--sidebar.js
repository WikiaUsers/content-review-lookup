/*
 * Discord sidebar module loader.
 */
 
;(function ($, mw) {
    'use strict';
 
    // add module for Vocaloid Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                    .attr('href', ('https://discord.gg/7hjtr6k'))
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/vocaloid/images/2/2d/Discord-Logo-Color.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The VOCALOID Wiki has an official Discord Server! Click the button below to join and chat with fellow fans and editors live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Vocaloid_Wiki:Discord'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/7hjtr6k')
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